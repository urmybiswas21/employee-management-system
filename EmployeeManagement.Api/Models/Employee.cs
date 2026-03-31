using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Api.Models
{
    public class Employee
    {
        public int Id { get; set; }
        [Required]
        public required string FirstName { get; set; }
        
        public string? LastName { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        public string? Phone { get; set; }
        [Required]
        public required string Department { get; set; }
        public string? Position { get; set; }
        public decimal? Salary { get; set; }
        public int AttendanceDays { get; set; } = 0;
        public DateTime? DateOfJoining { get; set; } = DateTime.UtcNow;
    }
}
