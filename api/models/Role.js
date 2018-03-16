/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      role_id:{
          type:'int',
          primaryKey: true,
          autoIncrement:true
      },
      role_name:{
          type: "string"
      },
      users:{
          collection:'User',
          through:"userrole",
      },
    //   services:{
    //     collection:'Service',
    //     through:"userrole",
    //   }
  }
};