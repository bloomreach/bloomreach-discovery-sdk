"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathwaysAndRecommendationsModule = void 0;
const logger_1 = require("../../utils/logger");
const ejs_1 = __importDefault(require("ejs"));
const core_1 = require("../core");
const pathways_and_recommendations_1 = require("../../config/pathways-and-recommendations");
const common_1 = require("../../config/common");
const dom_1 = require("../../utils/dom");
const DEFAULT_CURRENCY = '$';
class PathwaysAndRecommendationsModule {
    constructor(options = { widgets: [] }) {
        const logger = logger_1.Logger.buildConsoleLogger();
        this.data = Object.assign({ logger }, options);
    }
    static load() {
        const widgets = [];
        for (const widgetNode of document.querySelectorAll('.blm-recommendations-widget')) {
            widgets.push({ loaded: false, node: widgetNode });
        }
        return new PathwaysAndRecommendationsModule({ widgets }).init();
    }
    init() {
        this.data.widgets.forEach((widgetData) => core_1.ApiCore.getWidgetData(this.createConfigForNode(widgetData.node)).then((result) => {
            if (result.products && result.products.length) {
                this.loadWidgetContentIntoDom(result, widgetData.node);
            }
        }));
        return this;
    }
    createConfigForNode(widgetNode) {
        const widgetAttributes = widgetNode.dataset;
        const widgetConfig = pathways_and_recommendations_1.PathwaysAndRecommendationsConfigFactory.build(widgetAttributes);
        const configValues = widgetConfig.getAll();
        const allUrlParameters = configValues.urlParameters;
        for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
            if (!Object.keys(allUrlParameters).includes(key)) {
                allUrlParameters[key] = value;
            }
        }
        widgetConfig.set(Object.assign(Object.assign({}, configValues), { urlParameters: allUrlParameters }));
        return widgetConfig;
    }
    loadWidgetContentIntoDom(result, widgetElement) {
        result.defaultCurrency =
            window.bloomreachDefaultCurrency || DEFAULT_CURRENCY;
        widgetElement.innerHTML = ejs_1.default.render(PathwaysAndRecommendationsModule.template, result);
        const widgetContentElement = widgetElement.querySelector('.blm-recommendation-widget-content');
        const { id: widgetId, type: widgetType, rid: widgetRid } = widgetContentElement.dataset;
        widgetElement
            .querySelectorAll('.blm-widget-link')
            .forEach((linkElement) => {
            const productElement = dom_1.DomUtils.findUpElementWithClassName(linkElement, 'blm-recommendation__product');
            const productId = productElement.dataset.id;
            linkElement.addEventListener('click', () => {
                const widgetClickEventData = Object.assign({ wrid: widgetRid, wid: widgetId, wty: widgetType, item_id: productId }, (widgetElement.dataset.query
                    ? { wq: widgetElement.dataset.query }
                    : {}));
                window.BrTrk.getTracker().logEvent('widget', 'widget-click', widgetClickEventData, true);
            });
        });
        widgetElement
            .querySelectorAll('[data-blm-widget-add-to-cart]')
            .forEach((addToCartNode) => {
            const { blmWidgetAddToCartSku, blmWidgetAddToCartProdId } = addToCartNode.dataset;
            const widgetAddToCartEventData = Object.assign(Object.assign({ wrid: widgetRid, wid: widgetId, wty: widgetType, item_id: blmWidgetAddToCartProdId }, (widgetElement.dataset.query
                ? { wq: widgetElement.dataset.query }
                : {})), { sku: blmWidgetAddToCartSku });
            addToCartNode.addEventListener('click', () => {
                window.BrTrk.getTracker().logEvent('cart', 'widget-add', widgetAddToCartEventData);
            });
        });
        const widgetViewEventData = Object.assign({ wrid: widgetRid, wid: widgetId, wty: widgetType }, (widgetElement.dataset.query ? { wq: widgetElement.dataset.query } : {}));
        window.BrTrk.getTracker().logEvent('widget', 'widget-view', widgetViewEventData, true);
        widgetElement.classList.add('blm-widget-loaded');
        // carousel
        const carouselPrevious = widgetElement.querySelector('.blm-carousel-previous');
        const carouselNext = widgetElement.querySelector('.blm-carousel-next');
        const products = widgetElement.querySelectorAll('.blm-recommendation__product');
        const displayedProducts = common_1.mobileView.matches
            ? 1
            : common_1.tabletView.matches
                ? 2
                : result.config.get('numberOfItemsToShow');
        const productPage = Math.ceil(products.length / displayedProducts);
        let productCardWidth = 0;
        if (products.length) {
            const productsContainer = widgetElement.querySelector('.blm-recommendation__products');
            const computedStyles = window.getComputedStyle(productsContainer);
            productCardWidth =
                Number(computedStyles.width.replace('px', '')) / displayedProducts;
        }
        let eachItemWidth = 0;
        const movePer = productCardWidth;
        const maxMove = (products.length - displayedProducts) * productCardWidth;
        const adjustArrowVisibilities = () => {
            if (products[0].style.left === '0px') {
                carouselPrevious === null || carouselPrevious === void 0 ? void 0 : carouselPrevious.classList.add('blm-invisible');
            }
            else {
                carouselPrevious === null || carouselPrevious === void 0 ? void 0 : carouselPrevious.classList.remove('blm-invisible');
            }
            if (products[0].style.left === `-${maxMove}px`) {
                carouselNext === null || carouselNext === void 0 ? void 0 : carouselNext.classList.add('blm-invisible');
            }
            else {
                carouselNext === null || carouselNext === void 0 ? void 0 : carouselNext.classList.remove('blm-invisible');
            }
        };
        const moveRight = () => {
            eachItemWidth = eachItemWidth + movePer;
            if (products.length === 1) {
                eachItemWidth = 0;
            }
            for (const product of products) {
                if (eachItemWidth > maxMove) {
                    eachItemWidth = eachItemWidth - movePer;
                }
                product.style.left = `-${eachItemWidth}px`;
            }
            adjustArrowVisibilities();
        };
        const moveLeft = () => {
            eachItemWidth = eachItemWidth - movePer;
            if (eachItemWidth <= 0) {
                eachItemWidth = 0;
            }
            for (const product of products) {
                if (productPage > 1)
                    product.style.left = `-${eachItemWidth}px`;
            }
            adjustArrowVisibilities();
        };
        if (carouselPrevious !== null && carouselNext !== null) {
            carouselPrevious.addEventListener('click', function () {
                moveLeft();
            });
            carouselNext.addEventListener('click', function () {
                moveRight();
            });
        }
    }
}
exports.PathwaysAndRecommendationsModule = PathwaysAndRecommendationsModule;
PathwaysAndRecommendationsModule.showAddToCartButton = false;
PathwaysAndRecommendationsModule.addToCartButtonTemplate = `
    <button
      class="blm-product-add-to-cart-button"
      data-blm-widget-add-to-cart
      data-blm-widget-add-to-cart-prod-id="<%= product.id %>"
      data-blm-widget-add-to-cart-sku=""
    >Add to cart</button>
  `;
