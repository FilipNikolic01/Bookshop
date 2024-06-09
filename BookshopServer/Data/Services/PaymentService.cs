using BookshopServer.Entities;
using BookshopServer.Entities.OrderAggregate;
using BookshopServer.Interfaces;
using BookshopServer.Specifications;
using Stripe;

namespace BookshopServer.Data.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepository;
        private readonly IGenericRepository<Book> _bookRepository;
        private readonly IGenericRepository<Order> _orderRepository;
        private readonly IConfiguration _configuration;

        public PaymentService(IShoppingCartRepository shoppingCartRepository,
            IGenericRepository<DeliveryMethod> deliveryMethodRepository,
            IGenericRepository<Book> bookRepository,
            IGenericRepository<Order> orderRepository,
            IConfiguration configuration)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _deliveryMethodRepository = deliveryMethodRepository;
            _bookRepository = bookRepository;
            _orderRepository = orderRepository;
            _configuration = configuration;
        }

        public async Task<ShoppingCart> CreateOrUpdatePaymentIntent(string shoppingCartId)
        {
            StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

            var shoppingCart = await _shoppingCartRepository.GetShoppingCartAsync(shoppingCartId);

            if (shoppingCart == null)
                return null;

            var shippingPrice = 0m;

            if (shoppingCart.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _deliveryMethodRepository.GetByIdAsync(shoppingCart.DeliveryMethodId.Value);
                shippingPrice = deliveryMethod.Price;
            }

            foreach (var item in shoppingCart.Items)
            {
                var book = await _bookRepository.GetByIdAsync(item.Id);

                if (item.Price != book.Price)
                    item.Price = book.Price;
            }

            var service = new PaymentIntentService();

            PaymentIntent intent;

            if (string.IsNullOrEmpty(shoppingCart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long) shoppingCart.Items.Sum(x => x.Quantity * (x.Price * 100)) 
                    + (long) shippingPrice * 100,
                    Currency = "rsd",
                    PaymentMethodTypes = new List<string> { "card" }
                };

                intent = await service.CreateAsync(options);
                shoppingCart.PaymentIntentId = intent.Id;
                shoppingCart.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)shoppingCart.Items.Sum(x => x.Quantity * (x.Price * 100))
                    + (long)shippingPrice * 100,
                };

                await service.UpdateAsync(shoppingCart.PaymentIntentId, options);
            }

            await _shoppingCartRepository.UpdateShoppingCartAsync(shoppingCart);

            return shoppingCart;
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _orderRepository.GetEntityWithSpecAsync(spec);

            if (order == null)
                return null;

            order.Status = OrderStatus.PaymentFailed;
            await _orderRepository.UpdateAsync(order);

            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _orderRepository.GetEntityWithSpecAsync(spec);

            if (order == null)
                return null;

            order.Status = OrderStatus.PaymentRecieved;
            await _orderRepository.UpdateAsync(order);

            return order;
        }
    }
}
