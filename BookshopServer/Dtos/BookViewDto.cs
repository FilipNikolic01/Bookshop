using BookshopServer.Data.Enums;
using BookshopServer.Entities;
using System.ComponentModel.DataAnnotations;

namespace BookshopServer.Dtos
{
    public class BookViewDto
    {
        public int Id { get; set; }

        public string ISBN { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string PictureURL { get; set; }

        public Edition Edition { get; set; }

        public DateOnly PublicationDate { get; set; }

        public string Language { get; set; }

        public string Format { get; set; }

        public int Pages { get; set; }

        public decimal Price { get; set; }

        public int QuantityInStock { get; set; }

        public PublisherForBookDto Publisher { get; set; }

        public ICollection<AuthorForBookDto> Authors { get; set; }

        public ICollection<GenreForBookDto> Genres { get; set; }
    }
}
