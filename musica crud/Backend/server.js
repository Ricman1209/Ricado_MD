const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


// Habilitar el uso de JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(cors());
// Datos simulados
let canciones = [
    { id: 1, cancion: 'Shape of You', artista: 'Ed Sheeran', duracion: '4:24' },
    { id: 2, cancion: 'Blinding Lights', artista: 'The Weeknd', duracion: '3:20' },
    { id: 3, cancion: 'Rolling in the Deep', artista: 'Adele', duracion: '3:48' }
];

// Ruta GET para obtener todas las canciones
app.get('/canciones', (req, res) => {
    res.json(canciones);
});

// Ruta POST para agregar una nueva canción
app.post('/canciones', (req, res) => {
    const nuevaCancion = req.body;
    nuevaCancion.id = canciones.length ? canciones[canciones.length - 1].id + 1 : 1; // Asignar ID único
    canciones.push(nuevaCancion);
    res.status(201).json({ mensaje: 'Canción agregada exitosamente', cancion: nuevaCancion });
});

// Ruta PUT para actualizar una canción existente
app.put('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = canciones.findIndex(c => c.id === id);

    if (index !== -1) {
        canciones[index] = { ...canciones[index], ...req.body };
        res.json({ mensaje: 'Canción actualizada exitosamente', cancion: canciones[index] });
    } else {
        res.status(404).json({ mensaje: 'Canción no encontrada' });
    }
});

// Ruta DELETE para eliminar una canción
app.delete('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = canciones.findIndex(c => c.id === id);

    if (index !== -1) {
        const cancionEliminada = canciones.splice(index, 1);
        res.json({ mensaje: 'Canción eliminada exitosamente', cancion: cancionEliminada[0] });
    } else {
        res.status(404).json({ mensaje: 'Canción no encontrada' });
    }
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
