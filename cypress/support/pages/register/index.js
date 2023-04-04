class RegisterPage {

    constructor() {
        this.alertError = '.alert-error'
    }

    go() {
        cy.visit('/signup')

        // Checkpoint para garantir qeu estou no lugar certo
        cy.get('form h1')
            .should('have.text', 'Faça seu cadastro')
    }

    submit(nome = null, email = null, password = null) {

        cy.get('input[placeholder*=Nome]').as('nome')
        cy.get('input[placeholder$=email]').as('email')
        cy.get('input[placeholder*=senha]').as('password')

        if (nome) {
            cy.get('@nome').type(nome)
        }

        if (email) {
            cy.get('@email').type(email)
        }

        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Cadastrar')
            .click()
    }

    noticeShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

    requiredFields(nameMessage, emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 3)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(nameMessage)
                expect($small.get(1).textContent).to.equal(emailMessage)
                expect($small.get(2).textContent).to.equal(passwordMessage)
            })
    }

}

export default new RegisterPage()
