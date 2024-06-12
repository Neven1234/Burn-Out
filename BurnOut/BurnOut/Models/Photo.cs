namespace BurnOut.Models
{
    public class Photo
    {
        public string?PhotoUrl { get; set; }
        public string? PublicId { get; set; }
        public IFormFile? File { get; set; }
    }
}
