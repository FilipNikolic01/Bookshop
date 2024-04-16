using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class LoginDto
    {
        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email je obavezan!")]
        public string Email { get; set; }

        [Display(Name = "Lozinka")]
        [Required(ErrorMessage = "Lozinka je obavezna!")]
        public string Password { get; set; }
    }
}
