import api from '../api/axios';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
}

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get('/employees');
    return response.data;
  },
  
  create: async (employee: Partial<Employee>): Promise<Employee> => {
    const response = await api.post('/employees', employee);
    return response.data;
  },
  
  update: async (id: number, employee: Partial<Employee>): Promise<void> => {
    await api.put(`/employees/${id}`, employee);
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  }
};
