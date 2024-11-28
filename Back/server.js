const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mi_clave";

const loadUsers = () => {
    const data = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(data);
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido o expirado." });
        }

        req.user = user;
        next();
    });
};

app.get('/', (req, res) => {
    res.send('Bienvenido al backend del e-commerce.');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Usuario y contraseña son requeridos." });
    }

    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Usuario y/o contraseña incorrecta." });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.status(200).json({ token });
});

app.use(verifyToken);

app.get('/api/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cart/buy.json'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

app.get('/api/categories', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cats/cat.json'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

app.get('/api/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/products'), (err) => {
        if (err) res.status(404).json({ error: 'Archivo no encontrado' });
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
