const express = require('express')
const router = express.Router()
const Trail = require('../models/trails')

// index route 
router.get('/', async (req, res) => {
    let trails = await Trail.find({})
    res.render('index.ejs', { trails })
})

// SEED
router.get('/seed', (req, res) => {
	Trail.create(
		[
			{
				name: 'Muir Woods Redwood Creek Trail',
                location: '1815 Shoreline Hwy, Muir Beach, CA 94965',
				img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/river-at-the-muir-woods-national-monument-brenda-mardinly.jpg',
                distance: 10.5
			},
			{
				name: 'Lake Harriet Loop Trail',
                location: '1Linden Hills, Minneapolis, MN 55419',
				img: 'https://images.theoutbound.com/contents/104995/assets/1446480954955?w=1200&h=630&fit=crop&dpr=1&q=60&s=ddf2137c26791d8f0a1db8df74f9ef28',
                distance: 2.8
			},
			{
				name: 'Chicago Lakefront Trail',
                location: 'Lakefront Trail - South Trailhead - 71st Street, 2529 E South Shore Dr, Chicago, IL 60649',
				img: 'https://www.chicagosegwaytour.com/images/blog/5-things-you-may-not-know-about-the-lakefront-trail_/5-things-you-may-not-know-about-the-lakefront-trail-chicago-inner.jpg',
                distance: 17.6
			},
		],
		(err, data) => {
			res.redirect('/trails');
		}
	);
});

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