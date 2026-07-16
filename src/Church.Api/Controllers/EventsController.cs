using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly ContentService _svc;
    public EventsController(ContentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetUpcoming([FromQuery] int count = 10) =>
        Ok(await _svc.GetUpcomingEventsAsync(count));

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
    public async Task<IActionResult> Create([FromBody] Core.Models.Event evt)
    {
        var result = await _svc.CreateEventAsync(evt);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) =>
        await _svc.DeleteEventAsync(id) ? NoContent() : NotFound();
}
