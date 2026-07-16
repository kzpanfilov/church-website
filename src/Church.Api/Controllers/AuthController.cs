using Church.Core.DTOs;
using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _auth;
    public AuthController(AuthService auth) => _auth = auth;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _auth.LoginAsync(request);
        return result == null ? Unauthorized("Invalid credentials") : Ok(result);
    }
}
