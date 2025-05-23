﻿using AutoMapper;
using BookshopServer.Data.Static;
using BookshopServer.Dtos;
using BookshopServer.Entities;
using BookshopServer.Errors;
using BookshopServer.Helpers;
using BookshopServer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [ApiController]
    [Route("/api/genres")]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;
        private readonly IMapper _mapper;
        public GenreController(IGenreRepository genreRepository, IMapper mapper) 
        {
            _genreRepository = genreRepository;
            _mapper = mapper;
        }

        [Cached(600)]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IReadOnlyList<GenreDto>>> GetGenres()
        {
            var genres = await _genreRepository.GetAllAsync();

            return Ok(_mapper.Map<IReadOnlyList<Genre>, IReadOnlyList<GenreDto>>(genres));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof (ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GenreDto>> GetGenre(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);

            if (genre == null)
                return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Genre, GenreDto>(genre));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddGenre(GenreDto genre)
        {
            if (genre == null)
                return BadRequest(new ApiResponse(400));

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            await _genreRepository.AddAsync(_mapper.Map<GenreDto, Genre>(genre));

            return Created();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateGenre(int id, [FromBody] GenreDto genre)
        {
            if (genre == null)
                return BadRequest(new ApiResponse(400));

            if (id != genre.Id)
                return BadRequest(new ApiResponse(400));

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            await _genreRepository.UpdateAsync(_mapper.Map<GenreDto, Genre>(genre));

            return NoContent();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteGenre(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));

            var genre = await _genreRepository.GetByIdAsync(id);

            if (genre == null)
                return NotFound(new ApiResponse(404));

            await _genreRepository.DeleteAsync(genre);

            return NoContent();
        }
    }
}
