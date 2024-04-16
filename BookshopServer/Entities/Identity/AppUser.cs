using Microsoft.AspNetCore.Identity;

namespace BookshopServer.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address? Address { get; set; }
    }
}
