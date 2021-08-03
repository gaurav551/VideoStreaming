using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using _NET_REACT.Models;
using _NET_REACT.Models.VideModels;

namespace _NET_REACT.Services
{
    public interface IVideoService
    {
        List<VideoDTO> GetVideos();
         List<VideoDTO> GetVideosBy(Expression<Func<Video, bool>> predicate);
         bool CheckVideoOwnerShip(int videoId, string userId);
    }
}