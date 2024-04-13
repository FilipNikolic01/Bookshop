using BookshopServer.Entities;
using BookshopServer.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace BookshopServer.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly IDatabase _database;

        public ShoppingCartRepository(IConnectionMultiplexer redis) 
        { 
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteShoppingCartAsync(string shoppingCartId)
        {
            return await _database.KeyDeleteAsync(shoppingCartId);
        }

        public async Task<ShoppingCart> GetShoppingCartAsync(string shoppingCartId)
        {
            var data = await _database.StringGetAsync(shoppingCartId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<ShoppingCart>(data);
        }

        public async Task<ShoppingCart> UpdateShoppingCartAsync(ShoppingCart shoppingCart)
        {
            var created = await _database.StringSetAsync(shoppingCart.Id, 
                JsonSerializer.Serialize(shoppingCart), TimeSpan.FromDays(30));

            if (!created) 
                return null;

            return await GetShoppingCartAsync(shoppingCart.Id);
        }
    }
}
