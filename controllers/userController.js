import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

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
/// Working now************************************
//************************************************* */

const updateMe = catchAsync(async function (req, res, next) {
  // 1) Create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for updating password. please use /updatePassword ',
        400
      )
    );

  //2) Filtered out unwanted field names that are not allowed for an apdate
  const filteredBody = filterObj(req.body, 'name', 'email');
  //3) Update document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, // return the modified document rather than the original
    runValidators: true, // run schema validators on this update
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = catchAsync(async function (req, res, next) {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export default {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
};
