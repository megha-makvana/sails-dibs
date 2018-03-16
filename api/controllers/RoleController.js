/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {  
    addRoles: function(req, res, next) {  //DONE
        sails.log('request Body:', req.body);
        User.findOne({ userId: req.body.user_id }).populate('roles').exec(function (err, user) {
            if (err) { return next(err) }
            if (!user) { return sails.log('could not find user'); }

            Role.findOne({ role_id: req.body.role_id }).exec(function (err, role) {
                if (err) { return next(err); }
                if (!role) { return sails.log('could not find role') }
                user.roles.add(role);
                user.save(function (err,result) {
                    if (err) { return next(err); }
                    sails.log('User role added',result)
                });
            });
            res.json(user);
        });
    }
};

