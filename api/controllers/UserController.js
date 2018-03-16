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
    //console.log('Body:',req.body);
        User.findOrCreate({ userId: req.body.uId}, {
                email: req.body.email,
                userId: req.body.uId,
                gtoken: req.body.token,
                provider: req.body.provider
            })
            .exec(function userCreated(err, user){
                if (err) { return next(err); }     
                    if (user) {
                        token: JwtSecret.issue({ userId: user.userId })
                        sails.log('to ken:',token);
                        res.json(token);
                    } else {
                        sails.log("no user")
                    }
                            
        })
    },
    setupBusiness: function(req, res) {    //DONE
        //  sails.log('Body:', req.body)
        var contact_no = req.body.contact_no;
        var address = req.body.address;
        var business_name = req.body.business_name;
        var business_category = req.body.business_category;
        var service_name = req.body.service_name;
        var service_duration = req.body.service_duration;
        var cancel=req.body.cancel;
        var week_days= req.body.week_days;
        var start_hour= req.body.start_hour;
        var end_hour= req.body.end_hour;
        User.update(req.param('id'),{ contact_no: contact_no, address: address, business_name: business_name, business_category: business_category,cancel:cancel })
            .exec(function userDetailsAdded(err, user) {
                if (err) { 
                    return sails.log(err); 
                }
                sails.log('before service creation', user);     

                Service.create({ service_name:service_name,service_duration: service_duration })
                        .exec( function serviceDetailsAdded(err, service1) {
                            if (err) { 
                                return sails.log(err); 
                            }

                            console.log('adding service.providers')
                            console.log('id:',user['0'])
                            service1.providers.add(user['0']);
                            service1.save(function (err, result) {
                                        if (err) return sails.log(err);
                                        sails.log('added owner to service',result);
                            })
                            sails.log('adding user.services');

                            user['0'].services.add(service1);
                            user['0'].save(function(err, result){
                                    if(err) return sails.log(err);
                                    sails.log('addes services to user',result);
                            })
                    console.log('done with service');
                }),
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
        var business_category= req.params.category;
        User.find({business_category: business_category})
            .exec(function displayList(err, user){
                if(err) { return res.json(err);}

                res.json(user)
            })
    },
    getServices: function(req, res){   //services of a particluar business ie, business11
        var business_name=req.params.business_name;
        User.findOne({business_name: business_name})
            .populate('services')
            .exec(function(err, business){
                if(err) { return res.json(err);}
                res.json(business.services);
            })
    },
    // getServicesByCategory: function (req, res) {  //services of particlular business_cateogry ie, clinic 
    //     var business_category = req.params.business_category;
    //     User.findOne({ business_category: business_category })
    //         .populate('services')
    //         .exec(function (err, business) {
    //             if (err) { return res.json(err); }

    //             res.json(business.services);
    //         })
    // },
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
        User.find(req.param('id'))
        .populate('roles')
        .populate('services')
        .populate('userAppointments')
        .populate('schedules')
        .exec(function userFound(err,user){
            if(err) {
                return sails.log(err);
            }
            res.json(user);
        })
    },
    fetchUserAppointments: function (req, res, next) {
        sails.log('params:',req.params)
        User.findOne(req.param('id'))
            .populate('roles')
            .populate('services')
            .populate('userAppointments')
            .populate('schedules')
            .exec(function userFound(err, user) {
                if (err) {
                    return sails.log(err);
                }
                console.log(user);
                //res.json(user.userAppointments);
            })
    },
    getRole: function(req,res,next) {
        User.findOne(req.param('id'))
            .populate('roles')
            .exec(function userFound(err,user){
                if (err) {
                    return sails.log(err);
                }
                res.json(user.roles)
            })
    },
    getBusinessCategories: function(req,res, next) {
        User.find({ select: ['business_category'] })
            .exec(function(err, listFound){
                if(err) { return next(err)}
                res.json(listFound)
            })
    }, 
    getLoc: function (req, res) {
        sails.log(req.params.id);
        var id = req.params.id;
        User.findOne({ id: id })
            .exec(function foundAddress(err, user) {
                if (err) { return res.json(err); }
                sails.log(user);
                res.json(user.address);
            })
    },
}