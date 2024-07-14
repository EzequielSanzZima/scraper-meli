import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { cookieForProducts } from './functions.js';

// Importa las rutas
import indexRoutes from './routes/index.js';
import productRoutes from './routes/products.js';
import aleatorioRoutes from './routes/aleatorio.js';
import downloadExcelRoutes from './routes/downloadExcel.js';

const port = process.env.PORT || 3000;
const app = express();

// Resuelve __dirname y configura las vistas y el manejo de archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));


// Custom middleware
cookieForProducts(app);

// Configuracion de rutas
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/aleatorio', aleatorioRoutes);
app.use('/download', downloadExcelRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
