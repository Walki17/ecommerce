const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas principales
app.get('/', (req, res) => {
    res.send('Bienvenido al backend del e-commerce.');
});

// Archivos JSON: Rutas específicas

// Cart
app.get('/api/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cart/buy.json'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

// Categories
app.get('/api/categories', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cats/cat.json'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});


//Products
app.get('/api/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/products'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});


// Products by category
app.get('/api/categories/products/:id', (req, res) => {
    const id = req.params.id; // Esto es equivalente a "catID"
    const filePath = path.join(__dirname, `data/cats_products/${id}.json`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'Archivo no encontrado' });
        }
    });
});



//Products by ID 

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id; // ID del producto
    const filePath = path.join(__dirname, `data/products/${id}.json`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
});

// Product comments
app.get('/api/products/comments/:product', (req, res) => {
    const product = req.params.product;
    const filePath = path.join(__dirname, `data/products_comments/${product}.json`);

    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

// Sell
app.get('/api/sell', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/sell/publish.json'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

// User Cart
app.get('/api/user/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/user_cart/25801.json'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

// Error handling
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
