const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Article = require('./model/article')

const app = express();

mongoose.connect('mongodb://0.0.0.0/blog');

app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use('/articles', articleRouter)


app.get('/', async (req,res) => {

    const articles = await Article.find().sort({createdAt: 'desc'});

    res.render('article/index', {articles: articles})
})

app.listen(3000,() => {
    console.log('app listening in port 3000')
})