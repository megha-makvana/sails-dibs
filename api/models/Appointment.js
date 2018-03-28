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
    start_time: {
      type: 'string',
      required: true,
    },
    end_time: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['booked', 'canceled']
    },
    appProvider: {
      model: 'user',
    },
    appCustomer:{
      model: 'user',
    },
    serviceAppointment: {
      model: 'service',
    }
  }
};

