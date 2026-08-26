const { expect } = require('@playwright/test')

export class Api {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                "email": "admin@zombieplus.com",
                "password": "pwd123"
            }
        })

        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        this.token = `Bearer ` + body.token
    }

    async postMovie(movie) {

        await this.setToken()

        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: '*/*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                release_year: movie.release_year,
                featured: movie.featured,
                company_id: 'e95d1adc-7c79-4bf3-9dd5-91df01837d19'
            }
        })
        expect(response.ok()).toBeTruthy()
    }
}