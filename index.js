const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const PORT = 8001
const app = express() 

const url = 'https://theguardian.com/us'

axios(url)
    .then(response => {
        const html = response.data 
        const $ = cheerio.load(html)
        const articles=[]

        $('.fc-item__title', html).each(function() {
            const title =  $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
    })

    console.log(articles)
}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

