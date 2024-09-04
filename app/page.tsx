"use client"

import React, { useState } from 'react';
import Link from 'next/link';

interface StaffMember {
  name: string;
  gender: string;
  date: string;
  time: string;
}

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [newStaff, setNewStaff] = useState<StaffMember>({
    name: '',
    gender: 'M',
    date: '',
    time: '',
});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStaffList([...staffList, newStaff]);
    setNewStaff({
      name: '',
      gender: 'M',
      date: '',
      time: '',
    });
    toggleModal();
  };

  return (
    <>
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">STAFF MANAGEMENT DASHBOARD</h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <button
                  onClick={toggleModal}
                  className="hover:text-black hover:bg-gray-300 bg-white text-gray-800 rounded px-3.5 py-1.5"
                >
                  Add Staff
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col p-4">
          <header className="border-b border-gray-700 pb-4 mb-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </header>
          <nav className="flex-1">
            <ul className="space-y-14">
              <li>
                <a href="#" className="text-gray-200 text-3xl hover:text-white">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-200 text-3xl hover:text-white">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-200 text-3xl hover:text-white">Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-200 text-3xl hover:text-white">Contact</a>
              </li>
            </ul>
          </nav>
          <footer className="border-t border-gray-700 pt-4 mt-auto">
            <p className="text-sm">© 2024 Futca</p>
          </footer>
        </aside>

        <main className="flex-1 p-8 bg-gray-100">
          <h2 className="text-4xl font-semibold mb-4">Welcome to the Dashboard</h2>
          <p className="text-lg leading-relaxed">
            This is the main content area where you can add the core content of your page. The sidebar will stay in place as you navigate through different sections.
          </p>

          {/* Table starts here */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded my-6">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">STAFF'S NAME</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">GENDER</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">DATE</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">TIME</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Joel Alabi</td>
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">2024-08-30</td>
                  <td className="py-3 px-4">09:00 AM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Samad Aliu</td>
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">2024-08-29</td>
                  <td className="py-3 px-4">10:30 AM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Marvelous Banabas</td>
                  <td className="py-3 px-4">F</td>
                  <td className="py-3 px-4">2024-08-28</td>
                  <td className="py-3 px-4">11:45 AM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Terfar Desmond</td>
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">2024-08-27</td>
                  <td className="py-3 px-4">01:00 PM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Ridwan Adeoti</td>
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">2024-08-26</td>
                  <td className="py-3 px-4">02:15 PM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Favour Oshuala</td>
                  <td className="py-3 px-4">F</td>
                  <td className="py-3 px-4">2024-08-25</td>
                  <td className="py-3 px-4">03:30 PM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">Victor Innocent</td>
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">2024-08-24</td>
                  <td className="py-3 px-4">04:45 PM</td>
                  <td className="py-3 px-4"><Link href="/Details/1" className="text-blue-500 hover:underline">View</Link></td>
                </tr>
              </tbody>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{staff.name}</td>
                    <td className="py-3 px-4">{staff.gender}</td>
                    <td className="py-3 px-4">{staff.date}</td>
                    <td className="py-3 px-4">{staff.time}</td>
                    <td className="py-3 px-4">
                      <Link href={`/Details/1`} className="text-blue-500 hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Table ends here */}
        </main>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-1 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Staff</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStaff.name}
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
                  value={newStaff.gender}
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
                  value={newStaff.date}
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
                  value={newStaff.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
