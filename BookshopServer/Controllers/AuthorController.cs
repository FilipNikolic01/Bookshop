using AutoMapper;
using BookshopServer.Data.Static;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Errors;
using BookshopServer.Helpers;
using BookshopServer.Interfaces;
using BookshopServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("/api/authors")]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorController(IAuthorRepository repository, IMapper mapper)
        {
            _authorRepository = repository;
            _mapper = mapper;
        }

        [Cached(600)]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IReadOnlyList<AuthorDto>>> GetAuthors()
        {
            var authors = await _authorRepository.GetAllAsync();

            return Ok(_mapper.Map<IReadOnlyList<Author>, IReadOnlyList<AuthorDto>>(authors));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof (ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthorDto>> GetAuthor(int id)
        {
            var author = await _authorRepository.GetByIdAsync(id);

            if(author == null)
                return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Author, AuthorDto>(author)); 
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof (ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddAuthor(AuthorDto author)
        {
            if (author == null)
                return BadRequest(new ApiResponse(400));

            if(!ModelState.IsValid) 
                return BadRequest(new ApiResponse(400));

            await _authorRepository.AddAsync(_mapper.Map<AuthorDto, Author>(author));

            return Created(); 
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateAuthor(int id, AuthorDto author)
        {
            if (author == null)
                return BadRequest(new ApiResponse(400));

            if (id != author.Id)
                return BadRequest(new ApiResponse(400));

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            await _authorRepository.UpdateAsync(_mapper.Map<AuthorDto, Author>(author));

            return NoContent();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAuthor(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            var author = await _authorRepository.GetByIdAsync(id);

            if (author == null)
                return NotFound(new ApiResponse(404));

            await _authorRepository.DeleteAsync(author);

            return NoContent();
        }
    }
}
