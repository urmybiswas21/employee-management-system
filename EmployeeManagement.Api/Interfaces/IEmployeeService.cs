using EmployeeManagement.Api.Models;

namespace EmployeeManagement.Api.Interfaces
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee> AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(int id, Employee employee);
        Task DeleteEmployeeAsync(int id);
        Task AddBulkEmployeesAsync(List<Employee> employees);
        Task DeleteBulkEmployeesAsync(List<int> ids);
    }
}
