import express from "express";
import reservationController from "../controllers/reservationController.js";

const router = express.Router();

router.route("/")
  .get(reservationController.getreservation)
  .post(reservationController.registerReservation);

router
    .route("/:id")
    .get(reservationsController.getReservationID)  
    .put(reservationsController.updateReservation)  
    .delete(reservationsController.deleteReservation);  

export default router;