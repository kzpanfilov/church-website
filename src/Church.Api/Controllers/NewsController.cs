using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly ContentService _svc;
    public NewsController(ContentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetPublished([FromQuery] int count = 20) =>
        Ok(await _svc.GetPublishedNewsAsync(count));

    [HttpGet("all")]
    public async Task<IActionResult> GetAll() =>
        Ok(await _svc.GetAllNewsAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _svc.GetNewsByIdAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Core.Models.News news)
    {
        var result = await _svc.CreateNewsAsync(news);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Core.Models.News news)
    {
        var result = await _svc.UpdateNewsAsync(id, news);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) =>
        await _svc.DeleteNewsAsync(id) ? NoContent() : NotFound();
}
