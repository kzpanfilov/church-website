using Church.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private readonly ContentService _svc;
    public GalleryController(ContentService svc) => _svc = svc;

    [HttpGet("photos")]
    public async Task<IActionResult> GetPhotos([FromQuery] string? category) =>
        Ok(await _svc.GetPhotosAsync(category));

    [HttpGet("photos/{id}")]
    public async Task<IActionResult> GetPhoto(int id)
    {
        var photo = await _svc.GetPhotoByIdAsync(id);
        return photo == null ? NotFound() : Ok(photo);
    }

    [HttpPost("photos")]
    public async Task<IActionResult> CreatePhoto([FromBody] Core.Models.Photo photo)
    {
        var result = await _svc.CreatePhotoAsync(photo);
        return CreatedAtAction(nameof(GetPhoto), new { id = result.Id }, result);
    }

    [HttpDelete("photos/{id}")]
    public async Task<IActionResult> DeletePhoto(int id) =>
        await _svc.DeletePhotoAsync(id) ? NoContent() : NotFound();

    [HttpGet("videos")]
    public async Task<IActionResult> GetVideos([FromQuery] string? category) =>
        Ok(await _svc.GetVideosAsync(category));

    [HttpGet("videos/{id}")]
    public async Task<IActionResult> GetVideo(int id)
    {
        var video = await _svc.GetVideoByIdAsync(id);
        return video == null ? NotFound() : Ok(video);
    }

    [HttpPost("videos")]
    public async Task<IActionResult> CreateVideo([FromBody] Core.Models.Video video)
    {
        var result = await _svc.CreateVideoAsync(video);
        return CreatedAtAction(nameof(GetVideo), new { id = result.Id }, result);
    }

    [HttpDelete("videos/{id}")]
    public async Task<IActionResult> DeleteVideo(int id) =>
        await _svc.DeleteVideoAsync(id) ? NoContent() : NotFound();
}
