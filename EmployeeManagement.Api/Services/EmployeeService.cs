using EmployeeManagement.Api.Interfaces;
using EmployeeManagement.Api.Models;

namespace EmployeeManagement.Api.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _repository.GetAllEmployeesAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            return await _repository.GetEmployeeByIdAsync(id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            return await _repository.AddEmployeeAsync(employee);
        }

        public async Task UpdateEmployeeAsync(int id, Employee employee)
        {
            if (id != employee.Id)
                throw new ArgumentException("ID mismatch");

            if (!await _repository.EmployeeExistsAsync(id))
                throw new KeyNotFoundException("Employee not found");

            await _repository.UpdateEmployeeAsync(employee);
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            if (!await _repository.EmployeeExistsAsync(id))
                throw new KeyNotFoundException("Employee not found");

            await _repository.DeleteEmployeeAsync(id);
        }

        public async Task AddBulkEmployeesAsync(List<Employee> employees)
        {
            if (employees == null || !employees.Any())
                throw new ArgumentException("No employees provided.");

            await _repository.AddBulkEmployeesAsync(employees);
        }

        public async Task DeleteBulkEmployeesAsync(List<int> ids)
        {
            if (ids == null || !ids.Any())
                throw new ArgumentException("No IDs provided.");

            await _repository.DeleteBulkEmployeesAsync(ids);
        }
    }
}
