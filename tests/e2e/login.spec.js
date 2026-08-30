const { test, expect } = require('../support')

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('não deve logar como senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'abc123')
    const errorMessage = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(errorMessage)
})

test('não deve logar quando o e-mail é inválido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('email', 'abc123')
    const message = 'Email incorreto '
    await page.login.alertHaveText(message)
})

test('não deve logar quando o e-mail não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'abc123')
    const message = 'Campo obrigatório'
    await page.login.alertHaveText(message)
})

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    const message = 'Campo obrigatório'
    await page.login.alertHaveText(message)
})

test('não deve logar quando nenhum campo é preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    const message = 'Campo obrigatório'
    await page.login.alertHaveText([message, message])
})