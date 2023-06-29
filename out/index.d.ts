export type Result = 'SHOW_LITE_CHECKBOX' | 'SHOW_FULL_CHECKBOXES';
/**
 * `SHOW_LITE_CHECKBOX` — means show one lite checkbox\
 * `SHOW_FULL_CHECKBOXES` — means show all (two) checkboxes\
 * If [ads] is not present, fallback to `SHOW_FULL_CHECKBOXES`
 * @param {boolean | null} isAdsCampaignActive If null, indicates that `?ads` is not present
 */
export declare const getCheckboxRenderType: (isAdsCampaignActive: boolean | null) => Result;
export declare const resetVerificationStatus: () => void;
