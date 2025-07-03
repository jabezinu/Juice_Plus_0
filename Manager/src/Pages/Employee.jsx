import React, { useEffect, useState } from 'react'
import axios from 'axios'

const initialForm = {
  name: '',
  phone: '',
  position: 'waiter',
  salary: '',
  description: '',
  workingHour: '',
  tableAssigned: '',
  status: 'active', // Added default status
}

const Employee = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [showFired, setShowFired] = useState(false)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:5001/api/employees/')
      setEmployees(res.data)
      setError(null)
    } catch {
      setError('Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const openCreate = () => {
    setForm(initialForm)
    setEditId(null)
    setShowForm(true)
  }

  const openEdit = emp => {
    setForm({
      name: emp.name || '',
      phone: emp.phone || '',
      position: emp.position || 'waiter',
      salary: emp.salary || '',
      description: emp.description || '',
      workingHour: emp.workingHour || '',
      tableAssigned: emp.tableAssigned || '',
      status: emp.status || 'active', // Set status when editing
    })
    setEditId(emp._id)
    setShowForm(true)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setActionLoading(true)
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
      setActionLoading(false)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this employee?')) return
    setActionLoading(true)
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`)
      fetchEmployees()
    } catch {
      alert('Failed to delete employee')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={openCreate}
      >
        + Add Employee
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          {/* Active/Resigned Employees */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Employees</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {employees.filter(emp => emp.status !== 'fired').map(emp => (
                <div key={emp._id} className="bg-white shadow rounded p-4 flex flex-col items-center">
                  {emp.image && <img src={emp.image} alt={emp.name} className="w-24 h-24 rounded-full object-cover mb-2" />}
                  <div className="font-bold text-lg">{emp.name}</div>
                  <div className="text-gray-600">{emp.position}</div>
                  <div className="text-gray-500 text-sm">{emp.phone}</div>
                  <div className="text-xs mt-1">Status: {emp.status}</div>
                  <div className="text-xs">Salary: ${emp.salary}</div>
                  <div className="text-xs">Hired: {emp.dateHired ? new Date(emp.dateHired).toLocaleDateString() : ''}</div>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      onClick={() => openEdit(emp)}
                      disabled={actionLoading}
                    >Edit</button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(emp._id)}
                      disabled={actionLoading}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Fired Employees Section */}
          {employees.some(emp => emp.status === 'fired') && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-red-600">Fired Employees</h2>
                <button
                  className="text-sm px-2 py-1 border rounded bg-white hover:bg-gray-100"
                  onClick={() => setShowFired(v => !v)}
                  type="button"
                >
                  {showFired ? 'Hide' : 'Show'}
                </button>
              </div>
              {showFired && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {employees.filter(emp => emp.status === 'fired').map(emp => (
                    <div key={emp._id} className="bg-gray-100 shadow rounded p-4 flex flex-col items-center opacity-80">
                      {emp.image && <img src={emp.image} alt={emp.name} className="w-24 h-24 rounded-full object-cover mb-2 grayscale" />}
                      <div className="font-bold text-lg line-through">{emp.name}</div>
                      <div className="text-gray-600">{emp.position}</div>
                      <div className="text-gray-500 text-sm">{emp.phone}</div>
                      <div className="text-xs mt-1 text-red-600">Status: {emp.status}</div>
                      <div className="text-xs">Salary: ${emp.salary}</div>
                      <div className="text-xs">Hired: {emp.dateHired ? new Date(emp.dateHired).toLocaleDateString() : ''}</div>
                      <div className="flex gap-2 mt-3">
                        <button
                          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                          onClick={() => openEdit(emp)}
                          disabled={actionLoading}
                        >Edit</button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDelete(emp._id)}
                          disabled={actionLoading}
                        >Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-md w-full max-w-md relative overflow-y-auto max-h-[90vh] sm:max-h-[80vh] sm:w-[90vw] md:w-[500px]"
            style={{ maxHeight: '90vh', width: '90vw', maxWidth: 500 }}
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowForm(false)}
              disabled={actionLoading}
            >✕</button>
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Employee</h2>
            <div className="mb-2">
              <label className="block mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleInput} required className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleInput} required className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Position</label>
              <select name="position" value={form.position} onChange={handleInput} className="w-full border px-2 py-1 rounded">
                <option value="waiter">Waiter</option>
                <option value="cashier">Cashier</option>
                <option value="manager">Manager</option>
                <option value="baresta">Baresta</option>
                <option value="chaf">Chaf</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Salary</label>
              <input name="salary" value={form.salary} onChange={handleInput} type="number" min="0" required className="w-full border px-2 py-1 rounded" />
            </div>
            {form.position === 'waiter' && (
              <div className="mb-2">
                <label className="block mb-1">Table Assigned</label>
                <input name="tableAssigned" value={form.tableAssigned} onChange={handleInput} className="w-full border px-2 py-1 rounded" />
              </div>
            )}
            <div className="mb-2">
              <label className="block mb-1">Description</label>
              <input name="description" value={form.description} onChange={handleInput} className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Working Hour</label>
              <input name="workingHour" value={form.workingHour} onChange={handleInput} className="w-full border px-2 py-1 rounded" />
            </div>
            {/* Status dropdown only when editing */}
            {editId && (
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleInput} className="w-full border px-2 py-1 rounded">
                  <option value="active">Active</option>
                  <option value="fired">Fired</option>
                  <option value="resigned">Resigned</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={actionLoading}
            >{actionLoading ? 'Saving...' : (editId ? 'Update' : 'Create')}</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Employee
