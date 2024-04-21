using BookshopServer.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace BookshopServer.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification()
        {
            AddInclude(o => o.Include(x => x.OrderItems));
            AddInclude(o => o.Include(x => x.DeliveryMethod));
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(string buyerEmail) : base(o => o.BuyerEmail == buyerEmail)
        {
            AddInclude(o => o.Include(x => x.OrderItems));
            AddInclude(o => o.Include(x => x.DeliveryMethod));
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(int id, string buyerEmail) : base(o => o.Id == id
            && o.BuyerEmail == buyerEmail)
        {
            AddInclude(o => o.Include(x => x.OrderItems));
            AddInclude(o => o.Include(x => x.DeliveryMethod));
        }

        public OrdersWithItemsAndOrderingSpecification(int id) : base(o => o.Id == id)
        {
            AddInclude(o => o.Include(x => x.OrderItems));
            AddInclude(o => o.Include(x => x.DeliveryMethod));
        }
    }
}
