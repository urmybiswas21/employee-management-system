namespace EmployeeManagement.Api.DTOs
{
    public class LoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class AuthResponse
    {
        public required string Token { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }
    }
}
