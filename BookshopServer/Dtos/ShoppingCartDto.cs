using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class ShoppingCartDto
    {
        [Required]
        public string Id { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
    }
}
