# Ads parameter

Утилита для параметра ?ads в URL

## Требования

1. React 18.0.0 и выше
2. Использует js-cookie ('window' environment)

## Установка

1. Следуйте инструкциям в <https://gitlab.com/x5.io_npmjs_components/getting-started>, чтобы получить доступ к компоненту на npmjs.com
2. `npm install @x5io/ads_parameter`

## Использование

### `getCheckboxRenderType = (isAdsCampaignActive: boolean | null) => Result`

Если isAdsCampaignActive === null, это означает, что ?ads не представлен

### `resetVerificationStatus = () => void`

Сбросить статус, чтобы `getCheckboxRenderType` не возвращал сохраненный в локальной переменной стейт