using BookshopServer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookshopServer.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<Author> Authors { get; set; }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<Publisher> Publishers { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<BookAuthor> BookAuthors { get; set; }

        public DbSet<BookGenre> BookGenres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookAuthor>()
                .HasKey(ba => new { ba.BookId, ba.AuthorId });

            modelBuilder.Entity<BookAuthor>()
                .HasOne(b => b.Book)
                .WithMany(ba => ba.BookAuthors)
                .HasForeignKey(b => b.BookId);

            modelBuilder.Entity<BookAuthor>()
                .HasOne(a => a.Author)
                .WithMany(ba => ba.BookAuthors)
                .HasForeignKey(a  => a.AuthorId);

            modelBuilder.Entity<BookGenre>()
                .HasKey(bg => new {bg.BookId, bg.GenreId });

            modelBuilder.Entity<BookGenre>()
                .HasOne(b => b.Book)
                .WithMany(bg => bg.BookGenres)
                .HasForeignKey(b => b.BookId);

            modelBuilder.Entity<BookGenre>()
                .HasOne(g => g.Genre)
                .WithMany(bg => bg.BookGenres)
                .HasForeignKey(g => g.GenreId);
        }
    }
}
