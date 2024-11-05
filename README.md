# Alpaca Map Web Component 🦙

Web component created using [lit](https://lit.dev/)

## Audience 🗺️

1. For farmers, tourist or travel organisations who want to display the map on their website see the [end users section](#for-end-users)
1. For developers see the [developer section](#for-developers)

## For end users 🪩

1. Copy and paste the lines below directly inside the `<head></head>` tag of website

   ```
   <meta name="viewport" content="width=device-width,initial-scale=1" />
   ```

1. Generate a [google maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

1. Copy and paste the following code inside the `<body></body>` tag of website where the component should appear, replacing `GOOGLE-API-KEY` with your key

```
<alpaca-map apiKey="GOOGLE-API-KEY"></alpaca-map>
```

1. Optional. To center the map on a favourite farm, replace the latitude and longitude with its `centerLat` and `centerLng` coordinates

```
   <alpaca-map apiKey="GOOGLE-API-KEY" centerLat="-33.8688" centerLng="151.2093"></alpaca-map>
```

1. Optional. To override the data source, set the value of `dataSource`, eg

```
   <alpaca-map apiKey="GOOGLE-API-KEY" dataSource="https://www.replace-me.com/api/cool-api"></alpaca-map>
```

1. Optional. To override map markers linking to the farm page, set the value of `linkToFarmPage`

- `true`- shows link on map marker to www.alpaca.life farm info page
- `false`- does not show link

eg

```
   <alpaca-map apiKey="GOOGLE-API-KEY" linkToFarmPage=false></alpaca-map>
```

## For developers 🤖

### Install app 🪴

- Pre condition: Node version 22

`npm install`

### API dependencies 🔗

Ensure APIs this app depends on are running

1. `/api/companies`

### Develop app 👷‍♀️

- Pre condition: Build the file(s) indicated in [build.js](build.js). Update as required

Build with hot refresh

`npm run build:watch`

Standard build

`npm run build`

Format the code

`npm run prettier`
🧪

### Test app

Unit tests

```bash
npm run test
```

UI tests

- Precondition: Install browsers for UI tests

```bash
npx playwright install --with-deps
```

Run tests headless mode

```bash
npm run test-ui
```

Interactive mode

```bash
npm run test-ui -- --ui
```

### Run app 🚀

`npm run start`

Navigate to address shown in log
