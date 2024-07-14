import express from 'express';
import { scrapeProducts } from '../scraper.js';
import { buscadorAleatorioPalabra } from '../functions.js';

const router = express.Router();

router.get('/', async(req, res) =>{
    const search = buscadorAleatorioPalabra();
    const view = req.query.view || 'card';

    if(!req.session.products || req.session.search !== search){
        try {
            const products = await scrapeProducts(search);
            req.session.products = products;
            req.session.search = search;           
        } catch (error) {
            res.status(500).send('Error fetching products');
        }
    }
    res.render('pages/aleatorio', { search, products: req.session.products, view, pagetitle: 'aleatorio' });
})

export default router;