import '../../../../test/matchmedia-mock'
import {ApiCore} from '../../core'
import {mocked} from 'ts-jest/utils'
import {ProductSearchConfig} from '../../../config'
import {ProductSearchConfigParameters} from '../../../config/interfaces'
import {ProductSearchApiResponseV2} from '../../../utils/object-mappers/product-search/interfaces/api-response-v2'
import {ProductSearchData} from '../../../utils/object-mappers/product-search/interfaces/product-search-data'
import {ProductSearchMapper} from '../../../utils/object-mappers/product-search/mapper'

beforeEach(() => {
  jest.resetAllMocks()
})

test('API core prepares product search data correctly', async () => {
  const exampleConfigParameters = ({
    example: 'parameters'
  } as unknown) as ProductSearchConfigParameters
  const exampleConfig = ({example: 'config'} as unknown) as ProductSearchConfig
  const exampleApiResponse = ('example API response' as unknown) as ProductSearchApiResponseV2
  jest.spyOn(ProductSearchConfig, 'build')
  mocked(ProductSearchConfig.build).mockReturnValue(exampleConfig)
  jest.spyOn(ApiCore, 'fetch')
  mocked(ApiCore.fetch).mockResolvedValue(exampleApiResponse)
  jest.spyOn(ProductSearchMapper, 'buildFromV2Response')
  mocked(ProductSearchMapper.buildFromV2Response).mockImplementation(
    () => (({} as unknown) as ProductSearchData)
  )

  await ApiCore.getProductSearchData(exampleConfigParameters)

  expect(ProductSearchConfig.build).toHaveBeenCalledTimes(1)
  expect(ProductSearchConfig.build).toHaveBeenCalledWith(
    exampleConfigParameters
  )
  expect(ApiCore.fetch).toHaveBeenCalledTimes(1)
  expect(ApiCore.fetch).toHaveBeenCalledWith(exampleConfig)
  expect(ProductSearchMapper.buildFromV2Response).toHaveBeenCalledTimes(1)
  expect(ProductSearchMapper.buildFromV2Response).toHaveBeenCalledWith(
    exampleApiResponse,
    exampleConfig
  )
})
