namespace BookshopServer.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
            
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, OrderAddress orderAddress,
            DeliveryMethod deliveryMethod, decimal subtotal, string paymentIntentId) 
        {
            OrderItems = orderItems;
            BuyerEmail = buyerEmail;
            OrderAddress = orderAddress;
            DeliveryMethod = deliveryMethod;
            Subtotal = subtotal;
            PaymentIntentId = paymentIntentId;
        }

        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public OrderAddress OrderAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set;}
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string? PaymentIntentId { get; set; }

        public decimal GetTotal() => Subtotal + DeliveryMethod.Price;
    }
}
