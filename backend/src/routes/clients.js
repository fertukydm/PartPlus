import express from "express";
import clientController from "../controllers/clientController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientController.getclient)
  .post(clientController.registerClients);

router
  .route("/:id")
  .put(clientController.updateClient)
  .delete(clientController.deleteclient);

export default router;