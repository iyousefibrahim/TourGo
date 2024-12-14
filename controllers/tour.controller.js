const Tour = require('../models/tour.model');

exports.getAllTours = async (req, res) => {
    try {

        // Build Query

        // 1- Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2- Advanced Filtering
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, matched => {
            return `$${matched}`
        });

        const query = Tour.find(JSON.parse(queryString));

        // Execute Query
        const tours = await query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
};

exports.getTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
};

exports.createTour = async (req, res) => {

    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }

};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Returns the new document not the original
            runValidators: true // validators in schema runs
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteTour = async (req, res) => {

    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'success' });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }

};
