class CatalogPage {
    selectService(name) {
        cy.contains('.catalog-item', name)
            .should('be.visible')
            .click()
    }

    confirOrder() {
        cy.get('.swal2-confirm').click()
    }

    hasShaver(name) {
        cy.get('figcaption h3')
            .should('be.visible')
            .should('have.text',name)
    }

    hasTitle(title) {
        cy.get('.swal2-title')
            .should('be.visible')
            .should('have.text',title)
    }

}

export default new CatalogPage()