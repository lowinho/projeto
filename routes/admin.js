const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    res.render('./admin/index')
})

router.get('/posts', (req, res) => {
    res.send('Página de posts')
})

router.get('/categorias', (req, res) => {
    Categoria.findAll().then((categorias) => {
        res.render('./admin/categorias', { categorias: categorias })
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        res.redirect('/admin')
    })

})

router.get('/categorias/add', (req, res) => {
    res.render('./admin/addcategorias')
})

router.post('/categorias/nova', jsonParser, urlencodedParser, (req, res) => {

    let erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome === null) {
        erros.push({ texto: 'Nome Inválido' })

    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug === null) {
        erros.push({ texto: 'Slug Inválido' })
    }

    if (req.body.nome.length < 3) {
        erros.push({ texto: 'Digite um nome válido' })
    }

    if (erros.length > 0) {
        res.render('admin/addcategorias', { erros: erros })
    } else {

        Categoria.create({
            nome: req.body.nome,
            slug: req.body.slug
        }).then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso')
            res.redirect('/admin/categorias').catch(function(erro) {
                req.flash('error_msg', 'Houve um erro ao criar a categoria, tente novamente') //redireciona para a página que eu escolher
                res.redirect('/admin')
            })
        })
    }
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((categoria) => {
        res.render('./admin/editcategorias', { categoria: categoria.toJSON() }).catch((error) => {
            req.flash('error_msg', 'Esta categoria não existe' + error)
            res.redirect('./admin/categorias')
        })
    })

})

router.post('/categoria/edit', (req, res) => {
    Categoria.findOne({ _id: req.body.id }).then((categoria) => {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash('error_msg', 'Categoria editada com sucesso!')
            res.redirect('./admin/categorias')
        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro ao editar a categoria')
            res.redirect('/admin/categorias')
        })

    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao editar a categoria')
        res.redirect('./admin/categorias')
    })
})

router.get('/teste', (req, res) => {
    res.send('Isso é um teste')
})


module.exports = router