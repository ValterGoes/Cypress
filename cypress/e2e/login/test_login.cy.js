/// <reference types="Cypress"/>


// login com sucesso
describe('Teste funcional de login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.visit("https://www.saucedemo.com/v1/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('#login-button').click()
        cy.get('.product_label').should('contain', 'Products')
    });
});

// login com usuário incorreto
it('Validando usuário incorreto', () => {
    cy.visit("https://www.saucedemo.com/v1/")
    cy.get('[data-test="username"]').type("standard_user1")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
});

// login com senha incorreta
it('Validando senha incorreto', () => {
    cy.visit("https://www.saucedemo.com/v1/")
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce1")
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
});