import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import { MdModeEdit, MdDelete } from "react-icons/md";
import axios from 'axios'
import '../admin/admin.css'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard';
import Index from './Index';
function UserDetails() {
  const [userdata, setData] = useState([]);
  const count=userdata.length
  
  console.log(count)
  const [qurey,setQurey]=useState('')
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('https://foot-trucks-react-js.onrender.com/admin/userdetails').then((result) => {
      setData(result.data.userDetails)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    axios.delete(`https://foot-trucks-react-js.onrender.com/user/delete/${id}`).then((user) => {
      window.location.reload()
    }).catch(err => { console.log(err) })
  }
  const handleUserUpdate = (id) => {
    navigate('/admin/user/update', sessionStorage.setItem('adminuupdateid', id))
  }
  const colums = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: "Role",
      selector: row => row.role
    },
    {
      name: "Action",
      cell: row => (<div className='admin-user-btns'>
        <Button className="admin-edit-btn edit" variant="success" onClick={e => handleUserUpdate(row._id)}><i><MdModeEdit className='admin-edit-icon' /></i><i></i></Button>
      <Button className="admin-edit-btn" variant="danger" onClick={e => handleDelete(row._id)}> <i><MdDelete className='admin-edit-icon' /></i><i></i></Button>
      </div>),
      
    }

  ]
  console.log(colums)
  useEffect(() => {
    const newdata = userdata.filter(res => {
      return res.name.toLowerCase().includes(qurey.toLowerCase().trim())||res.email.toLowerCase().includes(qurey.toLowerCase().trim())||res.phone.toLowerCase().includes(qurey.toLowerCase().trim())||res.role.toLowerCase().includes(qurey.toLowerCase().trim())
    })
    setData(newdata)
  },[qurey])
  return (
    <>
    <Dashboard title={'User-Details'}>
      <DataTable title=" User Details"
        columns={colums} data={userdata}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={<Button variant='success' className='m-3'onClick={e => { navigate(`/usersign`) }}>+Add</Button>}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="admin-search-hover form-control"
            placeholder="search here..."
            onChange={(e)=>{setQurey(e.target.value)}}
          />
        }
      />
     
    </Dashboard>
    
    </>
    
  )
  
}


export default UserDetails