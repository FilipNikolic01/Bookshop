using AutoMapper;
using BookshopServer.Data.Static;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Errors;
using BookshopServer.Interfaces;
using BookshopServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("/api/publishers")]
    public class PublisherController : ControllerBase
    {
        private readonly IPublisherRepository _publisherRepository;
        private readonly IMapper _mapper;
        public PublisherController(IPublisherRepository publisherRepository, IMapper mapper) 
        { 
            _publisherRepository = publisherRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IReadOnlyList<PublisherDto>>> GetPublishers()
        {
            var publishers = await _publisherRepository.GetAllAsync();

            return Ok(_mapper.Map<IReadOnlyList<Publisher>, IReadOnlyList<PublisherDto>>(publishers));  
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Publisher>> GetPublisher(int id)
        {
            var publisher = await _publisherRepository.GetByIdAsync(id);

            if (publisher == null)
                return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Publisher, PublisherDto>(publisher));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddPublisher(PublisherDto publisher)
        {
            if (publisher == null)
                return BadRequest(new ApiResponse(400));

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            await _publisherRepository.AddAsync(_mapper.Map<PublisherDto, Publisher>(publisher));

            return Created();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdatePublisher(int id, [FromBody] PublisherDto publisher)
        {
            if (publisher == null)
                return BadRequest(new ApiResponse(400));

            if (id != publisher.Id)
                return BadRequest(new ApiResponse(400));

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            await _publisherRepository.UpdateAsync(_mapper.Map<PublisherDto, Publisher>(publisher));

            return NoContent();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeletePublisher(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            var publisher = await _publisherRepository.GetByIdAsync(id);

            if (publisher == null)
                return NotFound(new ApiResponse(404));

            await _publisherRepository.DeleteAsync(publisher);

            return NoContent();
        }
    }
}
