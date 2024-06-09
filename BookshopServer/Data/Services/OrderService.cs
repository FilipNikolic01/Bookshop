using BookshopServer.Entities;
using BookshopServer.Entities.OrderAggregate;
using BookshopServer.Interfaces;
using BookshopServer.Specifications;

namespace BookshopServer.Data.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepository;
        private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepository;
        private readonly IGenericRepository<Book> _bookRepository;
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IPaymentService _paymentService;

        public OrderService(IGenericRepository<Order> orderRepository, IGenericRepository<DeliveryMethod>
            deliveryMethodRepository, IGenericRepository<Book> bookRepository,
            IShoppingCartRepository shoppingCartRepository, IPaymentService paymentService)
        {
            _orderRepository = orderRepository;
            _deliveryMethodRepository = deliveryMethodRepository;
            _bookRepository = bookRepository;
            _shoppingCartRepository = shoppingCartRepository;
            _paymentService = paymentService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string cartId, OrderAddress orderAddress)
        {
            var cart = await _shoppingCartRepository.GetShoppingCartAsync(cartId);

            var orderItems = new List<OrderItem>();
            foreach (var item in cart.Items)
            {
                var book = await _bookRepository.GetByIdAsync(item.Id);
                var bookOrdered = new BookOrdered(book.Id, book.Title, book.PictureURL);
                var orderItem = new OrderItem(bookOrdered, book.Price, item.Quantity);
                orderItems.Add(orderItem);
            }

            var deliveryMethod = await _deliveryMethodRepository.GetByIdAsync(deliveryMethodId);

            var subtotal = orderItems.Sum(orderItem => orderItem.Price * orderItem.Quantity);

            var spec = new OrderByPaymentIntentIdSpecification(cart.PaymentIntentId);
            var existingOrder = await _orderRepository.GetEntityWithSpecAsync(spec);

            if (existingOrder != null)
            {
                await _orderRepository.DeleteAsync(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(cartId);
            }

            var order = new Order(orderItems, buyerEmail, orderAddress, deliveryMethod, subtotal,
                cart.PaymentIntentId);

            await _orderRepository.AddAsync(order);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _deliveryMethodRepository.GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id);

            return await _orderRepository.GetEntityWithSpecAsync(spec);
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _orderRepository.GetEntityWithSpecAsync(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _orderRepository.GetAsync(spec);
        }

        public Task<IReadOnlyList<Order>> GetOrdersAsync()
        {
            var spec = new OrdersWithItemsAndOrderingSpecification();

            return _orderRepository.GetAsync(spec);
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            await _orderRepository.UpdateAsync(order);

            return order;
        }
    }
}
