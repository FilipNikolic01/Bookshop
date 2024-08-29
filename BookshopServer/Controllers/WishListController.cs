using AutoMapper;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("api/wishlist")]
    public class WishListController : ControllerBase
    {
        private readonly IWishListRepository _wishListRepository;
        private readonly IMapper _mapper;

        public WishListController(IWishListRepository wishListRepository, IMapper mapper, 
            IGenericRepository<Book> bookRepository)
        {
            _wishListRepository = wishListRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<WishList>> GetWishListAsync(string wishListId)
        {
            var wishList = await _wishListRepository.GetWishListAsync(wishListId);

            return Ok(wishList ?? new WishList(wishListId));
        }

        [HttpPost]
        public async Task<ActionResult<WishList>> UpdateWishList(WishListDto wishListDto)
        {
            var wishList = _mapper.Map<WishListDto, WishList>(wishListDto);

            var updatedWishList = await _wishListRepository.UpdateWishListAsync(wishList);

            return Ok(updatedWishList);
        }

        [HttpDelete]
        public async Task DeleteWishList(string wishListId)
        {
            await _wishListRepository.DeleteWishListAsync(wishListId);
        }
    }
}
