namespace BookshopServer.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem() 
        { 

        }

        public OrderItem(BookOrdered bookOrdered, decimal price, int quantity)
        {
            BookOrdered = bookOrdered;
            Price = price;
            Quantity = quantity;
        }

        public BookOrdered BookOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
