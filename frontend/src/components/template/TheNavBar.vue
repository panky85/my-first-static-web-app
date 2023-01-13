<template>
  <nav role="navigation">
    <div class="container">
      <ul>
        <li id="login-link" :class="menuTabClass($route, '/login')" v-if="!authenticated">
          <RouterLink @click="resetAlert" :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li id="home-link" :class="tabClass($route, 'home')" v-if="authenticated">
          <RouterLink @click="resetAlert" :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li id="programs-link" :class="menuTabClass($route, '/program')" v-if="authenticated">
          <div class="dropdown">
            <span>Reporting Programs</span>
            <div class="dropdown-content">
              <RouterLink @click="resetAlert" :class="menuClass($route, 'mspqiLanding')" :to="{ name: 'mspqiLanding' }" v-if="reportStore.hasProgram('MSPQI')">MSPQI</RouterLink>
              <RouterLink @click="resetAlert" :class="menuClass($route, 'pmpLanding')" :to="{ name: 'pmpLanding' }" v-if="reportStore.hasProgram('PMP')">PMP</RouterLink>
            </div>
          </div>
        </li>
        <li id="help-link" :class="tabClass($route, 'help')" v-if="authenticated">
          <RouterLink @click="resetAlert" :to="{ name: 'help' }">Contact Us</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth'
import { useReportStore } from '@/stores/report'

import { defineComponent } from 'vue'
import type { RouteLocation, RouterLink } from 'vue-router'

export default defineComponent({
  name: 'TheNavBar',
  setup() {
    return { alertStore: useAlertStore(), authStore: useAuthStore(), reportStore: useReportStore() }
  },
  data() {
    return {}
  },
  computed: {
    authenticated(): boolean | undefined {
      return this.$keycloak.authenticated
    },
  },
  methods: {
    resetAlert() {
      this.alertStore.dismissAlert()
    },
    menuClass(route: RouteLocation, routeName: string) {
      return this.tabClass(route, routeName)
    },
    tabClass(route: RouteLocation, routeName: String) {
      return route.name === routeName ? 'active' : 'inactive'
    },
    menuTabClass(route: RouteLocation, routePath: string) {
      return route.path.startsWith(routePath) ? 'active' : 'inactive'
    },
  },
})
</script>

<style scoped>
/* Main Navigation */
nav {
  height: 40px;
  background-color: #38598a;
}
nav .container {
  max-width: 1320px;
  min-width: 1100px;
  margin: 0 auto;
  padding: 0 60px;
}
nav .container ul {
  padding: 0;
}
nav .container ul li {
  color: #ffffff;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  vertical-align: top;
  font-weight: bold;
}
nav .container ul li.active {
  background-color: #496da2;
}
nav .container ul li:first-child {
  margin-left: -20px;
}
nav .container ul li:hover {
  cursor: pointer;
  background-color: #496da2;
}
nav .container ul li a {
  display: block;
  font-size: 1rem;
  line-height: 40px;
  color: #ffffff;
  text-decoration: none;
  height: 40px;
  padding: 0 20px;
}

nav .container ul li span {
  display: block;
  font-size: 1rem;
  line-height: 40px;
  color: #ffffff;
  text-decoration: none;
  height: 40px;
  padding: 0 20px;
  cursor: auto;
}
nav .container ul li a:focus {
  background-color: #496da2;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  background-clip: padding-box;
  display: none;
  position: absolute;
  background-color: #496da2;
  min-width: 200px;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.4);
  z-index: 1;
  width: fit-content;
  white-space: nowrap;
}

/* Links inside the dropdown */
nav .container ul li .dropdown-content a {
  font-size: 14px;
  font-weight: normal;
}

nav .container ul li .dropdown-content a.active {
  font-weight: bold;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  color: #ffffff;
  background-color: #6583b0;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: table;
}

.dropdown-content a:target {
  display: none;
}
</style>
