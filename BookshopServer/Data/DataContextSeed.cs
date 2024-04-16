using BookshopServer.Data.Static;
using BookshopServer.Entities;
using BookshopServer.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace BookshopServer.Data
{
    public class DataContextSeed 
    {
        public static async Task SeedAsync(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            { 
                var loggerFactory = scope.ServiceProvider.GetService<ILoggerFactory>();
                using var context = scope.ServiceProvider.GetRequiredService<DataContext>();

                try
                {
                    if (!context.Genres.Any())
                    {
                        var genresData = File.ReadAllText("D:/Users/filip/Bookshop/BookshopServer/Data/SeedData/genre.json");

                        var genres = JsonSerializer.Deserialize<List<Genre>>(genresData);

                        foreach (var item in genres)
                        {
                            context.Genres.Add(item);
                        }

                        await context.SaveChangesAsync();
                    }

                    if (!context.Authors.Any())
                    {
                        var authorsData = File.ReadAllText("D:/Users/filip/Bookshop/BookshopServer/Data/SeedData/author.json");

                        var authors = JsonSerializer.Deserialize<List<Author>>(authorsData);

                        foreach (var author in authors)
                        {
                            context.Authors.Add(author);
                        }

                        await context.SaveChangesAsync();
                    }

                    if (!context.Publishers.Any())
                    {
                        var publishersData = File.ReadAllText("D:/Users/filip/Bookshop/BookshopServer/Data/SeedData/publisher.json");

                        var publishers = JsonSerializer.Deserialize<List<Publisher>>(publishersData);

                        foreach (var publisher in publishers)
                        {
                            context.Publishers.Add(publisher);
                        }

                        await context.SaveChangesAsync();
                    }

                    if (!context.Books.Any())
                    {
                        var booksData = File.ReadAllText("D:/Users/filip/Bookshop/BookshopServer/Data/SeedData/book.json");

                        var books = JsonSerializer.Deserialize<List<Book>>(booksData);

                        foreach (var book in books)
                        {
                            context.Books.Add(book);
                        }

                        await context.SaveChangesAsync();
                    }

                    if (!context.BookAuthors.Any())
                    {
                        var bookAuthorsData = File.ReadAllText("D:/Users/filip/Bookshop/BookshopServer/Data/SeedData/book_author.json");

                        var bookAuthors = JsonSerializer.Deserialize<List<BookAuthor>>(bookAuthorsData);

                        foreach(var bookAuthor in bookAuthors)
                        {
                            context.BookAuthors.Add(bookAuthor);
                        }

                        await context.SaveChangesAsync();
                    }

                    if (!context.BookGenres.Any())
                    {
                        var bookGenresData = File.ReadAllText("D:/Users/filip/Bookshop/BookshopServer/Data/SeedData/book_genre.json");

                        var bookGenres = JsonSerializer.Deserialize<List<BookGenre>>(bookGenresData);

                        foreach(var bookGenre in bookGenres) 
                        { 
                            context.BookGenres.Add(bookGenre);
                        }

                        await context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    var logger = loggerFactory.CreateLogger<DataContextSeed>();
                    logger.LogError(ex.Message);
                }
            }

        }

    }
}
