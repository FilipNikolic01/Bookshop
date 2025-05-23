﻿namespace BookshopServer.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null) 
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        public string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "You have made a bad request",
                401 => "You are not authorized",
                403 => "You do not have permission",
                404 => "Resource was not found",
                500 => "Server error",
                _ => ""
            };
        }
    }
}
