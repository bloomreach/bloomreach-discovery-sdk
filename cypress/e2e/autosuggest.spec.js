const MS_TO_WAIT_BETWEEN_RERENDERS = 1000

describe('Autosuggest module', () => {
  it('shows correct suggestions and load category results', () => {
    cy.visit('/autosuggest.html')

    /*****
     * shows suggestions for chairs
     *****/
    cy.get('.search__input').type('cha')
    cy.get(
      '.blm-autosuggest__suggestion-term > a[data-suggestion-text="chairs"]'
    ).should('exist')
    cy.get(
      '.blm-autosuggest__suggestion-term > a[data-suggestion-text="dining chairs"]'
    ).should('exist')

    /*****
     * shows suggestions for candles
     *****/
    cy.get('.search__input').clear().type('cand')
    cy.get(
      '.blm-autosuggest__suggestion-term > a[data-suggestion-text="candle"]'
    ).should('exist')

    /*****
     * hides autosuggestions for unknown search term
     *****/
    cy.get('.search__input').clear().type('craxxx')
    cy.get('.blm-autosuggest').should('not.exist')

    /*****
     * loads category results without sidebar
     *****/
    cy.get('.search__input').clear().type('tow')
    cy.get(
      '.blm-autosuggest__category-results a[data-suggestion-text="Bed & Bath"]'
    ).click()
    cy.wait(MS_TO_WAIT_BETWEEN_RERENDERS)
    cy.get('.blm-category__result').should('have.length', 16)
    cy.get('.blm-category-sidebar').should('not.exist')
  })
})
