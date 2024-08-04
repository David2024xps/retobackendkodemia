const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener un usuario por ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para obtener el usuario de la base de datos
  res.json({ id: userId, name: 'John Doe', email: 'john@example.com' });
});

// Ruta para listar todos los posts
app.get('/post', (req, res) => {
  const search = req.query.search || '';
  // Lógica para obtener los posts de la base de datos, posiblemente filtrados por título
  res.json([{ title: 'JavaScript Basics' }, { title: 'Advanced Node.js' }]);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
