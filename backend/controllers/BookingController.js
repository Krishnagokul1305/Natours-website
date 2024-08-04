const bookingsModel = require('../model/bookingsModel');
const { getAll, createOne } = require('./handlerFactory');

exports.getAllBookings = getAll(bookingsModel);

exports.postBookings = createOne(bookingsModel, true);
