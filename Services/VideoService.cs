using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using _NET_REACT.Helpers;
using _NET_REACT.Models;
using _NET_REACT.Models.VideModels;
using JWT.DEMO.Context;

namespace _NET_REACT.Services
{
    public class VideoService : IVideoService
    {
        private readonly ApplicationDbContext context;
        public VideoService(ApplicationDbContext context)
        {
            this.context = context;

        }
        public List<VideoDTO> GetVideos()
        {
           var videos =(from c in context.Videos select c).ToList();
            return videos.Select(x=> new VideoDTO{
              Id = x.Id,
              Views = GetVideoViews(x.Id),
              Title = x.Title,
              VideoName = x.VideoName,
              ChannelName = GetChannelName(x.UserId),
              UploadDate = StringHelper.RelativeDate(x.UploadedOn)
              
            }).ToList();
        }
        public int GetVideoViews(int vId)
        {
            var vid = context.ViewCounts.FirstOrDefault(x=>x.VideoId==vId);
            return vid==null? 0 : vid.View;
        }
        public string GetChannelName(string userId)
        {
        var id =  context.ApplicationUsers.FirstOrDefault(x=>x.Id.Equals(userId)).UserName;
        return id;

        }

        public List<VideoDTO> GetVideosBy(Expression<Func<Video, bool>> predicate)
        {
           var videos =context.Videos.Where(predicate).ToList();
         
            return videos.Select(x=> new VideoDTO{
              Id = x.Id,
              Views = GetVideoViews(x.Id),
              Title = x.Title,
              VideoName = x.VideoName,
              ChannelName = GetChannelName(x.UserId),
              UploadDate = StringHelper.RelativeDate(x.UploadedOn)
              
            }).ToList();        }

        public bool CheckVideoOwnerShip(int videoId, string userId)
        {
           var video  = context.Videos.FirstOrDefault(x=>x.Id==videoId);
           if(video!=null && video.UserId.Equals(userId))
           return true;
           return false;
        }
    }
}