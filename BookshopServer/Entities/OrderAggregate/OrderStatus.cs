using System.Runtime.Serialization;

namespace BookshopServer.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "U obradi")]
        Pending,

        [EnumMember(Value = "Uplata primljena")]
        PaymentRecieved,

        [EnumMember(Value = "Neuspešna uplata")]
        PaymentFailed
    }
}
