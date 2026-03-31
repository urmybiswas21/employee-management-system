using EmployeeManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Seed default admin
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "admin",
                // Hashing "admin123" using simple test method for initial setup, but ideally BCrypt
                // Here we just use BCrypt in the service layer, but for seeding we need a pre-hashed string
                // $2a$11$sR.yC6.a.YkQzB4S4GihUer5lZlH4B2/4kC.Q4B/hL.7Nq/D.v.m. (admin123)
                PasswordHash = "$2a$11$6R6zt8q.UMSzB5zbXd2IiO5B2OuW51iUq91pic0R3S5rInqAP5LZe",
                Role = "Admin"
            });
        }
    }
}
