const { expect } = require('@playwright/test');

export class Login {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:5000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByText('Entrar').click();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('span[class$=alert]')).toHaveText(target)
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }
}