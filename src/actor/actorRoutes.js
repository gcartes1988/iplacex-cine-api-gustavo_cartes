import express from 'express';
import controller from './actorController.js';

const actorRoutes = express.Router();

actorRoutes.post('/actor', controller.handleInsertActorRequest);  
actorRoutes.get('/actores', controller.handleGetActoresRequest);  
actorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest);  
actorRoutes.delete('/actor/:id', controller.handleDeleteActorRequest);  

export default actorRoutes;
