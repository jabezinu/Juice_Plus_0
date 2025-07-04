import { create } from 'zustand'
import axios from 'axios'

const initialForm = {
  name: '',
  phone: '',
  position: 'waiter',
  salary: '',
  description: '',
  workingHour: '',
  tableAssigned: '',
  status: 'active',
}

export const useEmployeeStore = create((set, get) => ({
  employees: [],
  loading: false,
  error: null,
  actionLoading: false,
  form: initialForm,
  editId: null,
  showForm: false,
  showFired: false,
  setShowForm: (val) => set({ showForm: val }),
  setShowFired: (val) => set({ showFired: val }),
  setForm: (form) => set({ form }),
  setEditId: (id) => set({ editId: id }),
  setActionLoading: (val) => set({ actionLoading: val }),
  setField: (name, value) => set(state => ({ form: { ...state.form, [name]: value } })),
  resetForm: () => set({ form: initialForm, editId: null }),

  fetchEmployees: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('http://localhost:5001/api/employees/')
      set({ employees: res.data, error: null })
    } catch {
      set({ error: 'Failed to fetch employees' })
    } finally {
      set({ loading: false })
    }
  },

  openCreate: () => {
    set({ form: initialForm, editId: null, showForm: true })
  },

  openEdit: (emp) => {
    set({
      form: {
        name: emp.name || '',
        phone: emp.phone || '',
        position: emp.position || 'waiter',
        salary: emp.salary || '',
        description: emp.description || '',
        workingHour: emp.workingHour || '',
        tableAssigned: emp.tableAssigned || '',
        status: emp.status || 'active',
        image: emp.image || '',
      },
      editId: emp._id,
      showForm: true,
    })
  },

  handleSubmit: async (e) => {
    e.preventDefault()
    set({ actionLoading: true })
    const { form, editId, fetchEmployees, setShowForm } = get()
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value)
      })
      if (editId) {
        await axios.put(`http://localhost:5001/api/employees/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await axios.post('http://localhost:5001/api/employees/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      setShowForm(false)
      fetchEmployees()
    } catch {
      alert('Failed to save employee')
    } finally {
      set({ actionLoading: false })
    }
  },

  handleDelete: async (id) => {
    if (!window.confirm('Delete this employee?')) return
    set({ actionLoading: true })
    const { fetchEmployees } = get()
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`)
      fetchEmployees()
    } catch {
      alert('Failed to delete employee')
    } finally {
      set({ actionLoading: false })
    }
  },
}))
