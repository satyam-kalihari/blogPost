const express = require('express');
const articleRouter = require('./routes/article');
const app = express();

app.set('view engine', 'ejs')

app.use('/article', articleRouter)

app.get('/', (req,res) => {

    const articles = [{
        title:'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title:'Test Article 02',
        createdAt: new Date(),
        description: 'Test description 02'
    }]

    res.render('index', {articles: articles})
})

app.listen(3000,() => {
    console.log('app listening in port 3000')
})