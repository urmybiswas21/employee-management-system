using EmployeeManagement.Api.Models;

namespace EmployeeManagement.Api.Interfaces
{
    public interface IReportService
    {
        byte[] GenerateEmployeePdf(IEnumerable<Employee> employees);
        byte[] GenerateEmployeeExcel(IEnumerable<Employee> employees);
    }
}
