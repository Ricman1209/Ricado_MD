const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = 'mongodb+srv://202160546:Mauricio.21@maudb.bhtzy.mongodb.net/?retryWrites=true&w=majority&appName=MauDB';
const cliente = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        await cliente.connect();
        console.log("Conexión exitosa a MongoDB");
        const db = cliente.db("vehiculos");
        const coleccion = db.collection("autos");

        // Ruta POST para recibir y guardar los datos del vehículo
        app.post('/api/vehiculos', async (req, res) => {
            try {
                const nuevoVehiculo = req.body;
                const result = await coleccion.insertOne(nuevoVehiculo);
                console.log('Vehículo insertado:', result);
                res.status(201).json({ message: 'Vehículo guardado exitosamente!', insertedId: result.insertedId });
            } catch (error) {
                console.error('Error al insertar vehículo:', error);
                res.status(500).json({ message: 'Error al guardar el vehículo en la base de datos', error: error });
            }
        });

    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
    } finally {
    }
}

run();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});