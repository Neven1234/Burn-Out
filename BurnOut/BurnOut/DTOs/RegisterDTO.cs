namespace BurnOut.DTOs
{
    public class RegisterDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public long UserID { get; set; }
        public string? CarType { get; set; }// for racers
        public string userRole { get; set; }//Organizer 
        public string? License { get; set; }//if racer


    }
}
