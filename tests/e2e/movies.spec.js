const { test } = require('../support')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('deve cadastrar um novo filme', async ({ page }) => {

    const movie = data.guerra_mundial_z
    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.createMovie(movie.title, movie.overview, movie.release_year, movie.company)
    
    await page.toast.containText('Cadastro realizado com sucesso!')
})