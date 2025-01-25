import { ObjectId } from "mongodb";
import client from '../common/db.js';  
import { Pelicula } from "./pelicula.js"; 

const peliculaCollection = client.db('cine-db').collection('peliculas');  

// Insertar una nueva película
function handleInsertPeliculaRequest(req, res) {
    const data = req.body;
    
    let pelicula = {
        nombre: data.nombre,
        generos: data.generos,
        anioEstreno: data.anioEstreno
    };

    peliculaCollection.insertOne(pelicula)
        .then((result) => {
            if (result.insertedCount === 0) {
                return res.status(400).send('Error al guardar el registro');
            }

            pelicula._id = result.insertedId;
            return res.status(201).send(pelicula);
        })
        .catch((e) => {
            return res.status(500).send({ error: e.message });
        });
}


function handleGetPeliculasRequest(req, res) {
    peliculaCollection.find({}).toArray()
        .then((data) => {
            return res.status(200).send(data);  
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

// Obtener una película por su _id
function handleGetPeliculaRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = ObjectId.createFromHexString(id);

        peliculaCollection.findOne({ _id: oid })
            .then((data) => {
                if (!data) return res.status(404).send('Película no encontrada');
                return res.status(200).send(data);  
            })
            .catch((e) => {
                return res.status(500).send({ error: e.code });
            });
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}

// Actualizar una película por su _id
function handleUpdatePeliculaRequest(req, res) {
    const id = req.params.id;
    const pelicula = req.body;

    try {
        const oid = ObjectId.createFromHexString(id);
        const query = { $set: pelicula };

        peliculaCollection.updateOne({ _id: oid }, query)
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(400).send({ code: e.code });
            });
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}

// Eliminar una película por su _id
function handleDeletePeliculaRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = ObjectId.createFromHexString(id);

        peliculaCollection.deleteOne({ _id: oid })
            .then((data) => {
                if (data.deletedCount === 0) {
                    return res.status(404).send('Película no encontrada');
                }
                return res.status(200).send('Película eliminada exitosamente');
            })
            .catch((e) => {
                return res.status(400).send('ID mal formado');
            });
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}

export default {
    handleInsertPeliculaRequest, 
    handleGetPeliculasRequest, 
    handleGetPeliculaRequest, 
    handleUpdatePeliculaRequest, 
    handleDeletePeliculaRequest
};
