using BookshopServer.Entities;
using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class CartItemDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string BookTitle { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Cena mora biti veća od 0")]
        public decimal Price { get; set; }

        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Broj stavki mora biti bar 1")]
        public int Quantity { get; set; }

        [Required]
        public string PictureURL { get; set; }

        [Required]
        public string Publisher { get; set; }

        [Required]
        public ICollection<string> Author { get; set; }
    }
}
