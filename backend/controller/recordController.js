const mongoose = require("mongoose");

const Record = require("../models/recordModel");
const AppError = require("../utilities/appError");
const validator = require("../config/validator");

exports.getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find({ user: req.user.id }).exec();
    res.status(200).json({
      status: "success",
      results: records.length,
      data: {
        records,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id).exec();

    if (!record)
      return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: record,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    req.body = { ...req.body.recordObject };

    if (req.body.status === "planning") delete req.body.rating;

    if (!req.body.user) req.body.user = req.user.id;

    const { error } = await validator.recordDataValidate(req.body);

    if (error) return next(new AppError(`${error.details[0].message}`, 400));

    const newRecord = await Record.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        data: newRecord,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    req.body = { ...req.body.updateRecordObject };

    if (req.body.status === "planning") delete req.body.rating;

    if (!req.body.user) req.body.user = req.user.id;

    const { error } = validator.updateRecordDataValidate(req.body);

    if (error) return next(new AppError(`${error.details[0].message}`, 400));

    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!record)
      return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: record,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id).exec();

    if (!record)
      return next(new AppError("No document found with that ID", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHistoryRecords = async (req, res, next) => {
  try {
    const stats = await Record.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$user", { $toObjectId: "65000a5f9e42f36f29ea5486" }],
          },
        },
      },
      {
        $match: { status: { $eq: "visited" } },
      },
      {
        $group: { _id: "$country", num: { $sum: 1 } },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    next(err);
  }
};
