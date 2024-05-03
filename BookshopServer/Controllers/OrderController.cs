using AutoMapper;
using BookshopServer.Data.Static;
using BookshopServer.Dtos;
using BookshopServer.Entities.OrderAggregate;
using BookshopServer.Errors;
using BookshopServer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookshopServer.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var orders = await _orderService.GetOrdersForUserAsync(email);

            if (userRole == UserRoles.Admin)
                orders = await _orderService.GetOrdersAsync();

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if (userRole == UserRoles.Admin) 
                order = await _orderService.GetOrderByIdAsync(id);

            if (order == null)
                return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var orderAddress = _mapper.Map<AddressDto, OrderAddress>(orderDto.OrderAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId,
                orderDto.ShoppingCartId, orderAddress);

            if (order == null)
                return BadRequest(new ApiResponse(400, "Problem creating an order"));

            return Ok(order);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPatch("{id}")]
        public async Task<ActionResult<Order>> UpdateOrder(int id, UpdateOrderStatusDto updateOrderStatusDto)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order == null) 
                return NotFound(new ApiResponse(404));

            order.Status = updateOrderStatusDto.Status;

            await _orderService.UpdateOrderAsync(order);

            return Ok(order);
        }
    }
}
