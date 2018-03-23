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
            sails.log('Body',req.body);
            
            Appointment.create({ appointmentDate,appointmentTime,time_slot,status})
                        .exec( function(err,appt){
                            if(err) { sails.log(err) }
                            Service.findOne({ service_id})
                                    .exec(function(err,service){
                                        service.serviceAppointments.add(appt);
                                        service.save(function(err,result){
                                            if(err) { sails.log(err)}
                                        })
                                    })
                            //Appointment adding to Provider
                            User.findOne({userId})
                                .populate('roles')
                                .exec(function(err,pro){
                                    let role = pro.roles;
                                        if(role==1){
                                            pro.userAppointments.add(appt)
                                            pro.save(function(err, result){
                                                if(err) { sails.log(err)}
                                            })
                                    }
                                }) 
                            //Appointment adding to Customer
                            User.findOne({})  
                                .populate('roles')
                                .exec(function(err,customer){
                                    let role= customer.roles;
                                    if(role==2){
                                        customer.userAppointments.add(appt)
                                        customer.save(function(err, result){
                                            if(err) { sails.log(err)}
                                        })
                                    }
                                })
                        })

        },
};

