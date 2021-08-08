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

namespace _NET_REACT.Controllers
{
    
    public class BaseController : Controller
    {
        private const long MaxFileSize = 10L * 1024L * 1024L * 1024L; // 10GB, adjust to your need

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
                // context.Videos.Add(v);
                // context.SaveChanges();
                //await SendFileSomewhere(fileStream);
                //return StatusCode(500);
                return Ok(new { message = "Video Uploaded Successfully" });
            }
            catch (Exception e)
            {
                return StatusCode(500, (new { message = e.ToString() }));
            }
        }
       
    }
}