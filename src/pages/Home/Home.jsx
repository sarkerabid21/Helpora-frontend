import React, { Suspense } from 'react';
import Banner from './Banner';
import Success from './FAQ';
import VolNeeds from './VolNeeds';
import Companies from './Companies';

const Home = () => {

    const volunterPromise = fetch('https://volunteer-server-blush.vercel.appvolunteer')
    .then(res => res.json())
    // const volunterPromise = fetch('https://volunteer-server-blush.vercel.appvolunteer')
    // .then(res => res.json())

    return (
        <div className="bg-cover  bg-center bg-fixed"
      style={{ backgroundImage: 'url("https://i.ibb.co/R4TrKD12/natural-yellow-sand-beach-background.jpg")' }}>
            <Banner></Banner>
            <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
                <VolNeeds volunterPromise={volunterPromise}></VolNeeds>
            </Suspense>
           <section className='w-11/12 mx-auto my-6'>
             <Companies></Companies>
           </section>
            <Success></Success>

        </div>
    );
};

export default Home;