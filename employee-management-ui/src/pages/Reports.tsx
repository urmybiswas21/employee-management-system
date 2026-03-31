import { Download } from 'lucide-react';
import { reportService } from '../services/reportService';

const Reports = () => {
  const downloadReport = async (type: 'pdf' | 'excel') => {
    try {
      const data = type === 'pdf' ? await reportService.downloadPdf() : await reportService.downloadExcel();
      
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      
      const ext = type === 'pdf' ? 'pdf' : 'xlsx';
      link.setAttribute('download', `Employee_Directory_Report.${ext}`);
      
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Failed to download ${type} report`, error);
      alert('Failed to generate report. Please try again.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>HR Reports Center</h1>
        <p>Generate and export organization datasets in various formats.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* PDF Report Card */}
        <div className="glass hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }} onClick={() => downloadReport('pdf')}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
            <Download size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Employee Directory (PDF)</h3>
            <p style={{ fontSize: '0.875rem' }}>Clean, printable document showcasing essential facts about all active personnel.</p>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}>
             Download PDF
          </button>
        </div>

        {/* Excel Report Card */}
        <div className="glass hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }} onClick={() => downloadReport('excel')}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
            <Download size={24} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Employee Data Export (Excel)</h3>
            <p style={{ fontSize: '0.875rem' }}>Rich spreadsheet providing comprehensive metrics including Date of Joining, Salaries, and Attendance.</p>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start', backgroundColor: 'var(--secondary)', borderColor: 'var(--secondary)' }}>
             Download Excel
          </button>
        </div>

      </div>
    </div>
  );
};

export default Reports;
