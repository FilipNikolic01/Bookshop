using BookshopServer.Entities.OrderAggregate;

namespace BookshopServer.Dtos
{
    public class UpdateOrderStatusDto
    {
        public OrderStatus Status { get; set; }
    }
}