PathwaysAndRecommendationsModule.template = `
    <div class="blm-recommendation-widget-content" data-rid="<%= widgetMetadata.rid %>" data-type="<%= widgetMetadata.type %>" data-id="<%= widgetMetadata.id %>">
      <% if (products.length > config.get('numberOfItemsToShow')) { %>
      <span class="blm-carousel__item blm-carousel-previous blm-invisible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
        </svg>
      </span>
      <% } %>

      <section class="blm-recommendation__products" style="--number-of-items-to-show: <%= config.get('numberOfItemsToShow') %>">
        <% products.forEach(function(product) { %>
        <div class="blm-recommendation__product" data-id="<%= product.id %>">
          <div class="blm-recommendation__product-inner">
            <div class="blm-product-image-container">
              <a href="<%= product.link %>" class="blm-widget-link">
                <img
                  class="blm-product-image-container__image"
                  alt="<%= product.title %>"
                  src="<%= product.image %>"
                />
              </a>
            </div>
            <div class="blm-product-details-container">
              <div class="blm-product-details-title-container">
                <a href="<%= product.link %>" class="blm-product-details-container__title blm-widget-link"><%= product.title %></a>
              </div>
              <% if (product.price && product.final_price) { %>
                <p class="blm-product-details-container__price">
                  <% if (config.get('formatMoney')) { %>
                    <%= config.get('formatMoney')(product.final_price.toFixed(2) * 100) %>&nbsp;<strike class="blm-product-details-container__original-price"><%= config.get('formatMoney')(product.price.toFixed(2) * 100) %></strike>
                  <% } else { %>
                    <%= defaultCurrency %><%= product.final_price.toFixed(2) %>&nbsp;<strike class="blm-product-details-container__original-price"><%= defaultCurrency %><%= product.price.toFixed(2) %></strike>
                  <% } %>
                </p>
              <% } else { %>
                <p class="blm-product-details-container__price">
                  <% if (config.get('formatMoney')) { %>
                    <%= config.get('formatMoney')(product.price.toFixed(2) * 100) %>
                  <% } else { %>
                    <%= defaultCurrency %><%= product.price.toFixed(2) %>
                  <% } %>
                </p>
              <% } %>
            </div>
            
            ${PathwaysAndRecommendationsModule.showAddToCartButton
    ? PathwaysAndRecommendationsModule.addToCartButtonTemplate
    : ''}
          </div>
        </div>
        <% }); %>
      </section>

      <% if (products.length > config.get('numberOfItemsToShow')) { %>
      <span class="blm-carousel__item blm-carousel-next">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
        </svg>
      </span>
      <% } %>
    </div>
  `;
