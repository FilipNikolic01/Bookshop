using BookshopServer.Data;
using BookshopServer.Entities;
using BookshopServer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookshopServer.Repositories
{
    public class AuthorRepository : GenericRepository<Author> ,IAuthorRepository
    {
        public AuthorRepository(DataContext context) : base(context) { }
    }
}
