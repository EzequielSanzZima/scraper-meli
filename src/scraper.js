import axios from 'axios';
import cheerio from 'cheerio';

async function fetchProducts(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const products = [];
    $('li.ui-search-layout__item').each((index, element) => {
        const title = $(element).find('.ui-search-item__title').text().trim();
        const priceElement = $(element).find('.andes-money-amount__fraction').last();
        const price = priceElement.length ? priceElement.text().trim() : null;
        const href = $(element).find('a.ui-search-link').attr('href');
        const signoElement = $(element).find('.andes-money-amount__currency-symbol').first();
        const signo = signoElement.length ? signoElement.text().trim() : '';
        const imageElement = $(element).find('img.ui-search-result-image__element');
        const image = imageElement.attr('data-src') || imageElement.attr('src');
        const points = $(element).find('.andes-visually-hidden').text()
        const id = index + 1;

        if (title && price && href && image) {
            products.push({
                Producto: {
                    Id: id,
                    Titulo: title,
                    Precio: price,
                    Href: href,
                    Signo: signo,
                    Imagen: image,
                    Puntaje: points
                }
            });
        }
    });

    return products;
}

export async function scrapeProducts(search, maxRetries = 10) {
    const url = `https://listado.mercadolibre.com.ar/${search}`;
    let products = [];
    let attempts = 0;

    while (attempts < maxRetries && products.length === 0) {
        try {
            products = await fetchProducts(url);
        } catch (error) {}
        attempts++;
    }

    return products;
}