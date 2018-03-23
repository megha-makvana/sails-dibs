/**
 * Appointment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    appointment_id:{
      type:'int',
      primaryKey: true,
      autoIncrement:true
    },
    appointmentDate: {
      type: 'datetime',
      required: true,
    },
    appointmentTime: {
      type: 'datetime',
      required: true,
    },
    time_slot: {
      type: 'datetime',
      required: true
    },
    status: {
      type: 'string',
      enum: ['booked', 'canceled']
    },
    provider: {
      model: 'user',
      required: true,
    },
    serviceAppointment: {
      model: 'service',
      required: true,
    }
  }
};

