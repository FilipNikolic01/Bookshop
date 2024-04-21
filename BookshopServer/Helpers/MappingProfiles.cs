using AutoMapper;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Entities.Identity;
using BookshopServer.Entities.OrderAggregate;

namespace BookshopServer.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, BookViewDto>()
                .ForMember(d => d.Publisher, o => o.MapFrom(s => s.Publisher.Name))
                .ForMember(d => d.Authors, o => o.MapFrom(s => s.BookAuthors.Select(x => x.Author.FullName).ToList()))
                .ForMember(d => d.Genres, o => o.MapFrom(s => s.BookGenres.Select(x => x.Genre.Name).ToList()));

            CreateMap<Author, AuthorDto>().ReverseMap();
            CreateMap<Genre, GenreDto>().ReverseMap();
            CreateMap<Publisher, PublisherDto>().ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<ShoppingCartDto, ShoppingCart>();
            CreateMap<CartItemDto, CartItem>();
            CreateMap<AddressDto, OrderAddress>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.BookId, o => o.MapFrom(s => s.BookOrdered.BookId))
                .ForMember(d => d.BookTitle, o => o.MapFrom(s => s.BookOrdered.BookTitle))
                .ForMember(d => d.PictureURL, o => o.MapFrom(s => s.BookOrdered.PictureURL));
        }
    }
}
