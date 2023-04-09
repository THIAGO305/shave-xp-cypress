import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/user-register.json'
import registerPage from '../support/pages/register'

describe('register', () => {

    context('quando submeto o formulário', () => {
        it.only('deve cadastrar com sucesso', () => {

            const user = data.valid
            cy.deleteUser(user)
            registerPage.go()
            registerPage.submit(user.name, user.email, user.password)

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve cadsatar com email já cadastrado', () => {
            const user = data.valid
            cy.createUser(user)

            registerPage.go()
            registerPage.submit(user.name, user.email, user.password)

            const message = 'Oops! E-mail já cadastrado.'
            registerPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {

            registerPage.go()
            registerPage.submit()
            registerPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', () => {
        const user = data.valid

        data.shorpass.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                registerPage.go()
                registerPage.submit(user.name, user.email, p)
                registerPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        const user = data.valid

        data.invemails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                registerPage.go()
                registerPage.submit(user.name, e, user.password)
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})