import '@bcgov/bc-sans/css/BCSans.css'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from '@/App.vue'
import keycloak from '@/keycloak'
import { createRouter } from '@/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { getReports } from './services/ReportService'
import { useAuthStore } from './stores/auth'
import { useReportStore } from './stores/report'
import type { ReportConfig } from './types/reportTypes'

keycloak.onReady = async function (authenticated) {
  // Only initialize the application after keycloak is ready
  // otherwise the router won't have the correct authentication
  // info to work with
  let apiAvailable = true
  let reports: ReportConfig[] = []
  try {
    if (authenticated) {
      reports = await getReports()
    }
  } catch (err) {
    // Check for network error
    // Other errors (401, 403) are possible
    if (err instanceof Error) {
      if (err.message === 'Network Error') {
        apiAvailable = false
      }
    } else {
      console.log('Unexpected error', err)
    }
  } finally {
    initApp(reports, apiAvailable)
  }
}

function initApp(reports: ReportConfig[], apiAvailable: boolean) {
  const app = createApp(App)

  app.use(createPinia())
  const auth = useAuthStore()
  auth.apiAvailable = apiAvailable
  // auth.roles = roles

  const reportStore = useReportStore()
  reportStore.reports = reports

  const programs = [...new Set(reports.map((report) => report.program))]
  reportStore.programs = programs

  const router = createRouter(app)
  app.use(router)
  app.use(PrimeVue)
  app.config.globalProperties.$keycloak = keycloak

  // Configure FontAwesome
  library.add(faCheckCircle)
  library.add(faExclamationCircle)
  library.add(faExclamationTriangle)
  library.add(faInfoCircle)
  library.add(faTimes)

  app.component('font-awesome-icon', FontAwesomeIcon)

  app.mount('#app')
}
