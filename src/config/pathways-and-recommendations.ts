import {BaseConfig} from './base-config'
import {buildStaticWidgetConfigParameters} from './common'
import {
  CategoryWidgetConfigParameters,
  GlobalWidgetConfigParameters,
  ItemWidgetConfigParameters,
  KeywordWidgetConfigParameters,
  MandatoryCategoryWidgetConfigParameters,
  MandatoryGlobalWidgetConfigParameters,
  MandatoryItemWidgetConfigParameters,
  MandatoryKeywordWidgetConfigParameters,
  MandatoryPathwaysAndRecommendationsConfigParameters,
  MandatoryPersonalizedWidgetConfigParameters,
  PersonalizedWidgetConfigParameters
} from './interfaces'

export type WidgetConfig =
  | KeywordWidgetConfig
  | CategoryWidgetConfig
  | ItemWidgetConfig
  | PersonalizedWidgetConfig
  | GlobalWidgetConfig

export class PathwaysAndRecommendationsConfigFactory extends BaseConfig<MandatoryPathwaysAndRecommendationsConfigParameters> {
  static build(widgetAttributes: DOMStringMap): WidgetConfig {
    switch (widgetAttributes.type) {
      case 'keyword':
        return KeywordWidgetConfig.build(
          (widgetAttributes as unknown) as KeywordWidgetConfigParameters
        )
      case 'category':
        return CategoryWidgetConfig.build(
          (widgetAttributes as unknown) as CategoryWidgetConfigParameters
        )
      case 'item':
        return ItemWidgetConfig.build(
          (widgetAttributes as unknown) as ItemWidgetConfigParameters
        )
      case 'personalized':
        return PersonalizedWidgetConfig.build(
          (widgetAttributes as unknown) as PersonalizedWidgetConfigParameters
        )
      case 'global':
        return GlobalWidgetConfig.build(
          (widgetAttributes as unknown) as GlobalWidgetConfigParameters
        )

      default:
        throw new Error(`Invalid widget type: "${widgetAttributes.type}"`)
    }
  }
}

export class ItemWidgetConfig extends BaseConfig<MandatoryItemWidgetConfigParameters> {
  static build(parameters: ItemWidgetConfigParameters): ItemWidgetConfig {
    const configParameters = ({
      ...buildStaticWidgetConfigParameters(parameters)
    } as unknown) as MandatoryItemWidgetConfigParameters
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      rows: parameters.numberOfItemsToFetch,
      item_ids: parameters.itemIds
    }
    return new ItemWidgetConfig(configParameters)
  }
}

export class KeywordWidgetConfig extends BaseConfig<MandatoryKeywordWidgetConfigParameters> {
  static build(parameters: KeywordWidgetConfigParameters): KeywordWidgetConfig {
    const configParameters = ({
      ...buildStaticWidgetConfigParameters(parameters)
    } as unknown) as MandatoryKeywordWidgetConfigParameters
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      rows: parameters.numberOfItemsToFetch,
      query: parameters.query
    }
    return new KeywordWidgetConfig(configParameters)
  }
}

export class CategoryWidgetConfig extends BaseConfig<MandatoryCategoryWidgetConfigParameters> {
  static build(
    parameters: CategoryWidgetConfigParameters
  ): CategoryWidgetConfig {
    const configParameters = ({
      ...buildStaticWidgetConfigParameters(parameters)
    } as unknown) as MandatoryCategoryWidgetConfigParameters
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      rows: parameters.numberOfItemsToFetch,
      cat_id: parameters.categoryId
    }
    return new CategoryWidgetConfig(configParameters)
  }
}

export class PersonalizedWidgetConfig extends BaseConfig<MandatoryPersonalizedWidgetConfigParameters> {
  static build(
    parameters: PersonalizedWidgetConfigParameters
  ): PersonalizedWidgetConfig {
    const configParameters = ({
      ...buildStaticWidgetConfigParameters(parameters)
    } as unknown) as MandatoryPersonalizedWidgetConfigParameters
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      rows: parameters.numberOfItemsToFetch,
      user_id: parameters.userId
    }
    return new PersonalizedWidgetConfig(configParameters)
  }
}

export class GlobalWidgetConfig extends BaseConfig<MandatoryGlobalWidgetConfigParameters> {
  static build(parameters: GlobalWidgetConfigParameters): GlobalWidgetConfig {
    const configParameters = ({
      ...buildStaticWidgetConfigParameters(parameters)
    } as unknown) as MandatoryGlobalWidgetConfigParameters
    configParameters.urlParameters = {
      ...configParameters.urlParameters,
      rows: parameters.numberOfItemsToFetch
    }
    return new GlobalWidgetConfig(configParameters)
  }
}
