declare const window: any
class ProductEventsModule {
  static load() {
    document
      .querySelectorAll('[data-blm-add-to-cart]')
      .forEach((addToCartNode: Node) => {
        const {
          blmAddToCartSku,
          blmAddToCartProdId
        } = (addToCartNode as HTMLElement).dataset
        addToCartNode.addEventListener('click', () => {
          window.BrTrk.getTracker().logEvent('cart', 'click-add', {
            prod_id: blmAddToCartProdId,
            sku: blmAddToCartSku
          })
        })
      })

    document
      .querySelectorAll('[data-blm-quickview]')
      .forEach((quickviewNode: Node) => {
        const {
          blmQuickviewSku,
          blmQuickviewProdId,
          blmQuickviewProdName
        } = (quickviewNode as HTMLElement).dataset
        quickviewNode.addEventListener('click', () => {
          window.BrTrk.getTracker().logEvent('product', 'quickview', {
            prod_id: blmQuickviewProdId,
            prod_name: blmQuickviewProdName,
            sku: blmQuickviewSku
          })
        })
      })
  }
}

window.BloomreachModules = {
  ...(window.BloomreachModules ? window.BloomreachModules : {}),
  events: ProductEventsModule
}

ProductEventsModule.load()

export {}
