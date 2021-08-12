import {Logger} from '../../utils/logger'
import ejs from 'ejs'
import {ApiCore} from '../core'
import {PathwaysAndRecommendationsConfigFactory} from '../../config/pathways-and-recommendations'
import {PathwaysAndRecommendationsData} from '../../utils/object-mappers/pathways-and-recommendations/interfaces/pathways-and-recommendations-data'
import {mobileView, tabletView} from '../../config/common'
import {DomUtils} from '../../utils/dom'
import {
  MandatoryKeywordWidgetUrlParameters,
  MandatoryCategoryWidgetUrlParameters,
  MandatoryItemWidgetUrlParameters,
  MandatoryPersonalizedWidgetUrlParameters,
  MandatoryGlobalWidgetUrlParameters
} from '../../config/interfaces'

const DEFAULT_CURRENCY = '$'

declare const window: any

type WidgetData = {
  wrid: string
  wid: string
  wty: string
  item_id?: string
  wq?: string
  sku?: string
}

export interface WidgetInDom {
  loaded: boolean
  node: Node
}

export interface PathwaysAndRecommendationsDependencies {
  widgets: Array<WidgetInDom>
  logger?: Logger
}

export class PathwaysAndRecommendationsModule {
  private data: PathwaysAndRecommendationsDependencies

  constructor(options: PathwaysAndRecommendationsDependencies = {widgets: []}) {
    const logger = Logger.buildConsoleLogger()

    this.data = {
      logger,
      ...options
    }
  }

  static load(): PathwaysAndRecommendationsModule {
    const widgets: Array<WidgetInDom> = []
    for (const widgetNode of document.querySelectorAll(
      '.blm-recommendations-widget'
    )) {
      widgets.push({loaded: false, node: widgetNode})
    }

    return new PathwaysAndRecommendationsModule({widgets}).init()
  }

  init(): PathwaysAndRecommendationsModule {
    this.data.widgets.forEach((widgetData) =>
      ApiCore.getWidgetData(this.createConfigForNode(widgetData.node)).then(
        (result) => {
          if (result.products && result.products.length) {
            this.loadWidgetContentIntoDom(
              result,
              widgetData.node as HTMLElement
            )
          }
        }
      )
    )
    return this
  }

  private createConfigForNode(widgetNode: Node) {
    const widgetAttributes: DOMStringMap = (widgetNode as HTMLElement).dataset
    const widgetConfig = PathwaysAndRecommendationsConfigFactory.build(
      widgetAttributes
    )
    const configValues = widgetConfig.getAll()

    const allUrlParameters: {[key: string]: any} = configValues.urlParameters
    for (const [key, value] of new URLSearchParams(
      window.location.search
    ).entries()) {
      if (!Object.keys(allUrlParameters).includes(key)) {
        allUrlParameters[key] = value
      }
    }
    widgetConfig.set({
      ...configValues,
      urlParameters: allUrlParameters as MandatoryKeywordWidgetUrlParameters &
        MandatoryCategoryWidgetUrlParameters &
        MandatoryItemWidgetUrlParameters &
        MandatoryPersonalizedWidgetUrlParameters &
        MandatoryGlobalWidgetUrlParameters
    })

    return widgetConfig
  }

