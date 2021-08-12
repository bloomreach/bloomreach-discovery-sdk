import {BaseConfig} from './base-config'
import {buildStaticAutosuggestConfigParameters} from './common'
import {
  MandatoryAutosuggestConfigParameters,
  AutosuggestConfigParameters
} from './interfaces'

export class AutosuggestConfig extends BaseConfig<MandatoryAutosuggestConfigParameters> {
  static build(parameters: AutosuggestConfigParameters): AutosuggestConfig {
    const configParameters = buildStaticAutosuggestConfigParameters()
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      ...parameters
    }
    return new AutosuggestConfig(configParameters)
  }
}
