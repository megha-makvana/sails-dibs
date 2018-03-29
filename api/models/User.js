
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
    },
    email: {
      type: "email",
      required: true,
      unique: true
    },
    contact_no:{
      type: "int",
      maxLength: 15,
      //required: true,
    },
    address: {
      type:"longtext",
     //required: true,
    },
    userId:{
      type: "string",
      primaryKey: true,
      unique:true
    },
    gtoken:{
      type: "string"
    },
    provider:{
     type:"string"
    },
    cancel:{
      type: "boolean",
   //   required: true
    },
    business_name:{
      type:"string",
      unique:true
    },
    business_category:{
      type:"string"
    },
    roles:{                                                 // Many to Many = User <-> User-role <-> Role 
      collection:'Role',
      through:'userrole',
    },
    services:{
      collection:'Service',
      through:'serviceprovider',                          // Many to Many = User (provider) <-> Service-provider <-> Service
    },
    schedules:{                                             // One to One = User (provider) - Schedule
      collection:'Schedule',
      via:'owner',
    },
    customerAppointments:{                                       // One to Many = User(customer) - multiple Appointments
      collection:'Appointment',
      via:'customer',
    },
  }

};