  private loadWidgetContentIntoDom(
    result: PathwaysAndRecommendationsData,
    widgetElement: HTMLElement
  ) {
    result.defaultCurrency =
      window.bloomreachDefaultCurrency || DEFAULT_CURRENCY

    widgetElement.innerHTML = ejs.render(
      PathwaysAndRecommendationsModule.template,
      result
    )

    const widgetContentElement = widgetElement.querySelector(
      '.blm-recommendation-widget-content'
    ) as HTMLElement
    const {
      id: widgetId,
      type: widgetType,
      rid: widgetRid
    } = widgetContentElement.dataset

    widgetElement
      .querySelectorAll('.blm-widget-link')
      .forEach((linkElement: Node) => {
        const productElement = DomUtils.findUpElementWithClassName(
          linkElement,
          'blm-recommendation__product'
        ) as HTMLElement
        const productId = productElement.dataset.id

        linkElement.addEventListener('click', () => {
          const widgetClickEventData: WidgetData = {
            wrid: widgetRid as string,
            wid: widgetId as string,
            wty: widgetType as string,
            item_id: productId as string,
            ...(widgetElement.dataset.query
              ? {wq: widgetElement.dataset.query}
              : {})
          }

          window.BrTrk.getTracker().logEvent(
            'widget',
            'widget-click',
            widgetClickEventData,
            true
          )
        })
      })

    widgetElement
      .querySelectorAll('[data-blm-widget-add-to-cart]')
      .forEach((addToCartNode: Node) => {
        const {
          blmWidgetAddToCartSku,
          blmWidgetAddToCartProdId
        } = (addToCartNode as HTMLElement).dataset

        const widgetAddToCartEventData: WidgetData = {
          wrid: widgetRid as string,
          wid: widgetId as string,
          wty: widgetType as string,
          item_id: blmWidgetAddToCartProdId as string,
          ...(widgetElement.dataset.query
            ? {wq: widgetElement.dataset.query}
            : {}),
          sku: blmWidgetAddToCartSku
        }

        addToCartNode.addEventListener('click', () => {
          window.BrTrk.getTracker().logEvent(
            'cart',
            'widget-add',
            widgetAddToCartEventData
          )
        })
      })

    const widgetViewEventData: WidgetData = {
      wrid: widgetRid as string,
      wid: widgetId as string,
      wty: widgetType as string,
      ...(widgetElement.dataset.query ? {wq: widgetElement.dataset.query} : {})
    }
    window.BrTrk.getTracker().logEvent(
      'widget',
      'widget-view',
      widgetViewEventData,
      true
    )

    widgetElement.classList.add('blm-widget-loaded')

    // carousel
    const carouselPrevious = widgetElement.querySelector(
      '.blm-carousel-previous'
    )
    const carouselNext = widgetElement.querySelector('.blm-carousel-next')
    const products: NodeListOf<HTMLElement> = widgetElement.querySelectorAll(
      '.blm-recommendation__product'
    )

    const displayedProducts = mobileView.matches
      ? 1
      : tabletView.matches
      ? 2
      : result.config.get('numberOfItemsToShow')

    const productPage = Math.ceil(products.length / displayedProducts)
    let productCardWidth = 0
    if (products.length) {
      const productsContainer = widgetElement.querySelector(
        '.blm-recommendation__products'
      ) as HTMLElement
      const computedStyles = window.getComputedStyle(productsContainer)
      productCardWidth =
        Number(computedStyles.width.replace('px', '')) / displayedProducts
    }

    let eachItemWidth = 0
    const movePer = productCardWidth
    const maxMove = (products.length - displayedProducts) * productCardWidth

    const adjustArrowVisibilities = () => {
      if (products[0].style.left === '0px') {
        carouselPrevious?.classList.add('blm-invisible')
      } else {
        carouselPrevious?.classList.remove('blm-invisible')
      }

      if (products[0].style.left === `-${maxMove}px`) {
        carouselNext?.classList.add('blm-invisible')
      } else {
        carouselNext?.classList.remove('blm-invisible')
      }
    }

    const moveRight = () => {
      eachItemWidth = eachItemWidth + movePer
      if (products.length === 1) {
        eachItemWidth = 0
      }

      for (const product of products) {
        if (eachItemWidth > maxMove) {
          eachItemWidth = eachItemWidth - movePer
        }
        product.style.left = `-${eachItemWidth}px`
      }

      adjustArrowVisibilities()
    }

    const moveLeft = () => {
      eachItemWidth = eachItemWidth - movePer
      if (eachItemWidth <= 0) {
        eachItemWidth = 0
      }
      for (const product of products) {
        if (productPage > 1) product.style.left = `-${eachItemWidth}px`
      }

      adjustArrowVisibilities()
    }

    if (carouselPrevious !== null && carouselNext !== null) {
      carouselPrevious.addEventListener('click', function () {
        moveLeft()
      })
      carouselNext.addEventListener('click', function () {
        moveRight()
      })
    }
  }

  static showAddToCartButton = false
  static addToCartButtonTemplate = /* html */ `
    <button
      class="blm-product-add-to-cart-button"
      data-blm-widget-add-to-cart
      data-blm-widget-add-to-cart-prod-id="<%= product.id %>"
      data-blm-widget-add-to-cart-sku=""
    >Add to cart</button>
  `

  static template = /* html */ `
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
            
            ${
              PathwaysAndRecommendationsModule.showAddToCartButton
                ? PathwaysAndRecommendationsModule.addToCartButtonTemplate
                : ''
            }
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
  `
}
