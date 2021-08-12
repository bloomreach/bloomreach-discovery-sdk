import ejs from 'ejs'
import '../../../../test/matchmedia-mock'
import {ApiCore} from '../../core'
import {CategoryModule} from '../module'
import {mocked} from 'ts-jest/utils'
import {CategoryData} from '../../../utils/object-mappers/category/interfaces/category-data'
import {CategoryConfig} from '../../../config/category'

jest.mock('ejs')

beforeEach(() => {
  jest.resetAllMocks()
})

test('Category module builds and renders results from URL parameters', async () => {
  const module = new CategoryModule({
    template: 'the template',
    resultsContainerElement: ({} as unknown) as HTMLElement
  })

  const exampleResults = ({
    a: 'b',
    start: 0,
    number_of_results: 14
  } as unknown) as CategoryData
  jest.spyOn(ApiCore, 'getCategoryData')
  mocked(ApiCore.getCategoryData).mockResolvedValue(exampleResults)

  const config = ({
    get: jest.fn().mockImplementation((key: string) => {
      switch (key) {
        case 'defaultSearchParameter':
          return '_sq'
        case 'itemsPerPage':
          return 5
        case 'urlParameters':
          return {q: ''}
      }
    })
  } as unknown) as CategoryConfig

  const urlParams = new URLSearchParams('_sq=chaix&page=3&size=3')

  await module.initiateSearch(urlParams, config)

  expect(ApiCore.getCategoryData).toHaveBeenCalledTimes(1)
  expect(ApiCore.getCategoryData).toHaveBeenCalledWith({
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
