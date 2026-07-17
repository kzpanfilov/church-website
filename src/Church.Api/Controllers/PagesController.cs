using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController : ControllerBase
{
    private readonly ContentService _svc;
    public PagesController(ContentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetPublished() =>
        Ok(await _svc.GetPublishedPagesAsync());

    [HttpGet("all")]
    public async Task<IActionResult> GetAll() =>
        Ok(await _svc.GetAllPagesAsync());

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var page = await _svc.GetPageBySlugAsync(slug);
        return page == null ? NotFound() : Ok(page);
    }

    [HttpGet("admin/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var page = await _svc.GetPageByIdAsync(id);
        return page == null ? NotFound() : Ok(page);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] Core.Models.Page page)
    {
        var result = await _svc.CreatePageAsync(page);
        return CreatedAtAction(nameof(GetBySlug), new { slug = result.Slug }, result);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] Core.Models.Page page)
    {
        var result = await _svc.UpdatePageAsync(id, page);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id) =>
        await _svc.DeletePageAsync(id) ? NoContent() : NotFound();
}
