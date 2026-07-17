using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly ContentService _svc;
    public EventsController(ContentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetSchedule([FromQuery] int count = 50) =>
        Ok(await _svc.GetScheduleEventsAsync(count));

    [HttpGet("all")]
    public async Task<IActionResult> GetAll() =>
        Ok(await _svc.GetAllEventsAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var evt = await _svc.GetEventByIdAsync(id);
        return evt == null ? NotFound() : Ok(evt);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] Core.Models.Event evt)
    {
        var result = await _svc.CreateEventAsync(evt);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] Core.Models.Event evt)
    {
        var result = await _svc.UpdateEventAsync(id, evt);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id) =>
        await _svc.DeleteEventAsync(id) ? NoContent() : NotFound();
}
