/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing appointments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
        getAppointments: function(req, res) {
            var id=req.params.id;
            Appointment.findOne({appointment_id: id})
                .populate('provider')
                .populate('serviceAppointment')
                .exec(function(err, user) {
                    if (err) { return res.json(err); }
                    res.json(user);
                })
            
        },
        setAppointment: function(req,res) {
            Appointment.create(req.params.all(), function apptCreated(err, appt){
                if(err) {return res.json(err)}
                // User.findOne({id: user_id})
                //     .exec(function addProvider(err, user){
                //         sails.log(user);
                //         appt.provider.add(user);
                //         appt.save(function(err,result){
                //             if(err) {return res.json(err)}
                //             sails.console.log(result);
                            
                //         })
                //     })
                // Service.findOne({id: service_id})
                //         .exec(function addService(err, service){
                //             appt.serviceAppointment.add(service);
                //             appt.save(function(err,result){
                //                 if(err) {return res.json(err)}
                //                 sails.log(result);
                //             })
                //         })
                res.json(appt);
            })
        },
        apptavailable: function(req,res,next) {
            Appt.findOne(req.param('id')).exec(function checkApp(err,appt){
                if(err) {
                    sails.log(err);
                }
                
            })
        }
};

