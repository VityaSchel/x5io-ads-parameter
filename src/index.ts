import Cookies from 'js-cookie'

let status: { wasVerified: false, previousResult: null } | { wasVerified: true, previousResult: boolean } 
  = { wasVerified: false, previousResult: null }

export const hasCheckboxes = (companyActive: boolean): boolean => {
  if(!status.wasVerified) {
    if (Cookies.get('visited') === undefined) {
      const params = new URLSearchParams(window.location.search)
      if (params.has('ads') && companyActive) {
        Cookies.set('visited', (new Date()).toISOString())

        const params = new URLSearchParams(window.location.search)
        // params.delete('ads')
        window.history.pushState({}, '', window.location.pathname + (params.toString() && '?' + params.toString()))

        status = { wasVerified: true, previousResult: false }
        return false
      } else {
        status = { wasVerified: true, previousResult: false }
        return true
      }
    } else {
      status = { wasVerified: true, previousResult: true }
      return true
    }
  } else {
    return status.previousResult
  }
}

export const resetVerificationStatus = () => {
  status.wasVerified = false 
}