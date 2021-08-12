import {buildStaticCategoryConfigParameters} from '../common'
import {mocked} from 'ts-jest/utils'
import {CategoryConfig} from '../category'

jest.mock('../common', () => ({
  buildStaticCategoryConfigParameters: jest.fn()
}))

beforeEach(() => {
  jest.resetAllMocks()
})

test('it builds the correct config object for Category module', () => {
  mocked(buildStaticCategoryConfigParameters).mockReturnValue({
    endpoint: 'http://example.com',
    isEnabled: true,
    areFacetsIncluded: true,
    infiniteScroll: false,
    isCategoryPage: true,
    itemsPerPage: 12,
    initialNumberOfFacetValues: 3,
    initialNumberOfFacets: 4,
    areVariantsDisplayed: false,
    selector: '.selector-of-element',
    defaultSearchParameter: 'sq',
    sortingOptions: [{label: 'x', value: 'price+asc'}],
    urlParameters: {
      account_id: 'account id 123',
      request_id: 123456789,
      _br_uid_2: '_br_uid_2 345',
      ref_url: 'http://example.com',
      url: 'http://example.com/full/url',
      auth_key: 'auth_key 678',
      rows: 11,
      start: 2,
      domain_key: 'example_com',
      request_type: 'search',
      search_type: 'category',
      fl: 'pid,title,price,sale_price,colors,sizes',
      q: 'to be overwrite'
    },
    noEncodeParameters: ['_br_uid_2', 'sort'],
    categoryId: 'furnitures001',
    displayVariants: false
  })

  const categoryConfig = CategoryConfig.build({
    q: 'valid product search query'
  })

  expect(buildStaticCategoryConfigParameters).toHaveBeenCalledTimes(1)
  expect(categoryConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "areFacetsIncluded": true,
      "areVariantsDisplayed": false,
      "categoryId": "furnitures001",
      "defaultSearchParameter": "sq",
      "displayVariants": false,
      "endpoint": "http://example.com",
      "infiniteScroll": false,
      "initialNumberOfFacetValues": 3,
      "initialNumberOfFacets": 4,
      "isCategoryPage": true,
      "isEnabled": true,
      "itemsPerPage": 12,
      "noEncodeParameters": Array [
        "_br_uid_2",
        "sort",
      ],
      "selector": ".selector-of-element",
      "sortingOptions": Array [
        Object {
          "label": "x",
          "value": "price+asc",
        },
      ],
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "auth_key": "auth_key 678",
        "domain_key": "example_com",
        "fl": "pid,title,price,sale_price,colors,sizes",
        "q": "valid product search query",
        "ref_url": "http://example.com",
        "request_id": 123456789,
        "request_type": "search",
        "rows": 11,
        "search_type": "category",
        "start": 2,
        "url": "http://example.com/full/url",
      },
    }
  `)
})
