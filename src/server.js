import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeProducts } from './scraper.js';
import { buscadorAleatorioPalabra, getDate } from './functions.js'
import ExcelJS from 'exceljs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('pages/index',{pagetitle: 'Home'});
});


app.get('/products', async (req, res) => {
    const search = req.query.search
    try {
        const products = await scrapeProducts(search);
        res.render('pages/products', { search, products, pagetitle: 'products'});
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

app.get('/aleatorio', async(req, res) =>{
    const search = buscadorAleatorioPalabra();
    try {
        const products = await scrapeProducts(search);
        res.render('pages/aleatorio', { search, products, pagetitle: 'aleatorio' });
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
})

app.get('/download/:search', async (req, res) => {
    const search = req.params.search;

    const today = new Date(),
    time = today.toTimeString().split(':').join('').substr(0, 4),
    timestamp = getDate('dd-mm-yy', today) + ' ' + time;

        try {
        const products = await scrapeProducts(search);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Products');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Título', key: 'title', width: 30 },
            { header: 'Precio', key: 'price', width: 15 },
            { header: 'Enlace', key: 'href', width: 30 },
            { header: 'Imagen', key: 'image', width: 30 },
        ];

        products.forEach(product => {
            worksheet.addRow({
                id: product.Producto.Id,
                title: product.Producto.Titulo,
                price: product.Producto.Precio,
                href: product.Producto.Href,
                image: product.Producto.Imagen,
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', "attachment; filename=Producto" +" "+search+" "+timestamp+".xlsx");
        console.log("Producto" +" "+search+" "+timestamp);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error generating Excel file');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
