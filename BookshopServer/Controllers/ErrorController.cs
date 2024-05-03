using BookshopServer.Errors;
using Microsoft.AspNetCore.Mvc;

namespace BookshopServer.Controllers
{
    [Route("errors/{code}")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        protected ActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
