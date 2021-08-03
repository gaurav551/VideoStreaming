using System;
namespace _NET_REACT.Models.VideModels
{
    public class VideoModel
    {
        public Video Video { get; set; }
        public int Views { get; set; }
        public bool IsLiked { get; set; }
        public int Likes { get; set; }
        public string ChannelName { get; set; }
        public string ChannelImage { get; set; }
    }
}