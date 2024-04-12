using System.Runtime.Serialization;

namespace BookshopServer.Data.Enums
{
    public enum Edition
    {
        [EnumMember(Value = "Mek")]
        Paperback,

        [EnumMember(Value = "Tvrd")]
        Hardcover,

        [EnumMember(Value = "Ilustrovano izdanje")]
        Illustrated
    }
}
