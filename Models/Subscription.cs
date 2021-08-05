using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace _NET_REACT.Models
{
    public class Subscription{
       public int Id { get; set; }
       public string ChannelId { get; set; }
       public string UserId { get; set; }
      
        
    }
}