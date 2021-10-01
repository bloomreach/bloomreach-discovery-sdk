"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductEventsModule {
    static load() {
        document
            .querySelectorAll('[data-blm-add-to-cart]')
            .forEach((addToCartNode) => {
            const { blmAddToCartSku, blmAddToCartProdId } = addToCartNode.dataset;
            addToCartNode.addEventListener('click', () => {
                window.BrTrk.getTracker().logEvent('cart', 'click-add', {
                    prod_id: blmAddToCartProdId,
                    sku: blmAddToCartSku
                });
            });
        });
        document
            .querySelectorAll('[data-blm-quickview]')
            .forEach((quickviewNode) => {
            const { blmQuickviewSku, blmQuickviewProdId, blmQuickviewProdName } = quickviewNode.dataset;
            quickviewNode.addEventListener('click', () => {
                window.BrTrk.getTracker().logEvent('product', 'quickview', {
                    prod_id: blmQuickviewProdId,
                    prod_name: blmQuickviewProdName,
                    sku: blmQuickviewSku
                });
            });
        });
    }
}
window.BloomreachModules = Object.assign(Object.assign({}, (window.BloomreachModules ? window.BloomreachModules : {})), { events: ProductEventsModule });
ProductEventsModule.load();
