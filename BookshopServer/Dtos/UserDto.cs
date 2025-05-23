﻿namespace BookshopServer.Dtos
{
    public class UserDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public ICollection<string> Role { get; set; }
    }
}
