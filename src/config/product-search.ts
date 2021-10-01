import {BaseConfig} from './base-config'
import {buildStaticProductSearchConfigParameters} from './common'
import {
  MandatoryProductSearchConfigParameters,
  MandatoryProductSearchUrlParameters,
  ProductSearchConfigParameters
} from './interfaces'

export class ProductSearchConfig extends BaseConfig<MandatoryProductSearchConfigParameters> {
  static build(parameters: ProductSearchConfigParameters): ProductSearchConfig {
    const configParameters = buildStaticProductSearchConfigParameters()
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
    return new ProductSearchConfig(configParameters)
  }

  getUrlParameter = <K extends keyof MandatoryProductSearchUrlParameters>(
    key: K
  ): MandatoryProductSearchUrlParameters[K] => {
    return this.data.urlParameters[key]
  }
}
