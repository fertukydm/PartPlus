//Array de metodos (C R U D)
const clientController = {};
import clientModel from "../models/client.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
clientController.getClientID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const client = await clientModel.findById(id);

    if (!client) {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return res.status(500).json({ message: "Error al obtener el cliente" });
  }
};
// SELECT
clientController.getclient = async (req, res) => {
  try{
  const client = await clientModel.find();
 res.status(200).json(client);
 }catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: "No se encontraron clientes." });
  }
};
clientsController.registerClients = async (req, res) => {
  const { name, email, password, age, phone } = req.body;

  try {
    if (!name || !email || !password || !age || !phone) {
      return res.status(400).json({ message: "Porfavor complete todos los campos." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Correo no valido." });
    }

    if (age < 18) {
      return res.status(400).json({ message: "Debe de tener más de 18 años." });
    }

    if (name.length < 4 || password.length < 4) {
      return res.status(400).json({ message: "Debe tener al menos 4 caracteres." });
    }

    const existClient = await clientModel.findOne({ email });
    if (existClient) {
      return res.status(400).json({ message: "El cliente es existente." });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientModel({
      name,
      email,
      password: passwordHash,
      age,
      phone,
    });

    await newClient.save();

    res.status(201).json({ message: "Cliente registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registrando cliente" });
  }
};

// DELETE
clientController.deleteclient = async (req, res) => {
  try{
  const deleteclient = await clientModel.findByIdAndDelete(req.params.id);
  if (!deleteclient) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  res.json({ message: "cliente eliminado" });
 }catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};
// UPDATE
clientController.updateClient = async (req, res) => {
   try {
    const { name, email, password, age, phone } = req.body;

    // Validaciones
    if (!name || !email || !age || !phone) {
      return res.status(400).json({ message: "Complete todos los campos requeridos." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Email no válido." });
    }

    if (age < 18) {
      return res.status(400).json({ message: "Debe de tener más de 18 años." });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres." });
    }

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 5); 
    }

    const updatedClient = await clientModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password: hashedPassword,
        age,
        phone,
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    res.json({ message: "Cliente actualizado .", updatedClient });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ message: "Error actualizando cliente." });
  }
};

export default clientController;
