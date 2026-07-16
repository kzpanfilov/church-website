using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Church.Core.DTOs;
using Church.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Church.Infrastructure.Services;

public class AuthService
{
    private readonly ChurchDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(ChurchDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _db.AdminUsers.FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive);
        if (user == null) return null;

        var hash = ComputeHash(request.Password);
        if (user.PasswordHash != hash) return null;

        user.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var token = GenerateJwtToken(user);
        return new LoginResponse(token, user.Username, user.DisplayName);
    }

    private string GenerateJwtToken(Core.Models.AdminUser user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _config["Jwt:Key"] ?? "ChurchWebsite_SuperSecretKey_2024!@#$%^&*()_+"));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"] ?? "ChurchWebsite",
            audience: _config["Jwt:Audience"] ?? "ChurchWebsite",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string ComputeHash(string password)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + "church_salt_2024"));
        return Convert.ToBase64String(bytes);
    }
}
