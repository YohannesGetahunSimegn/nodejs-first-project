import Tour from '../models/tourModel.cjs';

async function getAllTours(req, res) {
  try {
    let query = Tour.find({});
    // Filtering using difficulty
    if (req.query.difficulty) {
      query = query.where('difficulty').equals(req.query.difficulty);
    }
    // Sorting
    if (req.query.sort) {
      const sortField = req.query.sort;
      query = query.sort({ [sortField]: 1 });
    }

    // Handle field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // Default to excluding __v field if no fields specified
      query = query.select('-__v');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page if not specified
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // EXECUTING QUERY
    const results = await query.exec();

    // Count total documents for pagination info
    const totalDocuments = await Tour.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      status: 'success',
      results: results.length,
      data: {
        tours: results,
      },
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}

async function updateTour(req, res) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

async function deleteTour(req, res) {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

export default {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
};
