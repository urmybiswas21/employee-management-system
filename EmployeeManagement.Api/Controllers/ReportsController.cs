using EmployeeManagement.Api.Data;
using EmployeeManagement.Api.Interfaces;
using EmployeeManagement.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IReportService _reportService;

        public ReportsController(ApplicationDbContext context, IReportService reportService)
        {
            _context = context;
            _reportService = reportService;
        }

        [HttpGet("employees/pdf")]
        public async Task<IActionResult> DownloadEmployeePdf()
        {
            var employees = await _context.Employees.ToListAsync();
            var pdfBytes = _reportService.GenerateEmployeePdf(employees);
            
            return File(pdfBytes, "application/pdf", $"EmployeeDirectory_{DateTime.Now:yyyyMMdd}.pdf");
        }

        [HttpGet("employees/excel")]
        public async Task<IActionResult> DownloadEmployeeExcel()
        {
            var employees = await _context.Employees.ToListAsync();
            var excelBytes = _reportService.GenerateEmployeeExcel(employees);
            
            return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"EmployeeData_{DateTime.Now:yyyyMMdd}.xlsx");
        }
    }
}
