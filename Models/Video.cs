using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace _NET_REACT.Models
{
    public class Video{
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime UploadedOn { get; set; } = DateTime.Now;
        
      
        public string VideoName { get; set; }
        public string UserId { get; set; }
        public string Tags { get; set; }
        public string Categories { get; set; } //Seperated BY Comma
        
    }
}