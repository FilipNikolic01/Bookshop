using BookshopServer.Data.Enums;
using BookshopServer.Entities;
using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class BookCreateDto
    {
        public int Id { get; set; }

        [Display(Name = "ISBN knjige")]
        [Required(ErrorMessage = "ISBN knjige je obavezan")]
        [StringLength(17, MinimumLength = 17, ErrorMessage = "ISBN mora sadržati 17 karaktera")]
        public string ISBN { get; set; }

        [Display(Name = "Naslov knjige")]
        [Required(ErrorMessage = "Naslov knjige je obavezan")]
        [StringLength(30, ErrorMessage = "Naslov knjige ne sme imati više od 30 karaktera")]
        public string Title { get; set; }

        [Display(Name = "Opis knjige")]
        [Required(ErrorMessage = "Opis knjige je obavezan")]
        public string Description { get; set; }

        [Display(Name = "Slika knjige")]
        [Required(ErrorMessage = "Slika knjige je obavezna")]
        public string PictureURL { get; set; }

        [Display(Name = "Povez knjige")]
        [Required(ErrorMessage = "Povez knjige je obavezan")]
        public Edition Edition { get; set; }

        [Display(Name = "Datum izdavanja")]
        [Required(ErrorMessage = "Datum izdavanja je obavezan")]
        public DateTime PublicationDate { get; set; }

        [Display(Name = "Pismo/Jezik")]
        [Required(ErrorMessage = "Pismo/Jezik je obavezno")]
        [StringLength(20, ErrorMessage = "Pimso/Jezik ne sme imati više od 20 karaktera")]
        public string Language { get; set; }

        [Display(Name = "Format knjige")]
        [Required(ErrorMessage = "Format knjige je obavezan")]
        [StringLength(10, ErrorMessage = "Format knjige ne sme imati više od 10 karaktera")]
        public string Format { get; set; }

        [Display(Name = "Broj stranica")]
        [Required(ErrorMessage = "Broj stranica je obavezan")]
        public int Pages { get; set; }

        [Display(Name = "Cena knjige")]
        [Required(ErrorMessage = "Cena knjige je obavezna")]
        public decimal Price { get; set; }

        [Display(Name = "Stanje na zalihama")]
        [Required(ErrorMessage = "Stanje na zalihama je obavezno polje")]
        public int QuantityInStock { get; set; }

        //Relationships

        [Display(Name = "Izdavač")]
        [Required(ErrorMessage = "Izdavač je obavezan!")]
        public int PublisherId { get; set; }

        [Display(Name = "Pisac")]
        [Required(ErrorMessage = "Pisac je obavezan!")]
        public ICollection<int>? AuthorIds { get; set; }

        [Display(Name = "Žanr")]
        [Required(ErrorMessage = "Žanr je obavezan!")]
        public ICollection<int>? GenreIds { get; set; }
    }
}
