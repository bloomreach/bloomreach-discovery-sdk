import '../../../../test/matchmedia-mock'
import {ApiCore} from '../../core'
import {mocked} from 'ts-jest/utils'
import {CategoryConfig} from '../../../config'
import {CategoryConfigParameters} from '../../../config/interfaces'
import {CategoryApiResponseV2} from '../../../utils/object-mappers/category/interfaces/api-response-v2'
import {CategoryData} from '../../../utils/object-mappers/category/interfaces/category-data'
import {CategoryMapper} from '../../../utils/object-mappers/category/mapper'

beforeEach(() => {
  jest.resetAllMocks()
})

test('API core prepares category data correctly', async () => {
  const exampleConfigParameters = ({
    example: 'parameters'
  } as unknown) as CategoryConfigParameters
  const exampleConfig = ({example: 'config'} as unknown) as CategoryConfig
  const exampleApiResponse = ('example API response' as unknown) as CategoryApiResponseV2
  jest.spyOn(CategoryConfig, 'build')
  mocked(CategoryConfig.build).mockReturnValue(exampleConfig)
  jest.spyOn(ApiCore, 'fetch')
  mocked(ApiCore.fetch).mockResolvedValue(exampleApiResponse)
  jest.spyOn(CategoryMapper, 'buildFromV2Response')
  mocked(CategoryMapper.buildFromV2Response).mockImplementation(
    () => (({} as unknown) as CategoryData)
  )

  await ApiCore.getCategoryData(exampleConfigParameters)

  expect(CategoryConfig.build).toHaveBeenCalledTimes(1)
  expect(CategoryConfig.build).toHaveBeenCalledWith(exampleConfigParameters)
  expect(ApiCore.fetch).toHaveBeenCalledTimes(1)
  expect(ApiCore.fetch).toHaveBeenCalledWith(exampleConfig)
  expect(CategoryMapper.buildFromV2Response).toHaveBeenCalledTimes(1)
  expect(CategoryMapper.buildFromV2Response).toHaveBeenCalledWith(
    exampleApiResponse,
    exampleConfig
  )
})
