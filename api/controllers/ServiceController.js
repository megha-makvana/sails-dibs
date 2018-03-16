/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addService: function(req,res){
        var name= req.body.service_name;
        var id= req.body.user_id;
        
        Service.findOne({service_name: name})
                .exec(function attachProvider(err, service){
                    if(err) {return sails.console.log(err); }
                    
                    User.findOne({id: id})
                        .exec(function foundUser(err, user){
                            if (err) { return sails.console.log(err); }
                            service.providers.add(user)
                            service.save(function(err, result) {
                            sails.log(result);
                        })
                        res.json(service);
                })
            })
    },
    editService:function(req, res, next) {
        var id= req.params.id;
        Service.findOne({id: id}, function editedService(err, user) {
            if (err) return next(err);
            res.json(user);
          //  res.view('user/edit', { user: user })

        })

}
};

