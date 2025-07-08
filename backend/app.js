import express from "express";
import productsRoutes from "./src/routes/clients.js";
import customersRoutes from "./src/routes/reservations.js";
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    // Permitir envío de cookies y credenciales
    credentials: true,
  })
);

//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());
// Definir las rutas de las funciones que tendr á la página web
app.use("/api/client", clientsRouter);
app.use("/api/reservation", reservationRouter);


export default app;