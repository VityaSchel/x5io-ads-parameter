import Cookies from 'js-cookie'

let status: { wasVerified: false } | { wasVerified: true, previousResult: Result } 
  = { wasVerified: false }

export type Result = 'SHOW_LITE_CHECKBOX'
  | 'SHOW_FULL_CHECKBOXES'

/**
 * `SHOW_LITE_CHECKBOX` — means show one lite checkbox\
 * `SHOW_FULL_CHECKBOXES` — means show all (two) checkboxes\
 * If [ads] is not present, fallback to `SHOW_FULL_CHECKBOXES`
 * @param {boolean | null} isAdsCampaignActive If null, indicates that `?ads` is not present
 */

export const getCheckboxRenderType = (isAdsCampaignActive: boolean | null): Result => {
  if(status.wasVerified) {
    return status.previousResult
  } else {
    if (Cookies.get('visited') !== undefined) {
      status = { wasVerified: true, previousResult: 'SHOW_FULL_CHECKBOXES' }
      return 'SHOW_FULL_CHECKBOXES'
    } else {
      if(isAdsCampaignActive === null) {
        status = { wasVerified: true, previousResult: 'SHOW_FULL_CHECKBOXES' }
        return 'SHOW_FULL_CHECKBOXES'
      } else {
        const params = new URLSearchParams(window.location.search)
        params.delete('ads')
        window.history.pushState({}, '', window.location.pathname + (params.toString() && '?' + params.toString()))

        if(isAdsCampaignActive === false) {
          status = { wasVerified: true, previousResult: 'SHOW_FULL_CHECKBOXES' }
          return 'SHOW_FULL_CHECKBOXES'
        } else {
          Cookies.set('visited', String(Date.now()), { expires: 365 })
          status = { wasVerified: true, previousResult: 'SHOW_LITE_CHECKBOX' }
          return 'SHOW_LITE_CHECKBOX'
        }
      }
    }
  }
}

// export const hasCheckboxes = (companyActive: boolean): boolean => {
//   if(!status.wasVerified) {
//     if (Cookies.get('visited') === undefined) {
//       const params = new URLSearchParams(window.location.search)
//       if (params.has('ads') && companyActive) {
//         Cookies.set('visited', String(Date.now()), { expires: 365 })

//         const params = new URLSearchParams(window.location.search)
//         // params.delete('ads')
//         window.history.pushState({}, '', window.location.pathname + (params.toString() && '?' + params.toString()))

//         status = { wasVerified: true, previousResult: false }
//         return false
//       } else {
//         status = { wasVerified: true, previousResult: false }
//         return true
//       }
//     } else {
//       status = { wasVerified: true, previousResult: true }
//       return true
//     }
//   } else {
//     return status.previousResult
//   }
// }

export const resetVerificationStatus = () => {
  status.wasVerified = false 
}
