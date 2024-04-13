using BookshopServer.Entities;

namespace BookshopServer.Interfaces
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart> GetShoppingCartAsync(string shoppingCartId);
        Task<ShoppingCart> UpdateShoppingCartAsync(ShoppingCart shoppingCart);
        Task<bool> DeleteShoppingCartAsync(string shoppingCartId);
    }
}
