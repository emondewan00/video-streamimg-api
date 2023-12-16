const Movie = require("../Schema/videoSchema");

const filter = async (req, res, next) => {
  try {
    
    const result = await Movie.aggregate([{
        $lookup:{
            from:"likes",
            localField:
        }
    }]);
  } catch (error) {}
};
