using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace _NET_REACT.Models
{
    public class Like{
        public int Id { get; set; }
        public Video Video { get; set; }
        public int VideoId { get; set; }
        public string UserId { get; set; }
      
        
    }
    public class Comment
    {
        public int Id { get; set; }
        public Video Video { get; set; }
        public int VideoId { get; set; }
        public string UserId { get; set; }
        public string CommentText {get;set;}
        public DateTime CommentedOn  { get; set; } = DateTime.Now;
    }
}