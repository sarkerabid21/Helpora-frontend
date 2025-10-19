export const myNeedsPromise = email => {
    return fetch(`https://volunteer-servers.vercel.appvolunteer?email=${email}`).then(res =>res.json())
}