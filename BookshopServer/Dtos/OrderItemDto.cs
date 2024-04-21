using BookshopServer.Entities.OrderAggregate;

namespace BookshopServer.Dtos
{
    public class OrderItemDto
    {
        public int BookId{ get; set; }
        public string BookTitle { get; set; }
        public string PictureURL { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
