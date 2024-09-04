"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Staff {
  id: string;
  name: string;
  gender: string;
  date: string;
  time: string;
}

// Mock data (you might want to replace this with actual data fetching logic)
const staffData: Staff[] = [
  { id: '1', name: 'Joel Alabi', gender: 'M', date: '2024-08-30', time: '09:00 AM' },
  { id: '2', name: 'Samad Aliu', gender: 'M', date: '2024-08-29', time: '10:30 AM' },
  { id: '3', name: 'Marvelous Banabas', gender: 'F', date: '2024-08-28', time: '11:45 AM' },
  { id: '4', name: 'Terfar Desmond', gender: 'M', date: '2024-08-27', time: '01:00 PM' },
  { id: '5', name: 'Ridwan Adeoti', gender: 'M', date: '2024-08-26', time: '02:15 PM' },
  { id: '6', name: 'Favour Oshuala', gender: 'F', date: '2024-08-25', time: '03:30 PM' },
  { id: '7', name: 'Victor Innocent', gender: 'M', date: '2024-08-24', time: '04:45 PM' }
];

interface Props {
  params: {
    id: string;
  };
}

const UpdateStaffPage: FC<Props> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const staff = staffData.find((staff) => staff.id === id);

  const [updatedStaff, setUpdatedStaff] = useState<Staff>(
    staff || { id: '', name: '', gender: 'M', date: '', time: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Here, you'd normally send updatedStaff to your API or backend for saving
    console.log('Updated Staff:', updatedStaff);

    // Redirect back to the details page or another page after saving
    router.push(`/practice/${id}`);
  };

  if (staff) {
    return <p>Staff member not found</p>;
  }
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Update Staff Details</h1>
        </div>
      </header>

      <main className="mt-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedStaff.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={updatedStaff.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={updatedStaff.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={updatedStaff.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push(`/practice/${id}`)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateStaffPage;
