const Event = require('../models').events;
const moment = require('moment');
const { sequelize } = require('../models');
const { Op } = require("sequelize");

const Employees = require('../models').employees;
const getEvents = async function (req, res, next) {
  let [err, events] = await to(Event.findAll());
  if (err) return ReE(res, err, 422);
  if (events) return ReS(res, { events });
}
module.exports.getEvents = getEvents;

const createEvents = async function (req, res, next) {
  let [err, events] = await to(Event.create(req.body));
  if (err) return ReE(res, err, 422);
  if (events) return ReS(res, { events });
}
module.exports.createEvents = createEvents;


const getUpcomingEvents = async function (req, res, next) {
  let todayDate = moment().format('YYYY-MM-DD');
  console.log("today", todayDate)
  let [err, events] = await to(Event.findAll({
    where: {
      'Event_date': {
        [Op.gte]: todayDate
      }
    }
  }));
  if (err) return ReE(res, err, 422);
  if (events) return ReS(res, { events });
}
module.exports.getUpcomingEvents = getUpcomingEvents;