# Lit Playground ⛹️‍♀️

To try out creating web components using lit

## Audience

1. For farmers, tourist or travel organisations who want to display the map on their website see the [end users section](#for-end-users)
1. For developers see the [developer section](#for-developers)

## For end users

1. Copy and paste the following code on your website

`<alpaca-map key="-TODO-"></alpaca-map>`

1. Optional. To center the map on your favourite farm, replace the latitude and longitude with your coordinates

`<alpaca-map key="-TODO-" centerLat="-33.8688" centerLng="151.2093"></alpaca-map>`

## For developers

### Install app 🪴

- Pre condition: Node version 22

`npm install`

### API dependencies

Ensure APIs this app depends on are running

1. `/api/companies`

### Develop app 👷‍♀️

- Pre condition: Build the file(s) indicated in [build.js](build.js). Update as required

Build with hot refresh

`npm run build:watch`

Standard build

`npm run build`

### Run app 🚀

`npm run start`

Navigate to address shown in log
