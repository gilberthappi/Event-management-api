import { EVENT } from '../../models';

export const getEvent = async (req, res) => {
  try {
    const { fieldName, value } = req.query;
    let query = {};
    if (fieldName && value) {
      query[fieldName] = value;
    }
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let skipIndex = (page - 1) * limit;
    let results = {};
    let count = await EVENT.countDocuments();
    if (page === 1) {
      results.previous = null;
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (skipIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    results.totalPages = Math.ceil(count / limit);
    results.totalEntries = count;
    results.currentPage = page;
    results.limit = limit;
    results.data = await EVENT.find().limit(limit).skip(skipIndex);
    res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// get one event
export const getOneEvent = async (req, res) => {
  try {
    const event = await EVENT.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};