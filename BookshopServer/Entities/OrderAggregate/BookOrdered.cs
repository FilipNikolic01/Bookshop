namespace BookshopServer.Entities.OrderAggregate
{
    public class BookOrdered
    {
        public BookOrdered() 
        {

        }

        public BookOrdered(int bookId, string bookTitle, string pictureURL)
        {
            BookId = bookId;
            BookTitle = bookTitle;
            PictureURL = pictureURL;
        }

        public int BookId { get; set; }
        public string BookTitle { get; set; }
        public string PictureURL { get; set; }
    }
}
