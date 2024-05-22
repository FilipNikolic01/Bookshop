using BookshopServer.Data;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookshopServer.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        private readonly DataContext _context;
        public BookRepository(DataContext context) : base (context) 
        { 
            _context = context;
        }

        public async Task AddBookAsync(BookCreateDto bookCreateAndUpdateDto)
        {
            var newBook = new Book()
            {
                ISBN = bookCreateAndUpdateDto.ISBN,
                Title = bookCreateAndUpdateDto.Title,
                Description = bookCreateAndUpdateDto.Description,
                PictureURL = bookCreateAndUpdateDto.PictureURL,
                Edition = bookCreateAndUpdateDto.Edition,
                PublicationDate = DateOnly.FromDateTime(bookCreateAndUpdateDto.PublicationDate),
                Language = bookCreateAndUpdateDto.Language,
                Format = bookCreateAndUpdateDto.Format,
                Pages = bookCreateAndUpdateDto.Pages,
                Price = bookCreateAndUpdateDto.Price,
                QuantityInStock = bookCreateAndUpdateDto.QuantityInStock,
                PublisherId = bookCreateAndUpdateDto.PublisherId,
            };
            await _context.Books.AddAsync(newBook);
            await _context.SaveChangesAsync();

            foreach(var authorId in bookCreateAndUpdateDto.AuthorIds)
            {
                var newBookAuthor = new BookAuthor()
                {
                    BookId = newBook.Id,
                    AuthorId = authorId
                };
                await _context.BookAuthors.AddAsync(newBookAuthor);
            }
            await _context.SaveChangesAsync();

            foreach(var genreId in bookCreateAndUpdateDto.GenreIds)
            {
                var newBookGenre = new BookGenre()
                {
                    BookId = newBook.Id,
                    GenreId = genreId
                };
                await _context.BookGenres.AddAsync(newBookGenre);
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookAsync(BookCreateDto bookCreateAndUpdateDto)
        {
            var dbBook = await _context.Books.FirstOrDefaultAsync(n => n.Id == bookCreateAndUpdateDto.Id);

            if(dbBook != null)
            {
                dbBook.ISBN = bookCreateAndUpdateDto.ISBN;
                dbBook.Title = bookCreateAndUpdateDto.Title;
                dbBook.Description = bookCreateAndUpdateDto.Description;
                dbBook.PictureURL = bookCreateAndUpdateDto.PictureURL;
                dbBook.Edition = bookCreateAndUpdateDto.Edition;
                dbBook.PublicationDate = DateOnly.FromDateTime(bookCreateAndUpdateDto.PublicationDate);
                dbBook.Language = bookCreateAndUpdateDto.Language;
                dbBook.Format = bookCreateAndUpdateDto.Format;
                dbBook.Pages = bookCreateAndUpdateDto.Pages;
                dbBook.Price = bookCreateAndUpdateDto.Price;
                dbBook.QuantityInStock = bookCreateAndUpdateDto.QuantityInStock;
                dbBook.PublisherId = bookCreateAndUpdateDto.PublisherId;
                await _context.SaveChangesAsync();
            }

            var existingAuthors = await _context.BookAuthors.Where(n => n.BookId == bookCreateAndUpdateDto.Id).ToListAsync();
            _context.BookAuthors.RemoveRange(existingAuthors);
            await _context.SaveChangesAsync();

            var existingGenres = await _context.BookGenres.Where(n => n.BookId == bookCreateAndUpdateDto.Id).ToListAsync();
            _context.BookGenres.RemoveRange(existingGenres);
            await _context.SaveChangesAsync();

            foreach (var authorId in bookCreateAndUpdateDto.AuthorIds)
            {
                var newBookAuthor = new BookAuthor()
                {
                    BookId = bookCreateAndUpdateDto.Id,
                    AuthorId = authorId
                };
                await _context.BookAuthors.AddAsync(newBookAuthor);
            }
            await _context.SaveChangesAsync();

            foreach (var genreId in bookCreateAndUpdateDto.GenreIds)
            {
                var newBookGenre = new BookGenre()
                {
                    BookId = bookCreateAndUpdateDto.Id,
                    GenreId = genreId
                };
                await _context.BookGenres.AddAsync(newBookGenre);
            }
            await _context.SaveChangesAsync();
        }
    }
}
