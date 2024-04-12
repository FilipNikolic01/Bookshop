using BookshopServer.Dtos;
using BookshopServer.Entities;

namespace BookshopServer.Interfaces
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        Task AddBookAsync (BookCreateDto bookCreateAndUpdateDto);

        Task UpdateBookAsync(BookCreateDto bookCreateAndUpdateDto);
    }
}
