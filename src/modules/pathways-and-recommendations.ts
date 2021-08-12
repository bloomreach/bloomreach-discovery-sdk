import {PathwaysAndRecommendationsModule} from './pathways-and-recommendations/module'

declare const window: any

window.BloomreachModules = {
  ...(window.BloomreachModules ? window.BloomreachModules : {}),
  pathwaysRecommendations: PathwaysAndRecommendationsModule
}

PathwaysAndRecommendationsModule.load()
