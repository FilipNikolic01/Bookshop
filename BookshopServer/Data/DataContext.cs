using BookshopServer.Entities;
using BookshopServer.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

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
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

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

            modelBuilder.Entity<Order>()
                .OwnsOne(o => o.OrderAddress, oa => { oa.WithOwner(); });

            modelBuilder.Entity<Order>()
                .Property(s => s.Status)
                .HasConversion(o => o.ToString(), o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o));

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .OwnsOne(oi => oi.BookOrdered, bo => { bo.WithOwner(); });

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<DeliveryMethod>()
                .Property(dm => dm.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .Property(o => o.Subtotal)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Book>()
                .Property(b => b.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<OrderItem>()
                .ToTable(oi => oi.HasTrigger("QuantityTrigger"));
        }
    }
}
