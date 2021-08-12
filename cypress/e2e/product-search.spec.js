const MS_TO_WAIT_BETWEEN_RERENDERS = 1000

describe('Product Search module', () => {
  it('no search results shown for empty search query', () => {
    cy.visit('/product-search.html?q=')
    cy.get('.blm-product-search').should('not.exist')
  })

  it('shows search results and facets', () => {
    cy.visit('/product-search.html?q=red')

    cy.get('.blm-product-search__result').should('have.length', 16)
    cy.get('#sort-size').should('have.value', '16')
    cy.get('#sort-by').should('have.value', '')
    cy.get('.blm-product-search-pagination__page-link')
      .its('length')
      .should('to.be.greaterThan', 2)

    cy.get(':nth-child(1) .blm-product-search-image-container__image').should(
      'exist'
    )
    cy.get(':nth-child(1) .blm-product-search-details-container__title')
      .should('exist')
      .and('have.attr', 'href')
    cy.get(':nth-child(1) .blm-product-search-details-container__price').should(
      'exist'
    )
    cy.get(
      ':nth-child(1) .blm-product-search-details-container__price > .blm-product-search-details-container__price--strike-through'
    ).should('exist')

    cy.get('.blm-price-range-input--lower').then((lowerBoundInput) => {
      cy.get('.blm-price-range-input--upper').then((upperBoundInput) => {
        expect(upperBoundInput.attr('value')).to.not.be.equal(
          lowerBoundInput.attr('value')
        )
      })
    })

    cy.get('.blm-product-search-filter').then(($elements) => {
      expect($elements.length).to.be.greaterThan(5)
      expect($elements.filter(':visible').length).to.be.equal(5)
    })

    cy.get('.blm-load-more-facet')
      .invoke('text')
      .should('match', /\+ More/)

    cy.get('#blm-facet-block-item-0 .blm-product-search-filter-item')
      .its('length')
      .should('to.be.greaterThan', 6)

    cy.get('#blm-facet-block-item-0 .blm-product-search-filter-item:visible')
      .its('length')
      .should('to.be', 6)

    cy.get('#blm-facet-block-item-0 > .blm-product-search-load-more')
      .should('exist')
      .invoke('text')
      .and('match', /\+ More/)

    /*****
     * the sorting is working if it's set to descending by title
     *****/
    cy.get('#sort-by').select('title+desc')
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get('.blm-product-search-details-container__title').then(($elements) => {
      const titles = Cypress.$.makeArray($elements).map(
        (element) => element.innerText
      )
      const sortedTitles = [...titles].sort((a, b) => (a < b ? 1 : -1))

      expect(titles).to.deep.equal(sortedTitles)
    })

    /*****
     * the paginator is working
     *****/
    cy.get(':nth-child(2) > .blm-product-search-pagination__page-link').click()
    cy.get('.blm-product-search__result').should('have.length', 3)

    /*****
     * there are 20 results shown if size selector is set to 20 and there's no paginator
     *****/
    cy.get('#sort-size').select('20')
    cy.get('.blm-product-search__result').should('have.length', 19)
    cy.get('.blm-product-search-pagination__page-link').should('not.exist')

    /*****
     * the price range facet is working
     *****/
    cy.get('.blm-price-range-input--lower').then(($range) => {
      const range = $range[0]
      range.value = 100
      range.dispatchEvent(new Event('input', {value: 100, bubbles: true}))
    })
    cy.get('.blm-product-search__result').should('have.length', 1)

    /*****
     * the "more" link for facet boxes is working
     *****/
    cy.get('.blm-load-more-facet').click()
    cy.get('.blm-product-search-filter:visible')
      .its('length')
      .should('be.greaterThan', 5)

    /*****
     * the "more" link for facet values is working
     *****/
    cy.get('#blm-facet-block-item-0 > .blm-product-search-load-more').click()
    cy.get('#blm-facet-block-item-0 .blm-product-search-filter-item:visible')
      .its('length')
      .should('be.greaterThan', 6)

    /*****
     * facet value select is working
     *****/
    cy.get('.blm-price-range-input--lower').then(($range) => {
      const range = $range[0]
      range.value = 0
      range.dispatchEvent(new Event('input', {value: 0, bubbles: true}))
    })
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get(
      '#blm-facet-block-item-0 > .blm-product-search-filter-items > :nth-child(1) .blm-product-search-filter-item__checkbox'
    ).click()
    cy.get('.blm-product-search__result').should('have.length', 15)
  })

  it('shows redirect indicator', () => {
    cy.visit('http://localhost:1234/product-search.html?q=seat')

    cy.get('.blm-product-search-header-container__title')
      .invoke('text')
      .should('match', /Results for chair/)
    cy.get('.blm-redirected-keyword')
      .invoke('text')
      .should('match', /Redirected from "seat"/)
  })

  it('shows spell correction indicator', () => {
    cy.visit('http://localhost:1234/product-search.html?q=caix')

    cy.get('.blm-product-search-header-container__title')
      .invoke('text')
      .should('match', /Results for[\n\s]*chair[\n\s]*instead of caix/m)
    cy.get('.blm-did-you-mean-suggestion')
      .invoke('text')
      .should('match', /\s+Did you mean: \s+chair\s+cape/)
  })
})
