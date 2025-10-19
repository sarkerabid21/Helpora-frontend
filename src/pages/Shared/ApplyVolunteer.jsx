import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const ApplyVolunteer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    fetch(`https://volunteer-servers.vercel.appvolunteer/volunteer-posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);


 const handleRequest = async (e) => {
  e.preventDefault();
  const form = e.target;
  const resume = form.resume.value;
  const userEmail = form.userEmail.value;
  console.log(resume, userEmail);


  const volunteerData = {
    postId: id,
    title: post.title,
    thumbnail: post.thumbnail,
    description: post.description,
    category: post.category,
    location: post.location,
    volunteersNeeded: post.volunteersNeeded,
    deadline: post.deadline,
    organizerName: post.organizerName,
    organizerEmail: post.organizerEmail,
    volunteerName: user.displayName,
    volunteerEmail: user.email,
    suggestion,
    status: 'requested',
  };

  try {
    
    const res = await fetch('https://volunteer-servers.vercel.appvolunteer/volunteer-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(volunteerData)
    });

    const result = await res.json();

    if (result.success) {
     
      await fetch(`https://volunteer-servers.vercel.appvolunteer/volunteer-posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'decrement' })
      });

      Swal.fire('Success', 'Volunteer request submitted!', 'success');
    } else {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'Request failed.', 'error');
  }
};


  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <form onSubmit={handleRequest} className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-2xl border p-6">
        <legend className="fieldset-legend  font-bold text-4xl">Want to be a Volunteer!</legend>

       
        <label className="label">Title</label>
        <input type="text" value={post.title} readOnly className="input input-bordered w-full" />

        <label className="label">Thumbnail</label>
        <input type="text" value={post.thumbnail} readOnly className="input input-bordered w-full" />

        <label className="label">Description</label>
        <textarea value={post.description} readOnly className="textarea textarea-bordered w-full" />

        <label className="label">Category</label>
        <input type="text" value={post.category} readOnly className="input input-bordered w-full" />

        <label className="label">Location</label>
        <input type="text" value={post.location} readOnly className="input input-bordered w-full" />

        <label className="label">Volunteers Needed</label>
        <input type="text" value={post.volunteersNeeded} readOnly className="input input-bordered w-full" />

        <label className="label">Deadline</label>
        <input type="text" value={post.deadline} readOnly className="input input-bordered w-full" />

        <label className="label">Organizer Name</label>
        <input type="text" value={post.organizerName} readOnly className="input input-bordered w-full" />

        <label className="label">Organizer Email</label>
        <input type="text" value={post.organizerEmail} readOnly className="input input-bordered w-full" />

        {/* User Data */}
        <label className="label">Your Name</label>
        <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />

        <label className="label">Your Email</label>
        <input type="text" value={user.email} name="userEmail" readOnly className="input input-bordered w-full" />

        <label className="label">Resume Link</label>
        <input type="url"  name="resume" placeholder="Resume Link" className="input input-bordered w-full" />

        
        <label className="label">Suggestion</label>
        <textarea
          placeholder="Write any suggestion..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="textarea textarea-bordered w-full"
        />

         {post.volunteersNeeded <= 0 ? (
  <button disabled className="btn btn-disabled w-full mt-4">
    No More Volunteers Needed
  </button>
) : (
  <button type="submit" className="btn btn-primary w-full mt-4">
    Request
  </button>
)}
      </fieldset>
    </form>
  );
};

export default ApplyVolunteer;
