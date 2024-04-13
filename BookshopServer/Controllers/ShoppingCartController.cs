using BookshopServer.Entities;
using BookshopServer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;

        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCartById(string cartId)
        {
            var cart = await _shoppingCartRepository.GetShoppingCartAsync(cartId);

            return Ok(cart ?? new ShoppingCart(cartId));
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateShoppingCart(ShoppingCart cart)
        {
            var updatedCart = await _shoppingCartRepository.UpdateShoppingCartAsync(cart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteShoppingCart(string cartId)
        {
            await _shoppingCartRepository.DeleteShoppingCartAsync(cartId);
        }
    }
}
