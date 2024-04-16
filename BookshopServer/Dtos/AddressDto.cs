using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class AddressDto
    {
        [Display(Name = "Ime")]
        [Required(ErrorMessage = "Ime je obavezno!")]
        public string FirstName { get; set; }

        [Display(Name = "Prezime")]
        [Required(ErrorMessage = "Ime je obavezno")]
        public string LastName { get; set; }

        [Display(Name = "Ulica")]
        [Required(ErrorMessage = "Ulica je obavezna")]
        public string Street { get; set; }

        [Display(Name = "Grad")]
        [Required(ErrorMessage = "Grad je obavezan")]
        public string City { get; set; }

        [Display(Name = "Država")]
        [Required(ErrorMessage = "Država je obavezna")]
        public string State { get; set; }

        [Display(Name = "Poštanski broj")]
        [Required(ErrorMessage = "Poštanski broj je obavezan")]
        public string PostalCode { get; set; }
    }
}
