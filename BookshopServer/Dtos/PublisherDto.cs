using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class PublisherDto
    {
        public int Id { get; set; }

        [Display(Name = "Naziv izdavača")]
        [Required(ErrorMessage = "Naziv izdavača je obavezan")]
        [StringLength(50, ErrorMessage = "Naziv izdavača ne sme sadržati više od 50 slova")]
        public string Name { get; set; }

        [Display(Name = "Logo izdavača")]
        [Required(ErrorMessage = "Logo izdavača je obavezan")]
        public string LogoURL { get; set; }

        [Display(Name = "Opis izdavača")]
        [Required(ErrorMessage = "Opis izdavača  je obavezan")]
        public string Description { get; set; }
    }
}
