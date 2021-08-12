# Bloomreach Javascript SDK

## Setup local environment

```bash
yarn
yarn start
```

After this the different modules are available on `localhost:1234`:

- http://localhost:1234/autosuggest.html
- http://localhost:1234/product-search.html?q=chair
- http://localhost:1234/category.html
- http://localhost:1234/pathways-and-recommendations.html

For Category module a category id (116715) is hardcoded in the HTML file in the example Bloomreach Connector config object. This can be overwritten by using a ?q= parameter in the URL with the wanted category ID, just like in the Product Search example URL above with the search query.

## Build project

```bash
yarn build
```

The newly built files will be in the `dist/` folder.

## Testing

### End to end testing

1. Start the project with `yarn start`
2. If you want to run all tests in headless mode, use `yarn cy:run`, or run them separately in a browser with `yarn cy:open` and click on the test you want to run.

### Integration/unit testing

To run Jest in watch mode, use

```bash
yarn test:watch
```
