using BookshopServer.Data;
using BookshopServer.Entities;
using BookshopServer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookshopServer.Repositories
{
    public class PublisherRepository : GenericRepository<Publisher>, IPublisherRepository
    {
        public PublisherRepository(DataContext contex) : base(contex) { }
    }
}
