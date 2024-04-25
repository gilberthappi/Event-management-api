import { USER } from '../../models';

//get all users in the database
export const All = async(req,res)=>{
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let skipIndex = (page - 1) * limit;
    let results = {};
    let count = await USER.countDocuments();
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
    results.data = await USER.find().limit(limit).skip(skipIndex);
    res.status(200).json(results);
    } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

//find one user in the database by email
export const getUserByEmail = async(req,res)=>{
  const email = req.params.email;
  try {
    let userData = await USER.findOne({email: email});
    res.status(200).json(userData); 

} catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

//update users by email
export const updateByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const updatedFields = req.body; // Fields will be available as part of multipart/form-data
    
    const updatedUser = await USER.findOneAndUpdate(
      { email: email },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

export const deleteUser = async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await USER.deleteOne({ email: email });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: `User with email:${email} not found` });
    }

    res.status(200).json({ message: `User with email:${email} successfully deleted` });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
