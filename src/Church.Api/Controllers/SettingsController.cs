using Church.Core.DTOs;
using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ContentService _svc;
    public SettingsController(ContentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetSettings([FromQuery] string? group) =>
        Ok(await _svc.GetSettingsAsync(group));

    [HttpGet("{key}")]
    public async Task<IActionResult> GetByKey(string key)
    {
        var setting = await _svc.GetSettingByKeyAsync(key);
        return setting == null ? NotFound() : Ok(setting);
    }

    [HttpPut("{key}")]
    public async Task<IActionResult> Update(string key, [FromBody] SiteSettingDto dto)
    {
        await _svc.UpdateSettingAsync(key, dto.Value);
        return Ok();
    }
}
