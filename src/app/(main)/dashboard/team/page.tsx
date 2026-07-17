// src/app/(dashboard)/dashboard/team/page.tsx
'use client'

import { useAuth } from '@/src/context/AuthContext'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Developer', email: 'john@company.com' },
  { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@company.com' },
  { id: 3, name: 'Bob Johnson', role: 'Manager', email: 'bob@company.com' },
]

export default function TeamPage() {
  const { isAdmin } = useAuth()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Management</h1>
        {isAdmin && (
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <FaPlus />
            Add Member
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-blue-600 hover:text-blue-700 mr-3">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isAdmin && (
        <p className="text-sm text-gray-500 mt-4">
          You have view-only access. Contact an admin for management permissions.
        </p>
      )}
    </div>
  )
}