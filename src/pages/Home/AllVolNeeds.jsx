import React, { useEffect, useState } from 'react';

import VolunteerCard from '../Shared/VolunteerCard';
import VolunteerTable from '../Shared/VolunteerTable';
import { useOutletContext } from 'react-router';

const AllVolNeeds = () => {
  const { isTableLayout } = useOutletContext(); 

  const [volunteerNeeds, setVolunteerNeeds] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch(`https://volunteer-servers.vercel.appvolunteer?search=${searchText}`)
      .then(res => res.json())
      .then(data => setVolunteerNeeds(data));
  }, [searchText]);

  return (
    <div 
    className="px-4 lg:px-16 py-20 bg-cover  bg-center bg-fixed"
      style={{ backgroundImage: 'url("https://i.ibb.co/bRB2f1Mz/splash-turquoise-paint.jpg")' }}>
      <h1 className='text-xl lg:text-4xl font-bold my-6 text-center'>Volunteer need posts page</h1>

      <div className='flex justify-center mb-8'>
        <input
          type="text"
          placeholder="Search by post title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md rounded-4xl"
        />
      </div>

      {isTableLayout ? (
        <VolunteerTable data={volunteerNeeds} />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
          {volunteerNeeds.map(volunteer => (
            <VolunteerCard key={volunteer._id} job={volunteer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVolNeeds;
