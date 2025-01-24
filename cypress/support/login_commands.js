/// <reference types="Cypress"/>


Cypress.Commands.add('login_commands', (user, password) => {
    cy.visit("https://www.saucedemo.com/v1/")
    cy.get('[data-test="username"]').type(user)
    cy.get('[data-test="password"]').type(password)
    cy.get('#login-button').click()
})