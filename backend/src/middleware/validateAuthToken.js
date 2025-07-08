import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

// Validación para clientes
const validateClient = (req, res, next) => {
  const { name, email, password, phone, age } = req.body;
  const errors = [];

  // Validar nombre
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
  }

  // Validar email
  if (!email || !validator.isEmail(email)) {
    errors.push('Email inválido');
  }

  // Validar contraseña
  if (!password || password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  // Validar teléfono
  if (!phone || !/^\+?[\d\s\-\(\)]+$/.test(phone)) {
    errors.push('Número de teléfono inválido');
  }

  // Validar edad
  if (!age || typeof age !== 'number' || age < 18 || age > 120) {
    errors.push('La edad debe estar entre 18 y 120 años');
  }
  

  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Datos inválidos',
      details: errors 
    });
  }

  next();
};

// Validación para reservas
const validateReservation = async (req, res, next) => {
  const { clientId, vehicle, service, status } = req.body;
  const errors = [];

  // Validar clientId
  if (!clientId) {
    errors.push('ID de cliente es obligatorio');
  } else if (!mongoose.Types.ObjectId.isValid(clientId)) {
    errors.push('ID de cliente inválido');
  } else {
    // Verificar que el cliente existe
    try {
      const Client = require('../models/client.js');
      const client = await Client.findById(clientId);
      if (!client) {
        errors.push('Cliente no encontrado');
      }
    } catch (error) {
      errors.push('Error al verificar cliente');
    }
  }

  // Validar vehículo
  if (!vehicle || typeof vehicle !== 'string' || vehicle.trim().length < 2) {
    errors.push('La información del vehículo es obligatoria y debe tener al menos 2 caracteres');
  }

  // Validar servicio
  const validServices = ['Mantenimiento', 'Reparación', 'Inspección', 'Cambio de aceite', 'Alineación', 'Frenos', 'Otros'];
  if (!service || !validServices.includes(service)) {
    errors.push(`Servicio inválido. Debe ser uno de: ${validServices.join(', ')}`);
  }

  // Validar estado (opcional)
  if (status) {
    const validStatuses = ['Pendiente', 'Confirmada', 'En proceso', 'Completada', 'Cancelada'];
    if (!validStatuses.includes(status)) {
      errors.push(`Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Datos inválidos',
      details: errors 
    });
  }

  next();
};

// Validación de ID de MongoDB
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  
  next();
};

module.exports = {
  validateClient,
  validateReservation,
  validateObjectId
};

export default validateClient;