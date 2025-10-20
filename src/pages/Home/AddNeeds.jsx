import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../../hooks/useAuth'; 
import Swal from 'sweetalert2';
import axios from 'axios';

const AddNeeds = () => {
  const { user } = useAuth();  
  const [deadline, setDeadline] = useState(new Date());

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const post = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };
post.status = "active"
    console.log(post);

   
    axios.post('https://volunteer-server-blush.vercel.appvolunteer', post)
    .then(res => {
       if(res.data.insertedId){
       Swal.fire({
  
  icon: "success",
  title: "Your need has been saved",
  showConfirmButton: false,
  timer: 1500
});
       }
    })
    .catch(error =>{
        console.log(error);
    })
   
      
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-teal-600 rounded-xl shadow-lg my-10">
      <h1 className="text-4xl font-bold text-center mb-8 ">Need Support? Post Your Volunteer Request Here</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="font-semibold">Thumbnail Image URL</label>
          <input type="url" name="thumbnail" placeholder="https://example.com/image.jpg" className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="font-semibold">Post Title</label>
          <input type="text" name="title" placeholder="Enter post title" className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Write about your need..." required></textarea>
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <select name="category" className="select select-bordered w-full" required>
            <option value="">Select category</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Social Service">Social Service</option>
            <option value="Animal Welfare">Animal Welfare</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input type="text" name="location" placeholder="Dhaka, Bangladesh" className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="font-semibold">Number of Volunteers Needed</label>
          <input type="number" name="volunteersNeeded" min="1" className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="font-semibold">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={date => setDeadline(date)}
            className="input input-bordered w-full"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Organizer Name</label>
            <input type="text" value={user?.displayName || 'Unknown'} readOnly className="input input-bordered w-full " />
          </div>
          <div>
            <label className="font-semibold">Organizer Email</label>
            <input type="email" value={user?.email || 'Unknown'} readOnly className="input input-bordered w-full " />
          </div>
        </div>

        <button type="submit" className="btn btn-secondary w-full">Add Post</button>
      </form>
    </div>
  );
};

export default AddNeeds;
