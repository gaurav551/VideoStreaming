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
        public string ChannelId { get; set; } // Required For Subscription
        public string ChannelImage { get; set; }
        public int SubscribersCount { get; set; }
        public bool IsSubscribed { get; set; }
    }
}