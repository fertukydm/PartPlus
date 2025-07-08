import express from "express";
import reservationController from "../controllers/reservationController.js";
import clientController from "../controllers/clientController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientController.getclient)
  .post(clientController.createclient);

router
  .route("/:id")
  .put(clientController.updateClient)
  .delete(clientController.deleteclient);

export default router;