import { TOUR } from '../../models';

export const updateTour = async (req, res) => {
  try {
    const { fieldName, value } = req.query;
    const updatedFields = req.body;

    let query = {};
    query[fieldName] = value;
    
    let updatedElement = await TOUR.updateMany(query, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedElement) {
      return res.status(404).json({
        message: `can not find any product `,
      });
    }
    res.status(200).json(updatedElement);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

