import {buildStaticAutosuggestConfigParameters} from '../common'
import {AutosuggestConfig} from '../autosuggest'
import {mocked} from 'ts-jest/utils'

jest.mock('../common', () => ({
  buildStaticAutosuggestConfigParameters: jest.fn()
}))

beforeEach(() => {
  jest.resetAllMocks()
})

test('it builds the correct config object for Autosuggest module', () => {
  mocked(buildStaticAutosuggestConfigParameters).mockReturnValue({
    endpoint: 'http://example.com/autosuggest-endpoint',
    isEnabled: true,
    numberOfCollections: 3,
    numberOfProducts: 4,
    numberOfTerms: 5,
    selector: '.xyz',
    urlParameters: {
      account_id: 'account id 123',
      domain_key: 'domain_key value',
      request_id: 123456789,
      _br_uid_2: '_br_uid_2 345',
      ref_url: 'http://example.com/full/url',
      url: 'http://example.com/full/url',
      auth_key: 'auth_key 678',
      request_type: 'request_type example',
      q: 'whatever'
    },
    noEncodeParameters: ['_br_uid_2', 'sort'],
    defaultSearchParameter: 'sq',
    searchPageUrl: 'http://example.com'
  })

  const autosuggestConfig = AutosuggestConfig.build({q: 'valid search query'})

  expect(buildStaticAutosuggestConfigParameters).toHaveBeenCalledTimes(1)
  expect(autosuggestConfig.getAll()).toMatchInlineSnapshot(`
    Object {
      "defaultSearchParameter": "sq",
      "endpoint": "http://example.com/autosuggest-endpoint",
      "isEnabled": true,
      "noEncodeParameters": Array [
        "_br_uid_2",
        "sort",
      ],
      "numberOfCollections": 3,
      "numberOfProducts": 4,
      "numberOfTerms": 5,
      "searchPageUrl": "http://example.com",
      "selector": ".xyz",
      "urlParameters": Object {
        "_br_uid_2": "_br_uid_2 345",
        "account_id": "account id 123",
        "auth_key": "auth_key 678",
        "domain_key": "domain_key value",
        "q": "valid search query",
        "ref_url": "http://example.com/full/url",
        "request_id": 123456789,
        "request_type": "request_type example",
        "url": "http://example.com/full/url",
      },
    }
  `)
})
