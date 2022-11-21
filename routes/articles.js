const express = require('express');
// const article = require('./../model/article');
const Article = require('./../model/article')
const router = express.Router();

router.get('/newArticle', (req, res) => {
    res.status(200).render('article/newArticle')
})

router.get('/edit/:id',async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('article/edit', {article : article})
})

router.get('/:slug',async (req, res) => {
    const article =await Article.findOne({slug : req.params.slug})
    if (article == null) res.redirect('/')
    res.render( 'article/show', {article : article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('newArticle'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
    
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }
        catch(e){
            res.render(`/article/${path}`, {article : article})
        }
    }
}

router.delete( '/:id',async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res . redirect( '/' )
})

module.exports = router