const express = require('express')
const router = express.Router()
const Trail = require('../models/trails')

// index route 
router.get('/', async (req, res) => {
    let trails = await Trail.find({})
    res.render('index.ejs', { trails })
})

// new route
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// show route
router.get('/:id', async (req, res) => {
    const trail = await Trail.findById(req.params.id)
    res.render('show.ejs', {
        trail: trail
    })
})

// create/post route 
router.post('/', (req, res) => {
    Trail.create(req.body, (err, createdTrail) => {
        if(err) {
            console.log(err)}
        else {
            res.redirect('/trails')
        }
    })
})

// delete route
router.delete('/:id', (req, res) => {
    Trail.findByIdAndRemove(req.params.id, (err, data) => {
        if(err) {console.log(err)}
        res.redirect('/trails')
    })
})

// edit route
router.get('/:id/edit', (req, res) => {
    Trail.findById(req.params.id, (err, foundTrail) => {
        res.render('edit.ejs', {
            trail: foundTrail
        })
    })
})

// update/put route
router.put('/:id', (req, res) => {
    Trail.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/trails')
    })
})



module.exports = router