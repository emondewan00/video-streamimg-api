const result = await History.aggregate([
  {
    $match: {
      email,
    },
  },
  {
    $lookup: {
      from: "videos",
      localField: "videoId",
      foreignField: "_id",
      as: "video",
    },
  },
  { $sort: { createAt: -1 } },
]);
