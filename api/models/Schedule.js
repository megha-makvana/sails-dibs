/**
 * Schedule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    schedule_id:{
      type:'int',
      primaryKey: true,
      autoIncrement:true
    },
    week_days:{
      type:'array',
      required:true,
    },
    isAvailable:{
      type:'boolean',
      defaultsTo: true
    },
    start_hour:{
      type:'datetime',
      required:true,
    },
    end_hour:{
      type:'datetime',
      required:true,
    },
    owner:{
      model:'User',
  //    required:true,
      unique:true,
    }

  }
};

