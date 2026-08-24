const { expect } = require('@playwright/test');

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.locator('button:has-text("Cadastrar")').click()
    }

    async createMovie(title, overview, release_year, company) {
        await this.goForm()
        await this.page.locator('input[name="title"]').fill(title)
        await this.page.locator('textarea[name="overview"]').fill(overview)
        await this.page.locator('#select_company_id .react-select__indicators').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
        await this.submit()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

}