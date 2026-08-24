const { expect } = require('@playwright/test');

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async createMovie(title, overview, release_year, company) {
        await this.page.locator('a[href$="register"]').click()
        await this.page.locator('input[name="title"]').fill(title)
        await this.page.locator('textarea[name="overview"]').fill(overview)
        await this.page.locator('#select_company_id .react-select__indicators').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
        await this.page.locator('button:has-text("Cadastrar")').click()
    }
}