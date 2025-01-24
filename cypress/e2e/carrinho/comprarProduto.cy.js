/// <reference types="Cypress"/>

describe('Teste E2E - realizando a compra de produtos com sucesso', () => {
    it('Fluxo de compra do produto', () => {
        cy.login_commands('standard_user', 'secret_sauce')
        cy.get('.product_label').should('contain', 'Products')

        // ordenação dos produtos
        cy.get('.product_sort_container').select('Price (low to high)')

        // validação da ordenação
        cy.get(':nth-child(1) > .inventory_item_label').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_label').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_label').should('contain', 'Sauce Labs Bolt T-Shirt')
        cy.get(':nth-child(4) > .inventory_item_label').should('contain', 'Test.allTheThings() T-Shirt (Red)')
        cy.get(':nth-child(5) > .inventory_item_label').should('contain', 'Sauce Labs Backpack')
        cy.get(':nth-child(6) > .inventory_item_label').should('contain', 'Sauce Labs Fleece Jacket')

        // Adicionando produtos ao carrinho
        cy.adiciona_produto('Sauce Labs Onesie')
        cy.adiciona_produto('Sauce Labs Bike Light')     

        // entrar no carrinho para checagem 
        cy.get('.shopping_cart_link').click()

        // checagem da quantidade de produtos
        cy.get('.shopping_cart_link').should('have.text', '2')

        // checagem dos produtos
        cy.verifica_produto('Sauce Labs Onesie', 'Sauce Labs Bike Light')

        // checkout
        cy.get('.btn_action').click()

        // adicionando os dados
        cy.adiciona_dados('Son', 'Goku', 96969696969)
        cy.get('.btn_primary').click()

        // checando os produtos no checkout
        cy.verifica_produto('Sauce Labs Onesie', 'Sauce Labs Bike Light')

        // verificando se a soma dos produtos esta correta
        cy.get(':nth-child(3) > .cart_item_label > .inventory_item_price')
            .invoke('text') // pega o texto do item 3
            .then((price1Text) => {
                cy.get(':nth-child(4) > .cart_item_label > .inventory_item_price')
                    .invoke('text') // pega o vlor do item 4
                    .then((price2Text) => {
                        cy.get('.summary_subtotal_label')
                            .invoke('text') // pega o texto do subtotal
                            .then((subtotalText) => {
                                // Converter os textos para números eliminando simbolos e espaços em branco
                                const price1 = parseFloat(price1Text.replace('$', '').trim());
                                const price2 = parseFloat(price2Text.replace('$', '').trim());
                                const subtotal = parseFloat(subtotalText.replace('Item total: $', '').trim());

                                // Verificar se a soma de price1 e price2 é igual ao subtotal
                                expect(price1 + price2).to.eq(subtotal); 
                            });
                    });
            });

        // verifca se o total mostrado corresponde corretamente
        cy.get('.summary_total_label').should('have.text', 'Total: $19.42')

        // finaliza compra
        cy.contains('FINISH').click()
        
        // verifica a mensagem
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER')
    });
});