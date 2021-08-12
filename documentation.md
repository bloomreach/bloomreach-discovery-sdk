# brSM SDK Documentation

## Widgets

Out of the box the SDK supports 5 widget types:

- Item
- Keyword
- Category
- Personalized
- Global

## UI features

### Autosuggest

Under a given input field the SDK can attach a panel for displaying the related suggestions for search terms, collections and products.

### Facets

For a collection or keyword based search results the SDK can include related facets for filtering the product list.

### Search results

On a search results page the SDK can load the product results for a given search terms into the page, along with their related facets.

### Recommendations

In certain widgets the SDK can load up recommended products based on pre-defined rules.

### Collections

On a collections page the SDK can load the product results for a given collection into the page, along with their related facets.

### Pagination

When there are more results than the number that is configured to display in a page, then pagination links help the navigation across the result set.

### Infinite scroll

On mobile screen sizes the SDK loads more results automatically on scroll instead of using pagination links. On bigger screens usage of infinite scroll or pagination links is configurable.

### Spell correction

When there is a misspelling, Bloomreach still loads up the results for the corrected keyword automatically and the SDK lets the user know about the correction.

### Keyword redirection

When keyword redirection is configured, the SDK loads up the configured results set and lets the user know about the redirection.

### Variant support

For products with variants the different variant can be expanded into the result set, so the variants will be show up as distinct products.

## Technical details

The SDK consists of 5 modules, each module can be used by including its script (and optionally stylesheet) file in the page.

### Commonly configurable variables in the SDK

- Account ID
- Domain key
- Authentication key
- Tracking cookie
- Default search URL parameter name
- URL of the search page

#### Example of common config variables in the Bloomreach Connector object:

```javascript
bloomreachConnector.config = {
  account_id: '6621',
  domain_key: 'bornconnector_domain',
  auth_key: '123j32eqbeqaahsa',
  tracking_cookie: 'uid%3D5015349872345%3Av%3D11.8%3Ats%3D1613763063884%3Ahc%3D114',
  default_search_parameter: 'q',
  search_page_url: 'http://localhost:1234/product-search.html',
  ...
}
```

### Modules

