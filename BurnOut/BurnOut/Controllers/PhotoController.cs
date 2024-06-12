using BurnOut.DTOs;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BurnOut.Helper;
using Microsoft.Extensions.Options;
using BurnOut.Models;
using Microsoft.AspNetCore.Authorization;

namespace BurnOut.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinaryConfi;
        private Cloudinary _Cloudinary;
        public PhotoController(IOptions<CloudinarySettings> CloudinaryConfi)
        {
            _cloudinaryConfi = CloudinaryConfi;
            Account account = new Account(
              _cloudinaryConfi.Value.CloudName,
              _cloudinaryConfi.Value.ApiKey,
              _cloudinaryConfi.Value.ApiSecret
               );
            _Cloudinary = new Cloudinary(account);
        }
        [HttpPost]
        public async Task<IActionResult> UploadPhoto([FromForm] Photo photo)
        {
            if (photo.File == null || photo.File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var role = User.FindFirstValue("Role");
            if (role != "Organizer")
            {
                return Unauthorized();
            }
            var file = photo.File;
            var UploadResolt = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stram = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stram),
                    };
                    UploadResolt = _Cloudinary.Upload(uploadParams);

                }
            }
            photo.PhotoUrl = UploadResolt.Url.ToString();
            photo.PublicId = UploadResolt.PublicId;


            return Ok(photo);
        }
        [HttpDelete("{photoPublicId}")]
        public async Task<IActionResult> DeletePhoto(string photoPublicId)
        {
            var deletePramas = new DeletionParams(photoPublicId);
            var result = _Cloudinary.Destroy(deletePramas);
            if (result.Result == "ok")
            {
                return Ok();
            }
            else
            {
                return BadRequest("failed to delete the photo");
            }
        }

    }
}
