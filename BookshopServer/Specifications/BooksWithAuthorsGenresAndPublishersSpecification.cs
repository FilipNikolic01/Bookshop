using BookshopServer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BookshopServer.Specifications
{
    public class BooksWithAuthorsGenresAndPublishersSpecification : BaseSpecification<Book>
    {
        public BooksWithAuthorsGenresAndPublishersSpecification(BookSpecificationParams bookParams)
            : base(x =>
                (string.IsNullOrEmpty(bookParams.Search) || x.Title.ToLower().Contains(bookParams.Search)) &&
                (!bookParams.GenreId.HasValue || x.BookGenres.Select(x => x.Genre.Id).ToList().Contains((int) bookParams.GenreId)) &&
                (!bookParams.AuthorId.HasValue || x.BookAuthors.Select(x => x.Author.Id).ToList().Contains((int) bookParams.AuthorId))
            )
        {
            AddInclude(x => x.Include(p => p.Publisher));
            AddInclude(x => x.Include(ba => ba.BookAuthors).ThenInclude(a => a.Author));
            AddInclude(x => x.Include(bg => bg.BookGenres).ThenInclude(g => g.Genre));
            AddOrderBy(x => x.Title);
            ApplyPaging(bookParams.PageSize * (bookParams.PageIndex - 1), bookParams.PageSize);

            if(!string.IsNullOrEmpty(bookParams.Sort))
            {
                switch(bookParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Title);
                        break;
                }
            }
        }

        public BooksWithAuthorsGenresAndPublishersSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Include(p => p.Publisher));
            AddInclude(x => x.Include(ba => ba.BookAuthors).ThenInclude(a => a.Author));
            AddInclude(x => x.Include(bg => bg.BookGenres).ThenInclude(g => g.Genre));
        }
    }
}
