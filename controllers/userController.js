import User from '../models/userModel.js';

async function getAllUsers(req, res, next) {
  try {
    const results = await User.find({});

    res.status(200).json({
      status: 'success',
      results: results.length,
      data: {
        tours: results,
      },
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

export default {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
