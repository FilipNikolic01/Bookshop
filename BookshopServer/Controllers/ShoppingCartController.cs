using AutoMapper;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Errors;
using BookshopServer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Book> _bookRepository;

        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository, IMapper mapper,
            IGenericRepository<Book> genericRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _mapper = mapper;
            _bookRepository = genericRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCartById(string cartId)
        {
            var cart = await _shoppingCartRepository.GetShoppingCartAsync(cartId);

            return Ok(cart ?? new ShoppingCart(cartId));
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateShoppingCart(ShoppingCartDto cart)
        {
            var shoppingCart = _mapper.Map<ShoppingCartDto, ShoppingCart>(cart);

            foreach(var item in shoppingCart.Items)
            {
                var book = await _bookRepository.GetByIdAsync(item.Id);

                var availableQuantity = book.QuantityInStock;

                if (item.Quantity > availableQuantity)
                    return BadRequest(new ApiResponse(400, "Željena količina nije dostupna"));
            }

            var updatedCart = await _shoppingCartRepository.UpdateShoppingCartAsync(shoppingCart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteShoppingCart(string cartId)
        {
            await _shoppingCartRepository.DeleteShoppingCartAsync(cartId);
        }
    }
}
