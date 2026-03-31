using ClosedXML.Excel;
using EmployeeManagement.Api.Interfaces;
using EmployeeManagement.Api.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace EmployeeManagement.Api.Services
{
    public class ReportService : IReportService
    {
        public ReportService()
        {
            // Configure QuestPDF license to Community
            QuestPDF.Settings.License = LicenseType.Community;
        }

        public byte[] GenerateEmployeePdf(IEnumerable<Employee> employees)
        {
            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(10));

                    page.Header().Element(ComposeHeader);
                    page.Content().Element(x => ComposeContent(x, employees));
                    page.Footer().Element(ComposeFooter);
                });
            });

            return document.GeneratePdf();
        }

        private void ComposeHeader(IContainer container)
        {
            container.Row(row =>
            {
                row.RelativeItem().Column(column =>
                {
                    column.Item().Text("Employee Directory Report").FontSize(20).SemiBold().FontColor(Colors.Blue.Darken2);
                    column.Item().Text($"Generated on: {DateTime.Now:g}");
                });
            });
        }

        private void ComposeContent(IContainer container, IEnumerable<Employee> employees)
        {
            container.PaddingVertical(1, Unit.Centimetre).Column(column =>
            {
                column.Spacing(5);
                column.Item().Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                    });

                    table.Header(header =>
                    {
                        header.Cell().Element(CellStyle).Text("Name");
                        header.Cell().Element(CellStyle).Text("Department");
                        header.Cell().Element(CellStyle).Text("Position");
                        header.Cell().Element(CellStyle).Text("Salary");

                        static IContainer CellStyle(IContainer container)
                        {
                            return container.DefaultTextStyle(x => x.SemiBold()).PaddingVertical(5).BorderBottom(1).BorderColor(Colors.Black);
                        }
                    });

                    foreach (var emp in employees)
                    {
                        table.Cell().Element(CellStyle).Text($"{emp.FirstName} {emp.LastName}");
                        table.Cell().Element(CellStyle).Text(emp.Department);
                        table.Cell().Element(CellStyle).Text(emp.Position);
                        table.Cell().Element(CellStyle).Text($"${emp.Salary:F2}");

                        static IContainer CellStyle(IContainer container)
                        {
                            return container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);
                        }
                    }
                });
            });
        }

        private void ComposeFooter(IContainer container)
        {
            container.AlignCenter().Text(x =>
            {
                x.Span("Page ");
                x.CurrentPageNumber();
                x.Span(" of ");
                x.TotalPages();
            });
        }

        public byte[] GenerateEmployeeExcel(IEnumerable<Employee> employees)
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Employees");

            // Add Headers
            worksheet.Cell(1, 1).Value = "ID";
            worksheet.Cell(1, 2).Value = "First Name";
            worksheet.Cell(1, 3).Value = "Last Name";
            worksheet.Cell(1, 4).Value = "Email";
            worksheet.Cell(1, 5).Value = "Department";
            worksheet.Cell(1, 6).Value = "Position";
            worksheet.Cell(1, 7).Value = "Salary";
            worksheet.Cell(1, 8).Value = "Attendance Days";
            worksheet.Cell(1, 9).Value = "Date Of Joining";

            // Format Headers
            var headerRange = worksheet.Range(1, 1, 1, 9);
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.BackgroundColor = XLColor.AirForceBlue;
            headerRange.Style.Font.FontColor = XLColor.White;

            // Add Data
            int row = 2;
            foreach (var emp in employees)
            {
                worksheet.Cell(row, 1).Value = emp.Id;
                worksheet.Cell(row, 2).Value = emp.FirstName;
                worksheet.Cell(row, 3).Value = emp.LastName;
                worksheet.Cell(row, 4).Value = emp.Email;
                worksheet.Cell(row, 5).Value = emp.Department;
                worksheet.Cell(row, 6).Value = emp.Position;
                worksheet.Cell(row, 7).Value = emp.Salary;
                worksheet.Cell(row, 8).Value = emp.AttendanceDays;
                worksheet.Cell(row, 9).Value = emp.DateOfJoining?.ToString("yyyy-MM-dd");
                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            return stream.ToArray();
        }
    }
}
