/*
  name,
        email,
        password,
        age,
*/

import { model, Schema } from "mongoose";

const cientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
        type: Number,
        required: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("client", cientSchema);
