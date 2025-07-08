//Array de metodos (C R U D)
const clientController = {};
import clientModel from "../models/client.js";

// SELECT
clientController.getclient = async (req, res) => {
  const client = await clientModel.find();
  res.json(client);
};

// INSERT
clientController.createclient = async (req, res) => {
  try {
    //1-Pido todos los valores
    const {
        name,
        email,
        password,
        phone,
        age,
    } = req.body;

  
    //2- Guardo los valores en la base de datos
    const clientController = new clientModel({
        name,
        email,
        password,
        phone,
        age,
    });
    await newclient.save();
    res.status(200).json({ message: "employee save" });
  } catch (error) {

    res.status(500).json({message: "error internal server error"+error})
  }
};

// DELETE
clientController.deleteclient = async (req, res) => {
  const deleteclient = await clientModel.findByIdAndDelete(req.params.id);
  if (!deleteclient) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
clientController.updateClient = async (req, res) => {
  // Solicito todos los valores
  const {
    name,
    email,
    password,
    phone,
    age,
  } = req.body;
  // Actualizo
  await clientModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        email,
        password,
        phone,
        age,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee update" });
};

export default clientController;
