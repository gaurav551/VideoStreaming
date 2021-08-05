using _NET_REACT.Models;
using JWT.DEMO.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JWT.DEMO.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }
        public DbSet<Video> Videos { get; set; }
        public DbSet<ViewCount> ViewCounts { get; set; }
         public DbSet<ApplicationUser> ApplicationUsers { get; set; }
         public DbSet<Like> Likes { get; set; }
         public DbSet<Comment> Comments { get; set; }
         public DbSet<Subscription> Subscriptions { get; set; }
    }
}