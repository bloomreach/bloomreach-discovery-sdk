import {AutosuggestModule} from './autosuggest/module'

declare const window: any

window.BloomreachModules = {
  ...(window.BloomreachModules ? window.BloomreachModules : {}),
  autosuggest: AutosuggestModule
}

AutosuggestModule.load()
