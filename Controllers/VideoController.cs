using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _NET_REACT.Filters;
using _NET_REACT.Helpers;
using _NET_REACT.Models;
using _NET_REACT.Models.VideModels;
using _NET_REACT.Services;
using JWT.DEMO.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using SampleApp.Utilities;
namespace JWT.DEMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : Controller
    {
        private const long MaxFileSize = 10L * 1024L * 1024L * 1024L; // 10GB, adjust to your need
        private readonly ApplicationDbContext context;
        private readonly IVideoService videoService;
        public VideoController(ApplicationDbContext context, IVideoService videoService)
        {
            this.videoService = videoService;
            this.context = context;
        }
        [HttpGet]
        [Route("videos")]
        public IActionResult Get()
        {
            return Json(videoService.GetVideos());
        }
        [DisableFormValueModelBinding]
        [RequestSizeLimit(MaxFileSize)]
        [RequestFormLimits(MultipartBodyLengthLimit = MaxFileSize)]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ReceiveFile(string title, string tags, string description, string categories)
        {
            try
            {
                System.Console.WriteLine(title);
                System.Console.WriteLine(tags);
                System.Console.WriteLine(description);
                if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                    throw new BadHttpRequestException("Not a multipart request");
                var boundary = MultipartRequestHelper.GetBoundary(MediaTypeHeaderValue.Parse(Request.ContentType));
                var reader = new MultipartReader(boundary, Request.Body);
                // note: this is for a single file, you could also process multiple files
                var section = await reader.ReadNextSectionAsync();
                if (section == null)
                    throw new BadHttpRequestException("No sections in multipart defined");
                if (!ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var contentDisposition))
                    throw new BadHttpRequestException("No content disposition in multipart defined");
                var fileName = contentDisposition.FileNameStar.ToString();
                if (string.IsNullOrEmpty(fileName))
                {
                    fileName = contentDisposition.FileName.ToString();
                }
                if (string.IsNullOrEmpty(fileName))
                    throw new BadHttpRequestException("No filename defined.");
                Stream file = section.Body;
                //production  
                //build/videos
                //clientapp/public/videos
                var path = Path.Combine(Directory.GetCurrentDirectory(), "clientapp/build/videos", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                var userIdFromClamsInJwt = User.FindFirst("uid")?.Value;
                //Save
                Video v = new Video() { Title = title, Description = description, Tags = tags, VideoName = fileName, UserId = userIdFromClamsInJwt, Categories = categories };
                context.Videos.Add(v);
                context.SaveChanges();
                //await SendFileSomewhere(fileStream);
                //return StatusCode(500);
                return Ok(new { message = "Video Uploaded Successfully" });
            }
            catch (Exception e)
            {
                return StatusCode(500, (new { message = e.ToString() }));
            }
        }
        // This should probably not be inside the controller class
        [Route("myvideos")]
        [HttpGet]
        [Authorize]
        public IActionResult MyVideos()
        {
            var userIdFromClamsInJwt = User.FindFirst("uid")?.Value;
            return Json(context.Videos.Where(x => x.UserId.Equals(userIdFromClamsInJwt)).OrderByDescending(x => x.Id));
        }
        [HttpDelete("{id}")]
      //  [Authorize]
        public IActionResult Delete(int id)
        {
            var video = context.Videos.FirstOrDefault(x => x.Id == id);
            context.Videos.Remove(video);
            context.SaveChanges();
            return Ok(new { message = "DELETED" });
        }
        [Route("watch")]
        [HttpGet]
        public IActionResult Video(int id)
        {
            var userIdFromClamsInJwt = User.FindFirst("uid")?.Value;
            bool isLiked = false;
            if (context.Likes.Any(x => x.UserId.Equals(userIdFromClamsInJwt) && x.VideoId == id))
            {
                isLiked = true;
                System.Console.WriteLine("User has liked");
            }
            var video = context.Videos.FirstOrDefault(x => x.Id == id);
            var channelUser = context.ApplicationUsers.FirstOrDefault(x => x.Id.Equals(video.UserId));
            VideoModel m = new VideoModel();
            m.Video = video;
            m.IsLiked = isLiked;
            m.Likes = context.Likes.Where(x => x.VideoId == id).Count();
            m.ChannelName = channelUser.UserName;
            m.ChannelId =  channelUser.Id;
            m.Views = ViewCount(id);
            m.SubscribersCount = context.Subscriptions.Where(x=>x.ChannelId.Equals(channelUser.Id)).Count();
            m.IsSubscribed = context.Subscriptions.Any(x=>x.UserId.Equals(userIdFromClamsInJwt) && x.ChannelId.Equals(channelUser.Id));
            return Json(m);
        }
        [HttpPut]
        public int ViewCount(int videoId)
        {
            var views = 0;
            if (!context.ViewCounts.Any(x => x.VideoId == videoId))
            {
                var view = new ViewCount() { VideoId = videoId, View = 1 };
                context.ViewCounts.Add(view);
                views = 1;
            }
            else
            {
                var vid = context.ViewCounts.FirstOrDefault(x => x.VideoId == videoId);
                vid.View++;
                context.ViewCounts.Update(vid);
                views = vid.View;
            }
            context.SaveChanges();
            return views;
        }
        [Route("like")]
        [HttpGet]
        [Authorize]
        public IActionResult Like(int videoId)
        {
            System.Console.WriteLine("LIKE");
            string message;
            var userIdFromClamsInJwt = User.FindFirst("uid")?.Value;
            var likes = context.Likes.FirstOrDefault(x => x.UserId.Equals(userIdFromClamsInJwt) && x.VideoId == videoId);
            if (likes != null)
            {
                context.Likes.Remove(likes);
                message = "removed from liked videos";
            }
            else
            {
                context.Likes.Add(new Like() { UserId = userIdFromClamsInJwt, VideoId = videoId });
                message = "added to liked vides";
            }
            context.SaveChanges();
            return Json(new { message = message });
        }
        [HttpGet]
        [Route("comments")]
        public IActionResult Comments(int videoId)
        {
            System.Console.WriteLine("Comment Fetched");
            var comments = context.Comments.Where(x => x.VideoId == videoId).Select(x => new
            {
                CommentId = x.Id,
                CommentDate = StringHelper.RelativeDate(x.CommentedOn),
                CommentText = x.CommentText,
                FirstName = context.ApplicationUsers.Where(u => u.Id.Equals(x.UserId)).FirstOrDefault().FirstName,
                LastName = context.ApplicationUsers.Where(u => u.Id.Equals(x.UserId)).FirstOrDefault().LastName,
            }).OrderByDescending(x => x.CommentId).ToList();
            return Json(comments);
        }
        [HttpPost]
        [Route("comment")]
        [Authorize]
        public IActionResult Comment(string text, int videoId)
        {
            var userIdFromClamsInJwt = User.FindFirst("uid")?.Value;
            context.Comments.Add(new Comment() { CommentText = text, VideoId = videoId, UserId = userIdFromClamsInJwt });
            context.SaveChanges();
            //Required Data
            var user = context.ApplicationUsers.FirstOrDefault(x => x.Id.Equals(userIdFromClamsInJwt));
            return Json(new { firstName = user.FirstName, lastName = user.LastName, commentText = text, commentDate = StringHelper.RelativeDate(DateTime.Now) });
        }
        [HttpGet()]
        [Route("similar")]
        public IActionResult SimilarVideos(int id)
        {
          return Json(videoService.GetVideosBy(x=>x.Id!=id).Take(5));
        }
         [HttpGet]
        [Route("search")]
        public IActionResult Search(string query)
        {
            System.Console.WriteLine(query);
          return Json(videoService.GetVideosBy(x=>x.Title.Contains(query)).Take(20));
        }
    }
}