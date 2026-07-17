using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnnouncementsController : ControllerBase
{
    private readonly ContentService _svc;
    public AnnouncementsController(ContentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetActive() =>
        Ok(await _svc.GetActiveAnnouncementsAsync());

    [HttpGet("all")]
    public async Task<IActionResult> GetAll() =>
        Ok(await _svc.GetAllAnnouncementsAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ann = await _svc.GetAnnouncementByIdAsync(id);
        return ann == null ? NotFound() : Ok(ann);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] Core.Models.Announcement ann)
    {
        var result = await _svc.CreateAnnouncementAsync(ann);
        return CreatedAtAction(nameof(GetActive), result);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] Core.Models.Announcement ann)
    {
        var result = await _svc.UpdateAnnouncementAsync(id, ann);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id) =>
        await _svc.DeleteAnnouncementAsync(id) ? NoContent() : NotFound();
}
