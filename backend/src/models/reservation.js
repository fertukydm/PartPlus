/*
  clientId, vehicle, service, status
*/

import { model, Schema } from "mongoose";

const reservationSchema = new Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("reservation", reservationSchema);
