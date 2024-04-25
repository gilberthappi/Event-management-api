import { TOUR } from '../../models';

export const deleteTours = async (req, res) => {
  try {

    const { fieldName, value } = req.query;
    let query = {};
    if (fieldName && value) {
      query[fieldName] = value;
    }
    const data = await TOUR.deleteMany(query);

    // Check if any documents were deleted
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: 'No matching documents found for deletion' });
    }
    res.status(200).json({ message: 'Delete successful', deletedCount: data.deletedCount });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};