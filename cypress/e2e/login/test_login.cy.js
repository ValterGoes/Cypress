/// <reference types="Cypress"/>


// login com sucesso
describe('Teste funcional de login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.login_commands('standard_user', 'secret_sauce')
        cy.get('.product_label').should('contain', 'Products')
    });
});

// login com usuário incorreto
it('Validando usuário incorreto', () => {
    cy.login_commands('standard_user1', 'secret_sauce')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
});

// login com senha incorreta
it('Validando senha incorreto', () => {
    cy.login_commands('standard_user', 'secret_sauce1')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
});