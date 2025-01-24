/// <reference types="Cypress"/>


Cypress.Commands.add('adiciona_produto', (produto) => {
    cy.contains(produto).click()
    cy.get('.btn_primary').click()
    cy.get('.inventory_details_back_button').should('contain', '<- Back').click()
})

Cypress.Commands.add('verifica_produto', ([produto]) => {
    cy.get('.cart_list > :nth-child(3)').should('contain', produto)
    cy.get('.cart_list > :nth-child(4)').should('contain', produto)
})

Cypress.Commands.add('adiciona_dados', (firstName, lastName, postalCode) => {
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
})