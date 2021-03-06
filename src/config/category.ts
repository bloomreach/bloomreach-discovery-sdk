import {BaseConfig} from './base-config'
import {buildStaticCategoryConfigParameters} from './common'
import {
  MandatoryCategoryConfigParameters,
  MandatoryCategoryUrlParameters,
  CategoryConfigParameters
} from './interfaces'

export class CategoryConfig extends BaseConfig<MandatoryCategoryConfigParameters> {
  static build(parameters: CategoryConfigParameters): CategoryConfig {
    const configParameters = buildStaticCategoryConfigParameters()
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      ...parameters,
      ...('brSeg' in parameters
        ? {
            url: `${configParameters.urlParameters.url}${encodeURIComponent(
              `&brSeg=${parameters.brSeg?.replace('seg:', '')}`
            )}`
          }
        : {})
    }
    return new CategoryConfig(configParameters)
  }

  getUrlParameter = <K extends keyof MandatoryCategoryUrlParameters>(
    key: K
  ): MandatoryCategoryUrlParameters[K] => {
    return this.data.urlParameters[key]
  }
}
