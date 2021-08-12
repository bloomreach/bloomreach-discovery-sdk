import '../../../../test/matchmedia-mock'
import {AutosuggestConfig} from '../../../config'
import {AutosuggestMapper} from '../../../utils/object-mappers/autosuggest/mapper'
import {ApiCore} from '../../core'
import {mocked} from 'ts-jest/utils'
import {AutosuggestApiResponseV2} from '../../../utils/object-mappers/autosuggest/interfaces/api-response-v2'
import {AutosuggestConfigParameters} from '../../../config/interfaces'
import {AutosuggestData} from '../../../utils/object-mappers/autosuggest/interfaces/autosuggest-data'

beforeEach(() => {
  jest.resetAllMocks()
})

test('API core prepares autosuggest data correctly', async () => {
  const exampleConfigParameters = ({
    example: 'parameters'
  } as unknown) as AutosuggestConfigParameters
  const exampleConfig = ({example: 'config'} as unknown) as AutosuggestConfig
  const exampleApiResponse = ('example API response' as unknown) as AutosuggestApiResponseV2
  jest.spyOn(AutosuggestConfig, 'build')
  mocked(AutosuggestConfig.build).mockReturnValue(exampleConfig)
  jest.spyOn(ApiCore, 'fetch')
  mocked(ApiCore.fetch).mockResolvedValue(exampleApiResponse)
  jest.spyOn(AutosuggestMapper, 'buildFromV2Response')
  mocked(AutosuggestMapper.buildFromV2Response).mockImplementation(
    () => (({} as unknown) as AutosuggestData)
  )

  await ApiCore.getAutosuggestData(exampleConfigParameters)

  expect(AutosuggestConfig.build).toHaveBeenCalledTimes(1)
  expect(AutosuggestConfig.build).toHaveBeenCalledWith(exampleConfigParameters)
  expect(ApiCore.fetch).toHaveBeenCalledTimes(1)
  expect(ApiCore.fetch).toHaveBeenCalledWith(exampleConfig)
  expect(AutosuggestMapper.buildFromV2Response).toHaveBeenCalledTimes(1)
  expect(AutosuggestMapper.buildFromV2Response).toHaveBeenCalledWith(
    exampleApiResponse,
    exampleConfig
  )
})
