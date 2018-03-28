/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing appointments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
        getAppointment: function(req, res) {
            var id=req.params.id;
            Appointment.findOne({appointment_id: id})
                .populate('provider')
                .populate('serviceAppointment')
                .exec(function(err, user) {
                    if (err) { return res.json(err); }
                    res.json(user);
                })
            
        },
        create: function(req,res,next) {
            sails.log('req.body',req.body)
            status="booked"
            Appointment.findOrCreate({appointmentDate:req.body.values.appointmentDate, start_time:req.body.values.start_time, end_time:req.body.end_time, status: status},{appointmentDate:req.body.values.appointmentDate, start_time:req.body.values.start_time, end_time:req.body.end_time, status: status})
                        .exec(function apptCreated(err,appt){
                            if(err) { sails.log('err',err)}
                            Service.findOne({ service_id : req.body.values.selected_service})
                                    .exec(function(err,service){
                                        service.serviceAppointments.add(appt);
                                        service.save(function(err,result){
                                            if(err) { sails.log(err)}
                                        })
                                    }) 
                            User.find({userId: req.body.businessId})  
                                .populate('roles')
                                .exec(function(err,provider){
                                    _.map( provider.roles, role => {
                                      if(role.role_id==1){
                                        provider.providerAppointments.add(appt);
                                        provider.save(function(err, result){
                                            if(err) { sails.log(err)}
                                            sails.log('appointment added to provider')
                                        })
                                    }  
                                })
                            })                  
                            //Appointment adding to Customer
                            User.find({userId: req.body.customerId})  
                                .populate('roles')
                                .exec(function(err,customer){
                                    _.map( customer.roles, role => {
                                      if(role.role_id==2){
                                        customer.customerAppointments.add(appt)
                                        customer.save(function(err, result){
                                            if(err) { sails.log(err)}
                                            sails.log('appointment added to customer')
                                        })
                                    }  
                                })
                            })
                            // Adding contact to customer 
                            User.update({userId: req.body.customerId},{ contact_no: req.body.values.contact_no})
                                .exec(function userUpdated(err, user){
                                    if(err) { return sails.log(err)}
                                    sails.log('contact number updated',user);
                            })
                        })
        },
        getAllAppointments: function(req, res, next ){
            Appointment.query('SELECT * FROM appointment',[],function(err, rawResult) {
                if (err) { return res.serverError(err); }
                res.json(rawResult)
                // sails.log(rawResult);
                // ...grab appropriate data...
                // (result format depends on the SQL query that was passed in, and the adapter you're using)

                // Then parse the raw result and do whatever you like with it.
                    
             //   return res.ok();

            });
        }
};

