using EmployeeManagement.Api.Models;

namespace EmployeeManagement.Api.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee> AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(int id);
        Task AddBulkEmployeesAsync(IEnumerable<Employee> employees);
        Task DeleteBulkEmployeesAsync(IEnumerable<int> ids);
        Task<bool> EmployeeExistsAsync(int id);
    }
}
