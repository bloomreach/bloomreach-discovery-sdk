import {ProductSearchModule} from './product-search/module'

declare const window: any

window.BloomreachModules = {
  ...(window.BloomreachModules ? window.BloomreachModules : {}),
  search: ProductSearchModule
}

ProductSearchModule.load()
