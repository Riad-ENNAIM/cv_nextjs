import connectDB from '../../../utils/db';
import Review from '../../../models/Review';

connectDB();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const review = await Review.findById(id);

        if (!review) {
          return res.status(400).send('Server Error');
        }

        res.status(200).json(review);
      } catch (error) {
        res.status(400).send('Server Error');
      }
      break;

    // case 'PUT':
    //   try {
    //       const review = await Review.findByIdAndUpdate(id, req.body, {
    //           new: true,
    //           runValidators: true
    //       });

    //       if (!review) {
    //           return res.status(400).send('Server Error');
    //       }

    //       res.status(200).json(review);
    //   } catch (error) {
    //       res.status(400).send('Server Error');
    //   }
    //   break;

    case 'DELETE':
      try {
        const deletedReview = await Review.deleteOne({ _id: id });

        if (!deletedReview) {
          return res.status(400).send('Server Error');
        }

        res.status(200).json({ msg: 'Review removed' });
      } catch (error) {
        res.status(400).send('Server Error');
      }
      break;

    default:
      res.status(400).send('Server Error');
      break;
  }
};
