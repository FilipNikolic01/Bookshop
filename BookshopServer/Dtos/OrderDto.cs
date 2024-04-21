namespace BookshopServer.Dtos
{
    public class OrderDto
    {
        public string ShoppingCartId { get; set; }
        public int DeliveryMethodId { get; set; }
        public AddressDto OrderAddress { get; set; } 
    }
}