- [Autosuggest module](#autosuggest-module)
- [Product Search module](#product-search-module)
- [Category module](#category-module)
- [Pathways & Recommendations module](#pathways-&-recommendations-module)
- [Product Events module](#product-events-module)

# Autosuggest module

Attaches a listener to the configured input field and shows the suggestion results under that field on every keystroke.

## Installing Autosuggest module

The module can be used by including a direct link to the module files in your webpage.

```html
<link rel="stylesheet" href="autosuggest.css" />
<script src="autosuggest.js" defer></script>
```

You will then have access to the module under the `BloomreachModules.autosuggest` object in the global scope (`window`).

The module loads itself automatically right after the page is fully loaded if it's set to be enabled in the [Bloomreach Connector config object](#example-autosuggest-config-variables-in-the-Bloomreach-Connector-object).

If you need to load the module manually for some reason, you can do that by calling the load static method on it like this:

```javascript
BloomreachModules.autosuggest.load()
```

## What's configurable in the Autosuggest module

- Is it enabled or not
- Number of term suggestions to display
- Number of collection suggestions to display
- Number of product suggestions to display
- The CSS selector of the input field that the autosuggest panel will be attached to

When there are collection term suggestions, the [Category module](#category-module) also needs to be loaded on the page and its configured selector needs to be in the DOM, so the category results can be loaded after clicking on the suggested term.

## Example Autosuggest config variables in the Bloomreach Connector object:

```javascript
bloomreachConnector.config = {
  ...
  autosuggest: {
    enabled: true,
    number_of_terms: 13,
    number_of_products: 14,
    number_of_collections: 15,
    selector: '.search__input'
  },
  ...
  category: {
    enabled: true,
    selector: '.main-content',
  },
  ...
}
```

# Product Search module

For the given search term it loads in the results into the page, and optionally the related facets as well.

For every facet change the module rerenders the page with the filtered results.

## Installing Product Search module

The module can be used by including a direct link to the module files in your webpage.

```html
<link rel="stylesheet" href="product-search.css" />
<script src="product-search.js" defer></script>
```

You will then have access to the module under the `BloomreachModules.search` object in the global scope (`window`).

The module loads itself automatically right after the page is fully loaded if it's set to be enabled in the [Bloomreach Connector config object](#example-product-search-config-variables-in-the-Bloomreach-Connector-object).

If you need to load the module manually for some reason, you can do that by calling the load static method on it like this:

```javascript
BloomreachModules.search.load()
```

## What's configurable in the Product Search module

- Is it enabled or not
- Number of results to display in one page
- Should facets be included on the page or not
- Number of facet groups to show initially (hidden ones can be revealed with a "More +" link)
- Number of facet values to show initially in a facet group (hidden ones can be revealed with a "More +" link)
- Should infinite scroll be used on bigger screens or not
- The CSS selector of the container that will hold the search results
- Sorting options for the result set that can be selected on the page in a dropdown field
- Should the variants be expanded into the result set or not

## Example Product Search config variables in the Bloomreach Connector object:

```javascript
bloomreachConnector.config = {
  ...
  search: {
    enabled: true,
    items_per_page: 16,
    facets_included: true,
    initial_number_of_facets: 5,
    initial_number_of_facet_values: 6,
    infinite_scroll: false,
    selector: '.main-content',
    sorting_options: [
      {label: 'Relevance', value: ''},
      {label: 'Price (low - high)', value: 'price+asc'},
      {label: 'Name (A - Z)', value: 'title+asc'},
      {label: 'Price (high - low)', value: 'price+desc'},
      {label: 'Name (Z - A)', value: 'title+desc'}
    ],
    is_search_page: true,
    display_variants: false
  },
  ...
}
```

# Category module

For the current collection it loads in the results into the page, and optionally the related facets as well.

For every facet change the module rerenders the page with the filtered results.

This module has the same feature set as the Product Search module.

## Installing Product Search module

The module can be used by including a direct link to the module files in your webpage.

```html
<link rel="stylesheet" href="category.css" />
<script src="category.js" defer></script>
```

You will then have access to the module under the `BloomreachModules.category` object in the global scope (`window`).

The module loads itself automatically right after the page is fully loaded if it's set to be enabled in the [Bloomreach Connector config object](#example-category-config-variables-in-the-Bloomreach-Connector-object).

If you need to load the module manually for some reason, you can do that by calling the load static method on it like this:

```javascript
BloomreachModules.category.load()
```

## What's configurable in the Category module

- Is it enabled or not
- Number of results to display in one page
- Should facets be included on the page or not
- Number of facet groups to show initially (hidden ones can be revealed with a "More +" link)
- Number of facet values to show initially in a facet group (hidden ones can be revealed with a "More +" link)
- Should infinite scroll be used on bigger screens or not
- The CSS selector of the container that will hold the collection results
- Sorting options for the result set that can be selected on the page in a dropdown field
- Should the variants be expanded into the result set or not

## Example Category config variables in the Bloomreach Connector object:

```javascript
bloomreachConnector.config = {
  ...
  category: {
    enabled: true,
    sorting_options: [
      {label: 'Relevance', value: ''},
      {label: 'Price (low - high)', value: 'price+asc'},
      {label: 'Name (A - Z)', value: 'title+asc'},
      {label: 'Price (high - low)', value: 'price+desc'},
      {label: 'Name (Z - A)', value: 'title+desc'}
    ],
    items_per_page: 12,
    facets_included: true,
    initial_number_of_facets: 5,
    initial_number_of_facet_values: 6,
    infinite_scroll: false,
    selector: '.main-content',
    is_category_page: true,
    display_variants: false,
    category_id: '116715'
  },
  ...
}
```

# Pathways & Recommendations module

Loads the content of the different widgets into their containers on the page.

## Installing Pathways & Recommendations module

The module can be used by including a direct link to the module files in your webpage.

```html
<link rel="stylesheet" href="pathways-and-recommendations.css" />
<script src="pathways-and-recommendations.js" defer></script>
```

You will then have access to the module under the `BloomreachModules.pathwaysRecommendations` object in the global scope (`window`).

The module loads itself automatically right after the page is fully loaded.

If you need to load the module manually for some reason, you can do that by calling the load static method on it like this:

```javascript
BloomreachModules.pathwaysRecommendations.load()
```

## What's configurable in the Item type widget

- The number of items to load into the widget
- The number of items to show at a time in the widget
- The item ID(s) related to load the related result set for

### Example markup for placing an Item type widget in the DOM

```html
<div
  class="blm-recommendations-widget"
  data-id="pWb1zD"
  data-type="item"
  data-item-ids="55837"
  data-number-of-items-to-fetch="16"
  data-number-of-items-to-show="4"
></div>
```

## What's configurable in the Keyword type widget

- The number of items to load into the widget
- The number of items to show at a time in the widget
- The keyword to load the results for

### Example markup for placing a Keyword type widget in the DOM

```html
<div
  class="blm-recommendations-widget"
  data-id="kgrb9g"
  data-type="keyword"
  data-query="bed and bath"
  data-number-of-items-to-fetch="16"
  data-number-of-items-to-show="4"
></div>
```

## What's configurable in the Category type widget

- The number of items to load into the widget
- The number of items to show at a time in the widget
- The category ID to load the items from

### Example markup for placing a Category type widget in the DOM

```html
<div
  class="blm-recommendations-widget"
  data-id="RD2X9d"
  data-type="category"
  data-number-of-items-to-fetch="16"
  data-number-of-items-to-show="4"
  data-category-id="116940"
></div>
```

## What's configurable in the Personalized type widget

- The number of items to load into the widget
- The number of items to show at a time in the widget
- The ID of the user who will see the personalized result set

### Example markup for placing a Personalized type widget in the DOM

```html
<div
  class="blm-recommendations-widget"
  data-id="pWbBzW"
  data-type="personalized"
  data-user-id="123"
  data-number-of-items-to-fetch="16"
  data-number-of-items-to-show="4"
></div>
```

## What's configurable in the Global type widget

- The number of items to load into the widget
- The number of items to show at a time in the widget

### Example markup for placing a Global type widget in the DOM

```html
<div
  class="blm-recommendations-widget"
  data-id="MDxLyD"
  data-type="global"
  data-number-of-items-to-fetch="16"
  data-number-of-items-to-show="4"
></div>
```

# Product Events module

Attaches listeners to Add to Cart and Quickview items for firing these pixel events.

There's no any configurable variable for this module.

## Installing Pathways & Recommendations module

The module can be used by including a direct link to the module files in your webpage.

```html
<script src="product-events.js" defer></script>
```

You will then have access to the module under the `BloomreachModules.events` object in the global scope (`window`).

The module loads itself automatically right after the page is fully loaded.

If you need to load the module manually for some reason, you can do that by calling the load static method on it like this:

```javascript
BloomreachModules.events.load()
```

### Example markup for placing an Add to Cart button in the DOM

```html
<button
  data-blm-add-to-cart
  data-blm-add-to-cart-sku="Chair123"
  data-blm-add-to-cart-prod-id="60765"
  data-blm-add-to-cart-prod-name="Weathered Gray Wood Jozy Dining Chairs Set of 2"
>
  Add to cart
</button>
```

### Example markup for placing a Quickview button in the DOM

```html
<button
  data-blm-quickview
  data-blm-quickview-sku="Chair123"
  data-blm-quickview-prod-id="60765"
  data-blm-quickview-prod-name="Weathered Gray Wood Jozy Dining Chairs Set of 2"
>
  Quickview
</button>
```
