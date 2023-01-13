import { defineStore } from 'pinia'

import { DEFAULT_ERROR_MESSAGE } from '@/util/constants.js'

interface AlertState {
  message: string
  type: string
  active: boolean
}

export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    message: '',
    type: 'success',
    active: false,
  }),
  getters: {},
  actions: {
    setAlert(alert: AlertState) {
      this.message = alert.message
      this.type = alert.type
      this.active = true
    },
    setErrorAlert(message: string) {
      this.message = message || DEFAULT_ERROR_MESSAGE
      this.type = 'error'
      this.active = true
    },
    setErrorAlerts(messages: string[]) {
      const message = messages.join('\n')
      this.message = message
      this.type = 'error'
      this.active = true
    },
    setInfoAlert(message: string) {
      this.message = message
      this.type = 'info'
      this.active = true
    },
    setSuccessAlert(message: string) {
      this.message = message
      this.type = 'success'
      this.active = true
    },
    setWarningAlert(message: string) {
      this.message = message
      this.type = 'warning'
      this.active = true
    },
    dismissAlert() {
      this.active = false
    },
  },
})
