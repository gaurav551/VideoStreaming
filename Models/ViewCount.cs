using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace _NET_REACT.Models
{
    public class ViewCount{
        public int Id { get; set; }
        public Video Video { get; set; }
        public int VideoId { get; set; }
        public int View { get; set; }
      
        
    }
}