import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/order.json'
import catalogPage from '../support/pages/catalog'
import orderPage from '../support/pages/order'


describe('pedido', () => {

    context('usuario logado', () => {

        const { customer, shaver, service } = data

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('deve poder solicitar serviços', () => {
            shaversPage.selerctShaver(shaver.name)
            catalogPage.selectService(service.description)

            catalogPage.hasShaver(shaver.name)
            catalogPage.hasTitle(service.description)

            catalogPage.confirOrder()
            orderPage.hasOrder()
        })
    })
})