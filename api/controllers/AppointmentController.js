/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing appointments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async')
module.exports = {
  getAppointment: function(req, res) {
    var id = req.params.id;
    Appointment.findOne({ appointment_id: id })
      .populate("provider")
      .populate("serviceAppointment")
      .exec(function(err, user) {
        if (err) {
          return res.json(err);
        }
        res.json(user);
      });
  },
  create: function(req, res, next) {
    sails.log("req.body", req.body);
    status = "booked";
    Appointment.findOrCreate(
      {
        appointmentDate: req.body.values.appointmentDate,
        start_time: req.body.values.start_time,
        end_time: req.body.end_time,
        status: status
      },
      {
        appointmentDate: req.body.values.appointmentDate,
        start_time: req.body.values.start_time,
        end_time: req.body.end_time,
        status: status
      }
    ).exec(function apptCreated(err, appt) {
      // Adding contact to customer
      User.update(
        { userId: req.body.customerId },
        { contact_no: req.body.values.contact_no }
      ).exec(function userUpdated(err, user) {
        if (err) {
          return sails.log(err);
        }
        sails.log("contact number updated", user);
      });

      if (err) {
        sails.log("err", err);
      }
      Service.findOne({ service_id: req.body.values.selected_service }).exec(
        function(err, service) {
          service.serviceAppointments.add(appt);
          service.save(function(err, result) {
            if (err) {
              sails.log(err);
            }
            sails.log("service updated result", result);
          });
        }
      );
      //Appointment adding to Customer
      User.findOne({ userId: req.body.customerId })
        .populate("roles")
        .populate("customerAppointments")
        .exec(function(err, customer) {
          console.log("here at least");
          if (err) {
            return sails.log("this error", err);
          }
          _.map(customer.roles, role => {
            console.log("here2", role);
            if (role.role_id == 2) {
              console.log("here3");
              customer.customerAppointments.add(appt);
              customer.save(function(err, result) {
                if (err) {
                  sails.log(err);
                }
                sails.log("appointment added to customer", result);
              });
            }
          });
        });

      res.json(appt);
    });
  },
  getAllAppointments: function(req, res) {
    async.waterfall(
      [
        function(req, res, next) {
          Appointment.query("SELECT * FROM appointment", [], function(
            err,
            appt
          ) {
            if (!err) {
              Service.find({
                service_id: appt.serviceAppointment
              })
                .populate("providers")
                .exec(function(err, service) {
                  var arr = [appt, service];
                  next(null, arr);
                });
            } else next(err);
          });
        }
      ],
      function(err, finalArray) {
        if (err) {
          sails.log("finalError", err);
        } else {
          console.log(finalArray);
          /**
           * in finalArray we have [rows1,rows2] ,rows3 is not there in final array
           * beacause cb2() was callbacked asynchronously with model3.find().exec() in second function
           */
        }
      }
    );
  },

  cancelAppointment: function(req, res, next) {
    Appointment.update(
      { appointment_id: req.param("id") },
      { status: "cancelled" },
      function apptCancelled(err, appt) {
        res.json(appt);
      }
    );
  }
};
