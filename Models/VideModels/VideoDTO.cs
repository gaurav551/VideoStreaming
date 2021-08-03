using System;
namespace _NET_REACT.Models.VideModels
{
    public class VideoDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
      
        public int Views { get; set; }
        public string VideoName { get; set; }
       
        public string ChannelName { get; set; }
        public string UploadDate { get; set; }
    }
}