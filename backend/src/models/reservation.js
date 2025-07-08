const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'El ID del cliente es obligatorio']
  },
  vehicle: {
    type: String,
    required: [true, 'La información del vehículo es obligatoria'],
    trim: true,
    minlength: [2, 'La información del vehículo debe tener al menos 2 caracteres'],
    maxlength: [100, 'La información del vehículo no puede tener más de 100 caracteres']
  },
  service: {
    type: String,
    required: [true, 'El servicio es obligatorio'],
    trim: true,
    enum: {
      values: ['Mantenimiento', 'Reparación', 'Inspección', 'Cambio de aceite', 'Alineación', 'Frenos', 'Otros'],
      message: 'Servicio inválido. Debe ser uno de: Mantenimiento, Reparación, Inspección, Cambio de aceite, Alineación, Frenos, Otros'
    }
  },
  status: {
    type: String,
    required: [true, 'El estado es obligatorio'],
    enum: {
      values: ['Pendiente', 'Confirmada', 'En proceso', 'Completada', 'Cancelada'],
      message: 'Estado inválido. Debe ser uno de: Pendiente, Confirmada, En proceso, Completada, Cancelada'
    },
    default: 'Pendiente'
  }
}, {
  timestamps: true
});

// Índice para mejorar las consultas por cliente
reservationSchema.index({ clientId: 1 });

// Middleware para validar que el cliente existe
reservationSchema.pre('save', async function(next) {
  if (!this.isModified('clientId')) return next();
  
  try {
    const Client = mongoose.model('Client');
    const client = await Client.findById(this.clientId);
    
    if (!client) {
      const error = new Error('Cliente no encontrado');
      error.statusCode = 404;
      return next(error);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);