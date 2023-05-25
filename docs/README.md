# inorigojs

> Inorigo utility that makes accessing inorigo services simple!

## Using this VuePress template

```bash
npm run dev
npm run build
```

## Running unit tests with Vitest and Cypress
---------------------------------------------

### Make sure you have access to a inorigo instance and set the username/password in following files:

```js
cypress\e2e\ApplicationRuntimeAPI.cy.ts
src\test-utils\config.json
```

### Run Vitest
```bash
npm run test:ui
```

### Run Cypress
```bash
npm run cypress:open
```