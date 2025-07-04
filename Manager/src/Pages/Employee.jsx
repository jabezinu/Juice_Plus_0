import React, { useEffect } from 'react'
import { FaEdit as PencilIcon, FaTrash as TrashIcon } from 'react-icons/fa'
import { useEmployeeStore } from '../stores/employeeStore'

const Employee = () => {
  const {
    employees,
    loading,
    error,
    showForm,
    form,
    editId,
    actionLoading,
    showFired,
    setShowForm,
    setShowFired,
    setForm,
    setField,
    openCreate,
    openEdit,
    handleSubmit,
    handleDelete,
    fetchEmployees,
  } = useEmployeeStore()

  useEffect(() => {
    fetchEmployees()
    // eslint-disable-next-line
  }, [])

  const handleInput = e => {
    if (e.target.type === 'file') {
      setField(e.target.name, e.target.files[0])
    } else {
      setField(e.target.name, e.target.value)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Employees</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
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
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Current Employees</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {employees.filter(emp => emp.status !== 'fired').map(emp => (
                <div
                  key={emp._id}
                  className="relative bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center group hover:shadow-lg transition-shadow duration-200"
                >
                  {emp.image && (
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4 ring-2 ring-gray-200"
                    />
                  )}
                  <div className="text-lg sm:text-xl font-semibold text-gray-800">{emp.name}</div>
                  <div className="text-gray-600 text-sm sm:text-base">{emp.position}</div>
                  <div className="mt-4 text-xs sm:text-sm text-gray-700 space-y-1">
                    <div>Phone: {emp.phone}</div>
                    <div>
                      Status:{' '}
                      <span
                        className={
                          emp.status === 'active' ? 'text-green-600' : 'text-gray-600'
                        }
                      >
                        {emp.status}
                      </span>
                    </div>
                    <div>Salary: ${emp.salary}</div>
                    <div>
                      Hired:{' '}
                      {emp.dateHired ? new Date(emp.dateHired).toLocaleDateString() : ''}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      className="p-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500"
                      onClick={() => openEdit(emp)}
                      disabled={actionLoading}
                    >
                      <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      onClick={() => handleDelete(emp._id)}
                      disabled={actionLoading}
                    >
                      <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Fired Employees Section */}
          {employees.some(emp => emp.status === 'fired') && (
            <div className="mt-6 sm:mt-10">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-red-600">Fired Employees</h2>
                <button
                  className="text-xs sm:text-sm px-2 py-1 border rounded bg-white hover:bg-gray-100"
                  onClick={() => setShowFired(!showFired)}
                  type="button"
                >
                  {showFired ? 'Hide' : 'Show'}
                </button>
              </div>
              {showFired && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {employees.filter(emp => emp.status === 'fired').map(emp => (
                    <div
                      key={emp._id}
                      className="relative bg-gray-100 shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center group hover:shadow-lg transition-shadow duration-200 border-l-4 border-red-500 opacity-80"
                    >
                      {emp.image && (
                        <img
                          src={emp.image}
                          alt={emp.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4 ring-2 ring-gray-200 grayscale"
                        />
                      )}
                      <div className="text-lg sm:text-xl font-semibold text-gray-800 line-through">
                        {emp.name}
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base">{emp.position}</div>
                      <div className="mt-4 text-xs sm:text-sm text-gray-700 space-y-1">
                        <div>Phone: {emp.phone}</div>
                        <div>
                          Status: <span className="text-red-600">{emp.status}</span>
                        </div>
                        <div>Salary: ${emp.salary}</div>
                        <div>
                          Hired:{' '}
                          {emp.dateHired
                            ? new Date(emp.dateHired).toLocaleDateString()
                            : ''}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          className="p-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500"
                          onClick={() => openEdit(emp)}
                          disabled={actionLoading}
                        >
                          <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => handleDelete(emp._id)}
                          disabled={actionLoading}
                        >
                          <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4 sm:px-0">
          <form
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md relative overflow-y-auto max-h-[90vh]"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg"
              onClick={() => setShowForm(false)}
              disabled={actionLoading}
            >
              ✕
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Employee</h2>
            <div className="mb-2">
              <label className="block mb-1 text-sm sm:text-base">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInput}
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              />
              {(form.image && typeof form.image === 'object') && (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mt-2"
                />
              )}
              {(form.image && typeof form.image === 'string') && (
                <img
                  src={form.image}
                  alt="Current"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mt-2"
                />
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm sm:text-base">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInput}
                required
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm sm:text-base">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleInput}
                required
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm sm:text-base">Position</label>
              <select
                name="position"
                value={form.position}
                onChange={handleInput}
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              >
                <option value="waiter">Waiter</option>
                <option value="cashier">Cashier</option>
                <option value="manager">Manager</option>
                <option value="baresta">Baresta</option>
                <option value="chaf">Chaf</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm sm:text-base">Salary</label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleInput}
                type="number"
                min="0"
                required
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              />
            </div>
            {form.position === 'waiter' && (
              <div className="mb-2">
                <label className="block mb-1 text-sm sm:text-base">Table Assigned</label>
                <input
                  name="tableAssigned"
                  value={form.tableAssigned}
                  onChange={handleInput}
                  className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
                />
              </div>
            )}
            <div className="mb-2">
              <label className="block mb-1 text-sm sm:text-base">Description</label>
              <input
                name="description"
                value={form.description}
                onChange={handleInput}
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm sm:text-base">Working Hour</label>
              <input
                name="workingHour"
                value={form.workingHour}
                onChange={handleInput}
                className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
              />
            </div>
            {editId && (
              <div className="mb-4">
                <label className="block mb-1 text-sm sm:text-base">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleInput}
                  className="w-full border px-2 py-1 rounded text-xs sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="fired">Fired</option>
                  <option value="resigned">Resigned</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
              disabled={actionLoading}
            >
              {actionLoading ? 'Saving...' : editId ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Employee