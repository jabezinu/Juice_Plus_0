import { create } from 'zustand'
import axios from 'axios'
import useAuthStore from './authStore'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
      const { token } = useAuthStore.getState();
      const res = await axios.get(`${BACKEND_URL}/employees/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
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
      const { token } = useAuthStore.getState();
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value)
      })
      if (editId) {
        await axios.put(`${BACKEND_URL}/employees/${editId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        })
      } else {
        await axios.post(`${BACKEND_URL}/employees/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
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
      const { token } = useAuthStore.getState();
      await axios.delete(`${BACKEND_URL}/employees/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      fetchEmployees()
    } catch {
      alert('Failed to delete employee')
    } finally {
      set({ actionLoading: false })
    }
  },
}))
