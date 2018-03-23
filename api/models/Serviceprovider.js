/**
 * Service-provider.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    serv_pro_id:{
      type:'int',
      primaryKey:true,
      autoIncrement:true
    },
      service: {
        model: 'Service',
        unique:true
     //   foreignKey: true
      },
      provider: {
        model: 'User',
     //   foreignKey: true
      }
  }
};

