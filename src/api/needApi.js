export const myNeedsPromise = email => {
    return fetch(`https://volunteer-server-blush.vercel.appvolunteer?email=${email}`).then(res =>res.json())
}