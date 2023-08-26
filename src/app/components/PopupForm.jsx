import React from 'react'

const PopupForm = ({handleSubmit, handleInputChange, isPopupOpen, closePopup, isEditMode, formData}) => {
  return (
    <>
     {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Note' : 'Add Note'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    type="text"
                    rows="4" cols="50"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    required
                  />
                </div>
                <label htmlFor="color" className="block text-sm font-medium">
                  Color
                </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="mt-1 block"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
                  >
                    {isEditMode ? 'Save' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="ml-2 px-4 py-2 border rounded-md border-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}
    </>
  )
}

export default PopupForm