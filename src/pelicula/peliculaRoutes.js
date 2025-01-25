import express from 'express';
import controller from './peliculaController.js'; 

const peliculaRoutes = express.Router();

peliculaRoutes.post('/pelicula', controller.handleInsertPeliculaRequest);  
peliculaRoutes.get('/peliculas', controller.handleGetPeliculasRequest);   
peliculaRoutes.get('/pelicula/:id', controller.handleGetPeliculaRequest); 
peliculaRoutes.put('/pelicula/:id', controller.handleUpdatePeliculaRequest); 
peliculaRoutes.delete('/pelicula/:id', controller.handleDeletePeliculaRequest); 

export default peliculaRoutes;
