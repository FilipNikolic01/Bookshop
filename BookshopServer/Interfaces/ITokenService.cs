using BookshopServer.Entities.Identity;

namespace BookshopServer.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateTokenAsync(AppUser user);
    }
}
