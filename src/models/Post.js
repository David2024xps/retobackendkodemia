const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de que el modelo User esté definido correctamente

// Ruta para registrar un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, profilePic, email, password } = req.body;

    // Validaciones básicas
    if (!name || !profilePic || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      profilePic,
      email,
      password
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
});

module.exports = router;
