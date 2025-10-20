import React, { use } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyPostedNeeds = ({ myNeedsPromise }) => {
  const needs = use(myNeedsPromise);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://volunteer-server-blush.vercel.appvolunteer/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire('Deleted!', 'The post has been deleted.', 'success').then(() => {
           
            window.location.reload();
          });
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', error);
      }
    }
  };
const navigate = useNavigate();
  const handleUpdate = (id) => {
  navigate(`/update/${id}`);
};

  return (
    <div className='min-h-screen py-6'>
      <h2 className="text-4xl font-bold text-center my-6">My Volunteer Needs Posts: {needs.length}</h2>

      {needs.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any volunteer posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {needs.map((need) => (
            <div key={need._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{need.title}</h3>
              <p><span className="font-medium">Category:</span> {need.category}</p>
              <p><span className="font-medium">Location:</span> {need.location}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleUpdate(need._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer" 
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(need._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostedNeeds;
