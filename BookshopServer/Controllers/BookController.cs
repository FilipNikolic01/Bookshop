using AutoMapper;
using BookshopServer.Data.Static;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Errors;
using BookshopServer.Helpers;
using BookshopServer.Interfaces;
using BookshopServer.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("/api/books")]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BookController(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [Cached(600)]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Pagination<BookViewDto>>> GetBooks(
            [FromQuery] BookSpecificationParams bookParams)
        {
            var spec = new BooksWithAuthorsGenresAndPublishersSpecification(bookParams);
            var countSpec = new BooksWithFiltersForCountSpecification(bookParams);

            var totalItems = await _bookRepository.CountAsync(countSpec);
            var books = await _bookRepository.GetAsync(spec);

            var data = _mapper.Map<IReadOnlyList<BookViewDto>>(books);

            return Ok(new Pagination<BookViewDto>(bookParams.PageIndex, bookParams.PageSize,
                totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof (ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookViewDto>> GetBook(int id)
        {
            var spec = new BooksWithAuthorsGenresAndPublishersSpecification(id);

            var book = await _bookRepository.GetEntityWithSpecAsync(spec);

            if (book == null)
                return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Book, BookViewDto>(book));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(typeof (ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddBook(BookCreateDto book)
        {
            if(book == null)
                return BadRequest(new ApiResponse(400));

            if(!ModelState.IsValid) 
                return BadRequest(new ApiResponse(400));

            await _bookRepository.AddBookAsync(book);

            return Created();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateBook(int id, BookCreateDto book)
        {
            if (book == null)
                return BadRequest(new ApiResponse(400));

            if (id != book.Id) 
                return BadRequest(new ApiResponse(400));

            if(!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            await _bookRepository.UpdateBookAsync(book);

            return NoContent();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof (ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteBook(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            var book = await _bookRepository.GetByIdAsync(id);

            if(book == null)
                return NotFound(new ApiResponse(404));

            await _bookRepository.DeleteAsync(book);

            return NoContent();
        }
    }
}
