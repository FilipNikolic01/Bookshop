using BookshopServer.Entities.OrderAggregate;

namespace BookshopServer.Interfaces
{
    public interface IOrderService
    {
        Task<IReadOnlyList<Order>> GetOrdersAsync();
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string cartId,
            OrderAddress orderAddress);
        Task<Order> UpdateOrderAsync(Order order);
    }
}
