import {CategoryModule} from './category/module'

declare const window: any

window.BloomreachModules = {
  ...(window.BloomreachModules ? window.BloomreachModules : {}),
  category: CategoryModule
}

CategoryModule.load()
