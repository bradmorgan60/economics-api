const PORT = 2999

const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

// load in pages in this directory
const news = require('./news')
const stocks = require('./stocks')
const banks = require('./banks')
const { response } = require('express')


const app = express()

const econ_data = []
news.forEach(article => {
    axios.get(article.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("interest")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            econ_data.push({
                title,
                source: article.name,
                address: article.address + url
            })

        })
        $('a:contains("Market")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            econ_data.push({
                title,
                source: article.name,
                address: article.address + url
            })

        })
    })
})

const stock_news = []
stocks.forEach(stock => {
    axios.get(stock.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("Stocks")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            stock_news.push({
                source: stock.name,
                title, 
                address: stock.address + url    
            })
        })
        $('a:contains("US")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            stock_news.push({
                source: stock.name,
                title, 
                address: stock.address + url    
            })
        })
    })
})

const bank_news = []
banks.forEach(bank => {
    axios.get(bank.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        bank_news.push({
            source: bank.name,
            address: bank.address

        })
    })
})

app.get('/', (req, res) => {
    res.json("Welcome to my Economics API")
})

app.get('/news', (req, res) => {
    res.json(econ_data)
})

app.get('/stocks', (req, res) => {
    res.json(stock_news)
})

app.get('/stocks/:ticker', (req, res) => {
    const ticker = req.params.ticker
})

app.get('/banks', (req, res) => {
    res.json()
})


app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))