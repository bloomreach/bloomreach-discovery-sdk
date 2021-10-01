# Change Log

All notable changes to this project will be documented in this file.

## [1.3.0] - 2021-09-17

### Changed

If there is a not-null value on the `brSegmentation` key in localStorage:

- Add its value with a `seg:` prefix to the `brSeg` URL parameter in API calls in Product Search, Category and Pathways & Recommendations modules
- Add its value URL encoded in the format of `&brSeg=<SegmentValue>` to the `url` URL parameter in API calls in Product Search, Category and Pathways & Recommendations modules
- Populate its value into the `window.br_data` object's `customer_profile` property for pixel firing
- Add its value with a `customer_profile:` prefix to the `segment` URL parameter in API calls in Product Search and Category modules

## [1.2.2] - 2021-09-20

### Changed

Encode multi-value facet value parts between ampersands.
Properly encode facet values with double quotes and comma character.
Scroll to the top after every search event, like at selecting/deselecting a facet value.

## [1.2.1] - 2021-09-16

### Changed

Fix event listener stacking issues of price range selector, page size selector, sort selector and pagination buttons.

Make the facet labels a little bit narrower to fix a design issue for a certain long label.

## [1.2.0] - 2021-09-16

### Changed

Make price range selector use `stats` attribute values and smaller steps in Products Search and Category modules.

## [1.1.0] - 2021-08-18

### Changed

Change response mapping to pass all the attributes from the JSON response to the template data object in these files:

- src/utils/object-mappers/autosuggest/mapper.ts
- src/utils/object-mappers/category/mapper.ts
- src/utils/object-mappers/pathways-and-recommendations/mapper.ts
- src/utils/object-mappers/product-search/mapper.ts

Also updated the automated tests in the directories of the files above.
