const MS_TO_WAIT_BETWEEN_RERENDERS = 1000

describe('Category module', () => {
  it('shows category results and facets', () => {
    cy.visit('/category.html?sort=price%2Bdesc')

    cy.get('.blm-category__result').should('have.length', 12)
    cy.get('#sort-size').should('have.value', '16')
    cy.get('#sort-by').should('have.value', 'price+desc')
    cy.get('.blm-category-pagination__page-link').should('not.exist')

    cy.get(':nth-child(1) .blm-category-image-container__image').should('exist')
    cy.get(':nth-child(1) .blm-category-details-container__title')
      .should('exist')
      .and('have.attr', 'href')
    cy.get(':nth-child(1) .blm-category-details-container__price').should(
      'exist'
    )
    cy.get(
      ':nth-child(1) .blm-category-details-container__price > .blm-category-details-container__price--strike-through'
    ).should('exist')

    cy.get('.blm-price-range-input--lower').then((lowerBoundInput) => {
      cy.get('.blm-price-range-input--upper').then((upperBoundInput) => {
        expect(upperBoundInput.attr('value')).to.not.be.equal(
          lowerBoundInput.attr('value')
        )
      })
    })

    cy.get('.blm-category-filter').then(($elements) => {
      expect($elements.length).to.be.greaterThan(5)
      expect($elements.filter(':visible').length).to.be.equal(5)
    })

    cy.get('.blm-load-more-facet')
      .invoke('text')
      .should('match', /\+ More/)

    cy.get('#blm-facet-block-item-0 .blm-category-filter-item')
      .its('length')
      .should('to.be.greaterThan', 6)

    cy.get('#blm-facet-block-item-0 .blm-category-filter-item:visible')
      .its('length')
      .should('to.be', 6)

    cy.get('#blm-facet-block-item-0 > .blm-category-load-more')
      .should('exist')
      .invoke('text')
      .and('match', /\+ More/)

    /*****
     * the sorting is working if it's set to descending by title
     *****/
    cy.get('#sort-by').select('title+desc')
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get('.blm-category-details-container__title').then(($elements) => {
      const titles = Cypress.$.makeArray($elements).map(
        (element) => element.innerText
      )
      const sortedTitles = [...titles].sort((a, b) => (a < b ? 1 : -1))

      expect(titles).to.deep.equal(sortedTitles)
    })

    /*****
     * the infinite scroll is working
     *****/
    cy.scrollTo('bottom')
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get('.blm-category__result').should('have.length', 13)
    cy.scrollTo('bottom')
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get('.blm-scroll-indicator')
      .invoke('text')
      .should('match', /No more results/)

    /*****
     * the price range facet is working
     *****/
    cy.get('.blm-price-range-input--upper').then(($range) => {
      const range = $range[0]
      range.value = 400
      range.dispatchEvent(new Event('input', {value: 400, bubbles: true}))
    })
    cy.get('.blm-category__result').should('have.length', 7)

    /*****
     * the "more" link for facet boxes is working
     *****/
    cy.get('.blm-load-more-facet').click()
    cy.get('.blm-category-filter:visible')
      .its('length')
      .should('be.greaterThan', 5)

    /*****
     * the "more" link for facet values is working
     *****/
    cy.get('#blm-facet-block-item-0 > .blm-category-load-more').click()
    cy.get('#blm-facet-block-item-0 .blm-category-filter-item:visible')
      .its('length')
      .should('be.greaterThan', 6)

    /*****
     * facet value select is working
     *****/
    cy.get('.blm-price-range-input--upper').then(($range) => {
      const range = $range[0]
      range.value = 500
      range.dispatchEvent(new Event('input', {value: 500, bubbles: true}))
    })
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get(
      '#blm-facet-block-item-3 > .blm-category-filter-items > :nth-child(1) .blm-category-filter-item__checkbox'
    ).click()
    cy.get('.blm-category__result').should('have.length', 4)
  })
})
