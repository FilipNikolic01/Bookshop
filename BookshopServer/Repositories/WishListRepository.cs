using BookshopServer.Entities;
using BookshopServer.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace BookshopServer.Repositories
{
    public class WishListRepository : IWishListRepository
    {
        private readonly IDatabase _database;

        public WishListRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteWishListAsync(string wishListId)
        {
            return await _database.KeyDeleteAsync(wishListId);
        }

        public async Task<WishList> GetWishListAsync(string wishListId)
        {
            var data = await _database.StringGetAsync(wishListId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<WishList>(data);
        }

        public async Task<WishList> UpdateWishListAsync(WishList wishList)
        {
            var created = await _database.StringSetAsync(wishList.Id, JsonSerializer.Serialize(wishList),
                TimeSpan.FromDays(30));

            if (!created)
                return null;

            return await GetWishListAsync(wishList.Id);
        }
    }
}
