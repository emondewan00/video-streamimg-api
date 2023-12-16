class ReactionVideos {
  constructor(model) {
    this.model = model;
  }
  async getHistorysLikesWatchLaterVideos(email, limit) {
    try {
      const result = await this.model.aggregate([
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
        limit,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ReactionVideos;
