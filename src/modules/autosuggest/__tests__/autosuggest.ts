import ejs from 'ejs'
import '../../../../test/matchmedia-mock'
import {ApiCore} from '../../core'
import {AutosuggestModule} from '../module'
import {mocked} from 'ts-jest/utils'
import {AutosuggestData} from '../../../utils/object-mappers/autosuggest/interfaces/autosuggest-data'

jest.mock('ejs')

beforeEach(() => {
  jest.resetAllMocks()
})

test('Autosuggest module builds and renders suggestions from query', async () => {
  const module = new AutosuggestModule({
    typedQueryTemplate: 'the typedQueryTemplate',
    template: 'the template',
    searchInputElement: ({} as unknown) as HTMLInputElement,
    searchResultsContainerElement: ({
      querySelectorAll: () => []
    } as unknown) as HTMLElement
  })

  const exampleResults = ({a: 'b'} as unknown) as AutosuggestData
  const exampleProcessedResults = {c: 'd'} as any
  jest.spyOn(ApiCore, 'getAutosuggestData')
  mocked(ApiCore.getAutosuggestData).mockResolvedValue(exampleResults)
  jest.spyOn(module, 'processResults')
  mocked(module.processResults).mockReturnValue(exampleProcessedResults)

  await module.suggest('example query string')

  expect(ApiCore.getAutosuggestData).toHaveBeenCalledTimes(1)
  expect(ApiCore.getAutosuggestData).toHaveBeenCalledWith({
    q: 'example query string'
  })
  expect(module.processResults).toHaveBeenCalledTimes(1)
  expect(module.processResults).toHaveBeenCalledWith(exampleResults)
  expect(ejs.render).toHaveBeenCalledTimes(1)
  expect(ejs.render).toHaveBeenCalledWith(
    'the template',
    exampleProcessedResults
  )
})
