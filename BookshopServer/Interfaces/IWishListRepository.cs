using BookshopServer.Entities;

namespace BookshopServer.Interfaces
{
    public interface IWishListRepository
    {
        Task<WishList> GetWishListAsync(string wishListId);
        Task<WishList> UpdateWishListAsync(WishList wishList);
        Task<bool> DeleteWishListAsync(string wishListId);
    }
}
