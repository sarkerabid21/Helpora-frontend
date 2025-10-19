import Swal from 'sweetalert2';

const VolApplicationRow = ({ application, index, refetch }) => {
  const { title, _id, location, deadline } = application;

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this volunteer request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://volunteer-servers.vercel.appmyRequests/${_id}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your request has been cancelled.', 'success');
            refetch(); 
          }
        })
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="font-bold">{title}</div>
        <div className="text-sm opacity-50">{location}</div>
      </td>
      <td>{deadline}</td>
      <th>
        <button onClick={handleDelete} className="btn bg-red-700 w-20 text-white">X</button>
      </th>
    </tr>
  );
};

export default VolApplicationRow;
