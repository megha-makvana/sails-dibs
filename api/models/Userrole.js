/**
 * User-role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_role_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      model: 'User',
      foreignKey: true,

    },
    role: {
      model: 'Role',
      foreignKey: true,
    }
  }
};

