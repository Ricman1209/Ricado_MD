const express = require('express');
const cors=require('cors');
const app=express();
const port=3000;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//traernos la cadena de conexion de mongo DB
const{MongoClient, ServerApiVersion} = require('mongodb');
const uri = 'mongodb+srv://202160546:<Mauricio.21>@maudb.bhtzy.mongodb.net/?retryWrites=true&w=majority&appName=MauDB';

//creamos la conexion
const cliente = new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
});

async function run(){
    try{
        await cliente.connect();
        await cliente.db("admin").command({ping:1});
        console.log("Conexion exitosa");
    }finally{
        await cliente.close();
    }
}

/*
app.get('/', async(req,res)=>{
    await cliente.connect();
    const db=cliente.db("sample_mflix");
    const collection = db.collection("movies");
    const resultado= await collection.find({poster:{$ne:null}},{plot:1}).toArray();
    res.json(resultado)
});
*-/

/*
app.listen(port, async () => {
    console.log(`Server attending at ${port}`);
    await run();
});
*/

//CRUD=CREATE,INSERT,UPDATE Y DELETE
app.post('/insertar', async (req,res) => {
    try{
        const {usuario,password} = req.body;
        await cliente.connect();
        const db=cliente.db('MiBaseDatos');
        const collection=db.collection("usuarios");
        const resultado= await collection.insertOne({usuario:usuario,password:password});
        res.send(`
            <script>
                alert("Documento Guardado Exitosamente");
                window.location.href="http://localhost:3000/home";
            </script>
        `);
    }finally{
        await cliente.close();
    }
});

app.get('/home', (req,res)=>{
    res.sendFile(__dirname + '/home.html');
});

app.post('/consultar',async (req,res) => {

    try{
        const {usuario} = req.body;
        await cliente.connect();
        const db=cliente.db('MiBaseDatos');
        const collection=db.collection("usuarios");
        const resultado= await collection.find({usuario:usuario}).toArray();
        console.log(resultado);
    }finally{
        await cliente.close();
    }

});

app.post('/actualizar',async (req,res) => {

    try{

    }finally{
        await cliente.close();
    }

});

app.post('/eliminar',async (req,res) => {

    try{

    }finally{
        await cliente.close();
    }

});

app.listen(port, () => {
    console.log(`Server attending at ${port}`);
});