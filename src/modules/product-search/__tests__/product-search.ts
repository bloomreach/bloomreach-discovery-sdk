import ejs from 'ejs'
import '../../../../test/matchmedia-mock'
import {ApiCore} from '../../core'
import {ProductSearchModule} from '../module'
import {mocked} from 'ts-jest/utils'
import {ProductSearchData} from '../../../utils/object-mappers/product-search/interfaces/product-search-data'
import {ProductSearchConfig} from '../../../config/product-search'

jest.mock('ejs')

beforeEach(() => {
  jest.resetAllMocks()
})

test('Product Search module builds and renders results from URL parameters', async () => {
  const module = new ProductSearchModule({
    template: 'the template',
    searchResultsContainerElement: ({} as unknown) as HTMLElement
  })

  const exampleResults = ({
    a: 'b',
    start: 0,
    number_of_results: 14
  } as unknown) as ProductSearchData
  jest.spyOn(ApiCore, 'getProductSearchData')
  mocked(ApiCore.getProductSearchData).mockResolvedValue(exampleResults)

  const config = ({
    get: jest.fn().mockImplementation((key: string) => {
      switch (key) {
        case 'defaultSearchParameter':
          return '_sq'
        case 'itemsPerPage':
          return 5
      }
    })
  } as unknown) as ProductSearchConfig

  const urlParams = new URLSearchParams('_sq=chaix&page=3&size=3')

  await module.initiateSearch(urlParams, config)

  expect(ApiCore.getProductSearchData).toHaveBeenCalledTimes(1)
  expect(ApiCore.getProductSearchData).toHaveBeenCalledWith({
    q: 'chaix',
    rows: 3,
    start: 6 /* This is the index where the 3. page is beginning */,
    _sq: 'chaix',
    page: '3',
    size: '3'
  })
  expect(ejs.render).toHaveBeenCalledTimes(1)
  expect(ejs.render).toHaveBeenCalledWith('the template', exampleResults)
})
