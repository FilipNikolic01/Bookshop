using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Entities
{
    public class Genre : BaseEntity
    {
        [Display(Name = "Naziv žanra")]
        [Required(ErrorMessage = "Naziv žanra je obavezan")]
        [StringLength(30, ErrorMessage = "Naziv žanra ne sme sadržati više od 30 slova")]
        public string Name { get; set; }

        [Display(Name = "Opis žanra")]
        [Required(ErrorMessage = "Opis žanra je obavezan")]
        public string Description { get; set; }

        //Relationships
        public ICollection<BookGenre>? BookGenres { get; set; }
    }
}
