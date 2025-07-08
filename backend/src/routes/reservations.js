import express from "express";
import reservationController from "../controllers/reservationController.js";

const router = express.Router();

router.route("/")
  .get(reservationController.getAllreservation)
  .post(reservationController.insertreservation);

router.route("/getReservationByCategory")
.get(reservationController.getReservationByCategory);

router.route("/getBestSelledProducts")
  .get(reservationController.getBestSelledProducts);

router.route("/totalReservation")
.get(reservationController.totalReservation);

export default router;