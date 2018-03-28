/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllerssa
 */
var _ = require('lodash');
var JwtSecret = require('../services/JwtService');
module.exports = {
    createUser: function(req, res, next){  //DONE
        console.log(req.body)
        User.findOrCreate({ userId: req.body.uId}, {
                name: req.body.name,
                email: req.body.email,
                userId: req.body.uId,
                gtoken: req.body.token,
                provider: req.body.provider
            })
            .exec(function userCreated(err, user){
                if (err) { return next(err); }     
                    if (user) {
                        token: JwtSecret.issue({ userId: user.userId })
                        res.json(token);
                    } else {
                        sails.log("no user")
                    }
                            
        })
    },
    setupBusiness: function(req, res) {    sails.log('Body:', req.body)
        var contact_no = req.body.values.contact_no;
        var address = req.body.values.address;
        var business_name = req.body.values.business_name;
        var business_category = req.body.values.business_category;
        var servicesArray = req.body.values.addService;
        var cancel = req.body.values.cancel;
        var week_days = req.body.values.week_days;
        var start_hour = req.body.values.start_hour;
        var end_hour = req.body.values.end_hour;
        User.update(req.param('id'),{ contact_no: contact_no, address: address, business_name: business_name, business_category: business_category,cancel:cancel })
            .exec(function userDetailsAdded(err, user) {
                if (err) { 
                    return sails.log(err); 
                }    
                _.map(servicesArray, (service) => {
                    console.log('service11',service)
                    Service.create({ service_name: service.service_name, service_duration: service.service_duration })
                            .exec(function serviceDetailsAdded(err, service1) {
                                if (err) {
                                    return sails.log(err);
                                }
                                service1.providers.add(user['0']);
                                service1.save(function (err, result) {
                                    if (err) return sails.log(err);
                                    sails.log('added owner to service', result);
                                })
                                user['0'].services.add(service1);
                                user['0'].save(function (err, result) {
                                    if (err) return sails.log(err);
                                    sails.log('addes services to user', result);
                                })
                                
                            }
                        )  
                    }
                
                ),
                Schedule.create({week_days:week_days, start_hour: start_hour, end_hour: end_hour })
                        .exec(function scheduleDetailsAdded(err, schedule) {
                            if (err) { return sails.log(err); }
                            user['0'].schedules.add(schedule);
                            user['0'].save(function (err, result) {
                            if (err) return sails.log(err);
                            sails.log('added owner to schedule',result);
                        })
               })
          res.json(user);
        })  
    },   
    listOfBusiness: function(req, res){
        let business_categoryy;
        const index = req.params.value;
        console.log(index);
        switch(index){
            case '1':{
                business_categoryy='Clinic'
                break;
            }
            case '2':{
                business_categoryy='Salon'
                break;
            }
            case '3':{
                business_categoryy='Law'
                break;
            }
        }
        User.find({ business_category: business_categoryy })
          .populate("roles")
          .populate("services")
          .populate("providerAppointments")
          .populate("customerAppointments")
          .populate("schedules")
          .exec(function displayList(err, user) {
            if (err) {
              return res.json(err);
            }

            res.json(user);
          });
    },
    // getAppointments: function(req, res) {
    //     var id= req.params.id                                            ;
    //     User.findOne({id:id})
    //         .populate('userAppointments')
    //         .exec(function gotThat(err, user){
    //             if(err) { return res.json(err);}
    //             res.json(user.userAppointments);
    //         })
    // },
    // edit: function (req, res, next) {
    //     User.findOne(req.param('id'), function editUser(err, user) {
    //         if (err) return next(err);
    //         res.json(user);
    //        // res.view('user/edit', { user: user })

    //     })
    // },
    // update: function (req, res, next) {
    //     User.update(req.param('id'), req.params.all(), function customerUpdated(err,user) {
    //         if (err) {
    //             return sails.log(err);
    //         }
    //         res.json(user);
    //     });
    // },
    fetchUsers: function(req, res, next) {
        User.find(req.param("id"))
          .populate("roles")
          .populate("services")
          .populate("providerAppointments")
          .populate("customerAppointments")
          .populate("schedules")
          .exec(function userFound(err, user) {
            if (err) {
              return sails.log(err);
            }
            res.json(user);
          });
    },
    fetchUserAppointments: function (req, res, next) {
        sails.log('params:',req.params)
        User.findOne(req.param("id"))
          .populate("roles")
          .populate("services")
          .populate("providerAppointments")
          .populate("customerAppointments")
          .populate("schedules")
          .exec(function userFound(err, user) {
            if (err) {
              return sails.log(err);
            }
            console.log(user);
            //res.json(user.userAppointments);
          });
    },
    // getRole: function(req,res,next) {
    //     User.findOne(req.param('id'))
    //         .populate('roles')
    //         .exec(function userFound(err,user){
    //             if (err) {
    //                 return sails.log(err);
    //             }
    //             res.json(user.roles)
    //         })
    // },
    // getLoc: function (req, res) {
    //     sails.log(req.params.id);
    //     var id = req.params.id;
    //     User.findOne({ id: id })
    //         .exec(function foundAddress(err, user) {
    //             if (err) { return res.json(err); }
    //             sails.log(user);
    //             res.json(user.address);
    //         })
    // },
}