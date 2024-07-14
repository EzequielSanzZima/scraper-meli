import express from 'express';
import { scrapeProducts } from '../scraper.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const view = req.query.view || 'card';

    if (!req.session.products || req.session.search !== search) {
        try {
            const products = await scrapeProducts(search);
            req.session.products = products;
            req.session.search = search;
        } catch (error) {
            return res.status(500).send('Error fetching products');
        }
    }

    res.render('pages/products', { search, products: req.session.products, view, pagetitle: 'Products' });
});

export default router;