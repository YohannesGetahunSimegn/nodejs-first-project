// const fs = fs.readFile('fs');
// const Tour = fs.readFile('./../models/tourModel');******

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid id',
//     });
//   }
//   next();
// };

// exports.checkbody = (req, res, next) => {
//   console.log(req.body.name);
//   if (req.body.name && req.body.price) {
//     return next();
//   } else {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
// };

function getAllTours(req, res) {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
}

function getTour(req, res) {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}
async function createTour(req, res) {
  // const newTour = new Tour({});
  // newTour.save();

  const newTour = await Tour.create(req.data);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
}

function updateTour(req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>',
    },
  });
}

function deleteTour(req, res) {
  res.status(204).json({
    status: 'success',
    data: null,
  });
}

export default {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
};
