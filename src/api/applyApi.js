export const myRequestPromise = email =>
  fetch(`https://volunteer-servers.vercel.appmyRequests?email=${email}`, {
    method: 'GET',
    credentials: 'include', // Send cookies!
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Not authorized');
    return res.json();
  });
