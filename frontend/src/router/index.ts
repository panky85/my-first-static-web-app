import ErrorView from '@/views/ErrorView.vue'
import HelpView from '@/views/HelpView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import MSPQILandingView from '@/views/program/mspqi/MSPQILandingView.vue'
import MSPQIReportView from '@/views/program/mspqi/MSPQIReportView.vue'
import MSQPITemplateView from '@/views/program/mspqi/MSQPITemplateView.vue'
import PMPLandingView from '@/views/program/pmp/PMPLandingView.vue'
import PMPReportView from '@/views/program/pmp/PMPReportView.vue'
import PMPTemplateView from '@/views/program/pmp/PMPTemplateView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth'
import { useReportStore } from '@/stores/report'
import { createRouter as createVueRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import type { App } from 'vue'

const createRoutes = (): any => [
  {
    path: '/',
    name: 'landing',
    redirect: {
      name: 'login',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
  },
  {
    path: '/mspqi',
    name: 'mspqi',
    component: MSQPITemplateView,
    redirect: {
      name: 'mspqiLanding',
    },
    meta: {
      requiresAuth: true,
      program: 'MSPQI',
      programTitle: 'MSPQI Reporting Program',
    },
    children: [
      {
        path: '',
        name: 'mspqiLanding',
        component: MSPQILandingView,
      },
      {
        path: 'report/:id',
        name: 'mspqiViewReport',
        component: MSPQIReportView,
      },
    ],
  },
  {
    path: '/pmp',
    name: 'pmp',
    component: PMPTemplateView,
    redirect: {
      name: 'pmpLanding',
    },
    meta: {
      requiresAuth: true,
      program: 'PMP',
      programTitle: 'PMP Reporting Program',
    },
    children: [
      {
        path: '',
        name: 'pmpLanding',
        component: PMPLandingView,
      },
      {
        path: 'report/:id',
        name: 'pmpViewReport',
        component: PMPReportView,
      },
    ],
  },
]

export const createRouter = (app: App<Element>) => {
  const router = createVueRouter({
    history: createWebHistory(),
    routes: createRoutes(),
    scrollBehavior(_0, _1, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      return { left: 0, top: 0 }
    },
  })
  router.beforeEach(async (to, _, next) => {
    const alertStore = useAlertStore()
    const authStore = useAuthStore()
    const reportStore = useReportStore()

    const authenticated = app.config.globalProperties.$keycloak.authenticated

    // Check if the API is available
    if (!authStore.apiAvailable && to.name !== 'error' && to.name !== 'help') {
      alertStore.setErrorAlert('PRP API is unavailable.')
      next({ name: 'error' })
      return
    }

    // Login handling. Place here instead of Login beforeEnter to centralize access to authStore/authenticated
    if (to.name === 'login') {
      // Authenticated users should never see the Login screen
      // Send them to Home instead
      if (authenticated) {
        next({ name: 'home' })
        return
      } else {
        // If the user is unauthenticated and attempting to Login, remove any existing permissions
        // This handles session expiry where a user's permissions have been retrieved but the refreshToken is invalid
        authStore.roles = []
        next()
        return
      }
    }

    // Validate the Report being viewed
    if (to.name === 'viewReport') {
      if (!reportStore.hasReport(to.params.id as string)) {
        alertStore.setErrorAlert(`You are not authorized to access ${to.path}`)
        next({ name: 'home' })
        return
      }
    }

    // Always navigate to pages that don't require auth
    if (!to.meta.requiresAuth) {
      next()
      return
    }

    // Secured pages shouldn't be available to unauthenticated users
    if (to.meta.requiresAuth && !authenticated) {
      alertStore.setErrorAlert(`You are not authorized to access ${to.path}. Please login first.`)
      next({ name: 'login' })
      return
    }

    // Check if the keycloak token has valid identity_provider (MFA)
    const idp = app.config.globalProperties.$keycloak.tokenParsed?.identity_provider
    const validIdps = import.meta.env.VITE_VALID_IDPS.split(',').map((value: any) => value.toLowerCase().trim())
    if (!validIdps.includes(idp.toLowerCase())) {
      next({ name: 'unauthorized' })
      return
    }

    // Validate that the user has roles
    const hasAnyRole = authStore.hasAnyRole
    if (!hasAnyRole && to.name !== 'unauthorized') {
      next({ name: 'unauthorized' })
      return
    }

    // Validate routes secured by program
    const program = to.meta.program
    if (program) {
      if (reportStore.hasProgram(program)) {
        next()
        return
      } else {
        alertStore.setErrorAlert(`You are not authorized to access ${to.path}`)
        next({ name: 'home' })
        return
      }
    }
    next()

    // Validate routes secured by role
    // const role = to.meta.role
    // if (role) {
    //   if (authStore.hasRole(role)) {
    //     next()
    //   } else {
    //     alertStore.setErrorAlert(`You are not authorized to access ${to.path}`)
    //     next({ name: 'home' })
    //   }
    // } else {
    //   next()
    // }
  })

  return router
}
