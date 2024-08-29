namespace BookshopServer.Entities
{
    public class WishList
    {
        public WishList()
        {
                
        }

        public WishList(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}
