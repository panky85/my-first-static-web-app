export function handleServiceError(err: any, alertStore: { setWarningAlert: (arg0: string) => void; setErrorAlert: (arg0: any) => void }, router: any) {
  if (typeof err === 'boolean') {
    // Keycloak refresh token expiry causes Boolean err
    // Warn and return to login
    alertStore.setWarningAlert('Session expired. Please login.')
    router.push({ name: 'login' })
  } else {
    const errMessage: string = String(err)
    alertStore.setErrorAlert(errMessage)
  }
}
