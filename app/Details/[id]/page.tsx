"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FC, useState } from 'react';
import { BsArrowLeftCircleFill } from "react-icons/bs";

interface Staff {
  id: string;
  name: string;
  gender: string;
  date: string;
  time: string;
}

// Mock data
const initialStaffData: Staff[] = [
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

const StaffDetails: FC<Props> = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [staffData, setStaffData] = useState<Staff[]>(initialStaffData);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [formData, setFormData] = useState({ name: '', gender: '', date: '', time: '' });

  const staff = staffData.find(staff => staff.id === id) || null;

  if (!staff) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <header className="bg-gray-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Staff Details</h1>
            <Link
              href="/"
              className="text-blue-500 hover:underline flex items-center"
            >
              <BsArrowLeftCircleFill className="text-white text-3xl mr-2" />
            </Link>
          </div>
        </header>

        <main className="mt-8">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Staff not found</h2>
            <p>The staff member you are looking for does not exist.</p>
          </div>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${staff?.name}?`);
    if (confirmed && staff) {
      setStaffData(prevStaff => prevStaff.filter(s => s.id !== staff.id));
      router.push('/'); // Redirect to the home page after deletion
    }
  };

  const handleEdit = () => {
    setFormData({
      name: staff.name,
      gender: staff.gender,
      date: staff.date,
      time: staff.time,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffData(prevStaff =>
      prevStaff.map(s => (s.id === staff.id ? { ...s, ...formData } : s))
    );
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Staff Details</h1>
          <Link
            href="/"
            className="text-blue-500 hover:underline flex items-center"
          >
            <BsArrowLeftCircleFill className="text-white text-3xl mr-2" />
          </Link>
        </div>
      </header>

      <main className="mt-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{staff.name}</h2>
          <p><strong>Gender:</strong> {staff.gender}</p>
          <p><strong>Date:</strong> {staff.date}</p>
          <p><strong>Time:</strong> {staff.time}</p>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEdit}
              className="text-green-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </main>

      {/* Render the modal for editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Staff Details</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="time">Time</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDetails;
