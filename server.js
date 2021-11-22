const PORT = 2999

const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')


const app = express()

app.get('/', (req, res) => {
    res.json("Welcome to my Economics API!")
})


app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))