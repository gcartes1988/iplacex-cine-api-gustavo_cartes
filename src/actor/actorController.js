import { Actor } from './actor.js';
import { ObjectId } from 'mongodb';
import client from '../common/db.js';

const actorCollection = client.db('cine-db').collection('actores');

// Obtener una película por su _id
function handleInsertActorRequest(req, res) {
    const data = req.body;

    const actor = {
        idPelicula: data.idPelicula,
        nombre: data.nombre,
        edad: data.edad,
        estaRetirado: data.estaRetirado,
        premios: data.premios
    };

    const oid = new ObjectId(actor.idPelicula);  

    client.db('cine-db').collection('peliculas')
        .findOne({ _id: oid })  
        .then((pelicula) => {
            if (!pelicula) {
                return res.status(404).send('Película no encontrada');
            }

            actorCollection.insertOne(actor)
                .then((data) => {
                    if (!data) return res.status(400).send('Error al guardar el actor');
                    return res.status(201).send(data);  
                })
                .catch((e) => {
                    return res.status(500).send({ error: e.message });
                });
        })
        .catch((e) => {
            return res.status(500).send({ error: e.message });
        });
}

// Obtener todos los actores
function handleGetActoresRequest(req, res) {
    actorCollection.find({}).toArray()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e.message });
        });
}

// Obtener un actor por su _id
function handleGetActorByIdRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = ObjectId.createFromHexString(id);

        actorCollection.findOne({ _id: oid })
            .then((data) => {
                if (!data) return res.status(404).send('Actor no encontrado');
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ error: e.message });
            });
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}

// Eliminar un actor por ID
function handleDeleteActorRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = ObjectId.createFromHexString(id);

        actorCollection.deleteOne({ _id: oid })
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.status(404).send('Actor no encontrado');
                }
                return res.status(200).send('Actor eliminado exitosamente');
            })
            .catch((e) => {
                return res.status(500).send({ error: e.message });
            });
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}

export default {
    handleInsertActorRequest, 
    handleGetActoresRequest, 
    handleGetActorByIdRequest, 
    handleDeleteActorRequest
};
