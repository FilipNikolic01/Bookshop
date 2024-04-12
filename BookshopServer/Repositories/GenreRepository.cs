using BookshopServer.Data;
using BookshopServer.Entities;
using BookshopServer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookshopServer.Repositories
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        public GenreRepository(DataContext context) : base(context) { }
    }
}
