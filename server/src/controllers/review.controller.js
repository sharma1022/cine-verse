import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";
import mongoose from 'mongoose'; 
const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Validate if reviewId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    // Use findOneAndDelete to find and delete the review
    const review = await reviewModel.findOneAndDelete({
      _id: reviewId,
      user: req.user.id // Assuming req.user.id is the ID of the logged-in user
    });

    // If the review doesn't exist, return a 404 Not Found
    if (!review) {
      return res.status(404).json({ message: "Review not found or not authorized to delete" });
    }

    // Send success response
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error); // Log the exact error
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      user: req.user.id
    }).sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };