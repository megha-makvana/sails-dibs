/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    editService:function(req, res, next) {
        var id= req.params.id;
        Service.findOne({id: id}, function editedService(err, user) {
            if (err) return next(err);
            res.json(user);
          //  res.view('user/edit', { user: user })

        })

}
};

