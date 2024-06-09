using BookshopServer.Entities;
using BookshopServer.Entities.OrderAggregate;

namespace BookshopServer.Interfaces
{
    public interface IPaymentService
    {
        Task<ShoppingCart> CreateOrUpdatePaymentIntent(string shoppingCartId);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}
