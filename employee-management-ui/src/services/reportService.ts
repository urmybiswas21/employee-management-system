import api from '../api/axios';

export const reportService = {
  downloadPdf: async () => {
    const response = await api.get('/reports/employees/pdf', { responseType: 'blob' });
    return response.data;
  },
  
  downloadExcel: async () => {
    const response = await api.get('/reports/employees/excel', { responseType: 'blob' });
    return response.data;
  }
};
