import connectDB from '../../../utils/db';
import Review from '../../../models/Review';

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const reviews = await Review.find().sort({ date: 1 });

        res.status(200).json(reviews);
      } catch (error) {
        res.status(400).send('Server Error');
      }
      break;

    case 'POST':
      try {
        const review = await Review.create(req.body);

        res.status(201).json(review);
      } catch (error) {
        res.status(400).send('Server Error');
      }
      break;

    default:
      res.status(400).send('Server Error');
      break;
  }
}
