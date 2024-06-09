using BookshopServer.Entities.OrderAggregate;

namespace BookshopServer.Specifications
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) : 
            base(o => o.PaymentIntentId == paymentIntentId)
        {
            
        }
    }
}
