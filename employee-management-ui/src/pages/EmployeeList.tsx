import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { employeeService } from '../services/employeeService';
import type { Employee } from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await employeeService.delete(id);
      fetchEmployees();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const openEditModal = (emp: Employee) => {
    setEditingId(emp.id);
    setFormData(emp);
    setFormError(null);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({});
    setFormError(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName?.trim() || !formData.email?.trim() || !formData.department?.trim() || formData.salary === undefined || formData.salary === null) {
      setFormError('First Name, Email, Department, and Salary are mandatory fields.');
      return;
    }

    setFormError(null);
    try {
      if (editingId) {
        await employeeService.update(editingId, { ...formData, id: editingId });
      } else {
        await employeeService.create(formData);
      }
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error('Save failed', error);
      alert('Failed to save employee.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'salary' ? Number(value) : value
    });
  };

  return (
    <>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>Employee Directory</h1>
          <p>Manage your organization's workforce.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} /> Add Employee
        </button>
      </div>

      <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Department</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Position</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>
                  Loading datasets...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      {emp.firstName} {emp.lastName}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        color: 'var(--primary)',
                        borderRadius: '99px',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{emp.position}</td>
                  <td style={{ padding: '1rem' }}>{emp.email}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => openEditModal(emp)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-start', // 🔥 key change
            justifyContent: 'center',
            zIndex: 50,
            paddingTop: '4rem' // 🔥 top spacing
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '1.5rem'
            }}
          >
            <h2 style={{ marginBottom: formError ? '1rem' : '1.5rem' }}>
              {editingId ? 'Edit Employee' : 'Add New Employee'}
            </h2>

            {formError && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', margin: '0 0 1rem 0', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                {formError}
              </div>
            )}

            <form
              onSubmit={handleSave}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}
            >
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">First Name</label>
                <input
                  required
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0, gridColumn: 'span 2' }}>
                <label className="form-label">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Department</label>
                <input
                  required
                  name="department"
                  value={formData.department || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Position</label>
                <select
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Select a position...</option>
                  <option value="Manager">Manager</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="HR Specialist">HR Specialist</option>
                  <option value="Sales Representative">Sales Representative</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Salary</label>
                <input
                  required
                  type="number"
                  name="salary"
                  value={formData.salary || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div
                style={{
                  gridColumn: 'span 2',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}
              >
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                  style={{ border: '1px solid #d1d5db' }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Save'} Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;