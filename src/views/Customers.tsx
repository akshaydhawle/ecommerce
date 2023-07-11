import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../services/users';

const Customers = () => {
const [users, setUsers] = useState<User[]>([]);
  
  const getUsers = ()=>{
    UserService.getUsers()
    .then(res=>setUsers(res.data))
  }

  useEffect(()=>{
    getUsers();
  },[]);  

  const navigate = useNavigate();

  const deleteCategory = (id:number)=>{
    UserService.deleteUser(id)
      .then(res=> {
        getUsers();
        toast('User Deleted Successfully', {
            position: "top-center",
            theme: "dark",
        });
      }).catch(err=>{
        toast(err.response.data.error, {
            position: "top-center",
            theme: "dark",
        });
      })
  }


  return (
    <div className="container">
        <div className="row">
            <div className="col-12 ">
                <h2 className='mb-2 text-center'>Users</h2>
                <table className='table p-2'>
                    <thead>
                        <tr>
                            <th className='px-3'>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map(c=>(
                                <tr key={c.name} >
                                    <td className='px-3'>
                                        <img className='w-10 h-10 border-radius img-fluid' src={c.image} alt=""  />
                                    </td>
                                    <td >{c.name}</td>
                                    <td >{c.email}</td>
                                    <td >{c.role}</td>
                                    <td>
                                        <div onClick={()=>deleteCategory(c.id)} className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon  icon={faClose} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Customers;