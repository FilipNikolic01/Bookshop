using BookshopServer.Entities;
using BookshopServer.Entities.OrderAggregate;
using BookshopServer.Errors;
using BookshopServer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("/api/payment")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private const string WhSecret = "whsec_7106574543444aecd1cab33c93774b20390a30e839dd57660230553324329052";
        private readonly ILogger _logger;

        public PaymentController(IPaymentService paymentService, ILogger<IPaymentService> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
        }

        [Authorize]
        [HttpPost("{cartId}")]
        public async Task<ActionResult<ShoppingCart>> CreateOrUpdatePaymentIntent(string cartId)
        {
            var shoppingCart = await _paymentService.CreateOrUpdatePaymentIntent(cartId);

            if (shoppingCart == null)
                return BadRequest(new ApiResponse(400, "Problemi sa korpom"));

            return shoppingCart;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                WhSecret);

            PaymentIntent paymentIntent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    paymentIntent = (PaymentIntent) stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded: ", paymentIntent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceeded(paymentIntent.Id);
                    _logger.LogInformation("Order Updated to payment received: ", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    paymentIntent = (PaymentIntent) stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Failed: ", paymentIntent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(paymentIntent.Id);
                    _logger.LogInformation("Order Updated to payment failed: ", order.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}
