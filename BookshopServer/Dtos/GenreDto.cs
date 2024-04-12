using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class GenreDto
    {
        public int Id { get; set; }

        [Display(Name = "Naziv žanra")]
        [Required(ErrorMessage = "Naziv žanra je obavezan")]
        [StringLength(30, ErrorMessage = "Naziv žanra ne sme sadržati više od 30 slova")]
        public string Name { get; set; }

        [Display(Name = "Opis žanra")]
        [Required(ErrorMessage = "Opis žanra je obavezan")]
        public string Description { get; set; }
    }
}
