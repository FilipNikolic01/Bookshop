using BookshopServer.Entities;

namespace BookshopServer.Specifications
{
    public class BooksWithFiltersForCountSpecification : BaseSpecification<Book>
    {
        public BooksWithFiltersForCountSpecification(BookSpecificationParams bookParams)
            : base(x =>
                (string.IsNullOrEmpty(bookParams.Search) || x.Title.ToLower().Contains(bookParams.Search)) &&
                (!bookParams.GenreId.HasValue || x.BookGenres.Select(x => x.Genre.Id).ToList().Contains((int) bookParams.GenreId)) &&
                (!bookParams.AuthorId.HasValue || x.BookAuthors.Select(x => x.Author.Id).ToList().Contains((int) bookParams.AuthorId))
            )
        {

        }
    }
}
