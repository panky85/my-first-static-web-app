import axios from 'axios'

import keycloak from '../keycloak'

export const resources = {
  reports: {
    getReports: 'reports',
    reportEmbedConfiguration: 'reports/embed-configuration/:id',
  },
}

export function apiRequest() {
  function createAxios() {
    const baseURL = import.meta.env.VITE_SERVICE_URL
    return axios.create({
      baseURL,
      headers: { Authorization: 'Bearer ' + keycloak.token },
    })
  }
  return keycloak.updateToken(0).then(createAxios)
}

export default apiRequest
