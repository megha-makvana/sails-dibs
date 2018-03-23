/**
 * Service.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    service_id:{
      type:'int',
      primaryKey: true,
      autoIncrement:true
    },
    service_name:{
      type:"string",
      required: true,
    },
    service_duration:{
      type: "int",
      required:true,
    },
    providers:{                                             // Many to Mamy = Service - Users(provider)
      collection:'User',
      through:'serviceprovider',
    },
    serviceAppointments:{                                   // One to Many = Service - Multiple Appointments
      collection:'Appointment',
      via:'serviceAppointment',
      dominant: true
    }
  }
};

