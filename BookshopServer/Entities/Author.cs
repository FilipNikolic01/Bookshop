using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Entities
{
    public class Author : BaseEntity
    {
        [Display(Name = "Profilna slika autora")]
        [Required(ErrorMessage = "Profilna slika autora je obavezna")]
        public string ProfilePictureURL { get; set; }

        [Display(Name = "Ime i prezime autora")]
        [Required(ErrorMessage = "Ime i prezime autora je obavezno")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Ime i prezime autora mora imati između 3 i 50 slova")]
        public string FullName { get; set; }

        [Display(Name = "Biografija autora")]
        [Required(ErrorMessage = "Biografija autora je obavezna")]
        public string Biography { get; set; }

        //Relationships
        public ICollection<BookAuthor>? BookAuthors { get; set; }
    }
}
