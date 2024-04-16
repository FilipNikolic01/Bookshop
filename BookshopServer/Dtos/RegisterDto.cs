using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class RegisterDto
    {
        [Display(Name = "Ime")]
        [Required(ErrorMessage = "Ime je obavezno!")]
        public string DisplayName { get; set; }

        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email je obavezan!")]
        [EmailAddress]
        public string Email { get; set; }

        [Display(Name = "Lozinka")]
        [Required(ErrorMessage = "Lozinka je obavezna!")]
        [RegularExpression("(?=^.{6,32}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
            ErrorMessage = "Lozinka mora sadržati bar jedno malo slovo, jedno veliko slovo, jednu cifru, jedan specijalni simbol i minimum dužine 6")]
        public string Password { get; set; }
    }
}
