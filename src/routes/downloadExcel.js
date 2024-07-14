import express from 'express';
import ExcelJS from 'exceljs';
import { getDate } from '../functions.js';
import { scrapeProducts } from '../scraper.js';

const router = express.Router();

router.get('/:search', async (req, res) => {
    const search = req.params.search;

    const today = new Date();
    const time = today.toTimeString().split(':').join('').substr(0, 4);
    const timestamp = getDate('dd-mm-yy', today) + ' ' + time;

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
        res.setHeader('Content-Disposition', `attachment; filename=Producto ${search} ${timestamp}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).send('Error generating Excel file');
    }
});

export default router;