import reservationModel from "../models/reservation.js";

//Array de funciones vacías
const reservationController = {};

//Select
reservationController.getAllreservation = async (req, res) => {
  try {
    const sales = await reservationModel.find();
    res.status(200).json(sales);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Insert
reservationController.insertreservation = async (req, res) => {
  try {
    //Solicitar los datos
    const { clientId, vehicle, service, status } = req.body;

    if (total < 0) {
      return res.status(400).json({ message: "Insert valid reservation" });
    }

    //Guardamos en la base de datos
    const newReservation = new reservationModel({ clientId, vehicle, service, status });
    await newReservation.save();

    res.status(200).json({ message: "Sale saved" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =================================
// Ventas que tiene cada categoria
// =================================

reservationController.getReservationByCategory = async (req, res) => {
  try {
    const resultado = await reservationModel.aggregate([
      {
        $group: {
          _id: "$category",
          totalventas: { $sum: "$total" },
        },
      },
      //ordenar
      {
        $sort: { totalventas: -1 },
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================
// Productos más vendidos
// =======================
reservationController.getBestSelledProducts = async (req, res) => {
  try {
    const resultado = await salesModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalventas: { $sum: 1 },
        },
      },
      //Ordenar
      {
        $sort: { totalventas: -1 },
      },
      //Limitar la cantidad de datos a mostrar
      {
        $limit: 3,
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Ganancias totales
// =====================
reservationController.totalReservation = async (req, res) => {
  try {
    const resultado = await reservationModel.aggregate([
      {
        $group: {
          _id: null,
          gananciasTotales: { $sum: "$total" },
        },
      },
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default reservationController;
