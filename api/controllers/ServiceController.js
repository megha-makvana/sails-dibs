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
    },
    fetchService: function(req, res, next) {
        console.log('params',req.params);
        Service.findOne({service_id:req.param('id')})
                .populate('providers')
                .populate('serviceAppointments')
                .exec( function(err, service){
                    if(err) return next(err);
                    res.json(service);

                })
    },
    // getAllServices: function(req, res, next ){
    //     console.log('here',req.body);
    //         Service.query('SELECT * FROM service',[],function(err, rawResult) {
    //             if (err) { return res.serverError(err); }
    //             res.json(rawResult)
    //         });
    //         Service.find()
                    
    //     },
};

