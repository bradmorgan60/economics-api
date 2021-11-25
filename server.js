const PORT = 2999

const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

// load in pages in this directory
const news = require('./news')
const { response } = require('express')


const app = express()

const econ_data = []
news.forEach(article => {
    axios.get(article.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("Vaccine")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            econ_data.push({
                title,
                source: article.name,
                address: article.address
                
            })

        })
        $('a:contains("Market")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            econ_data.push({
                title,
                source: article.name,
                address: article.address
                
            })

        })
    })
})

app.get('/', (req, res) => {
    res.json("Welcome to my Economics API")
})

app.get('/news', (req, res) => {
    res.json(econ_data)
})


app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))