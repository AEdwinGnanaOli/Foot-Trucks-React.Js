import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import axios from 'axios'
import { MdModeEdit, MdDelete } from "react-icons/md";
import '../admin/admin.css'
import './css/table.css'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
function VendorProductDetails() {
  const [vendordata, setData] = useState([]);
  const id = sessionStorage.getItem('adminId')
  const navigate = useNavigate()
  console.log(vendordata)
  useEffect(() => {
    axios.get('http://localhost:3000/admin/vendorproductdetails').then((result) => {
      setData(result.data.vendorDatas)
    }).catch((err) => {
      console.log(err)
    });
  }, [])
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/admin/vendorproductdelete/${id}`).then((user) => {
      window.location.reload()
    }).catch(err => { console.log(err) })
  }
  const handleUpdate = (id) => {
    navigate('/adminproductupdate', sessionStorage.setItem('adminpid', id))
  }
  const colums = [
    {
      name: "Image",
      selector: row => (<img width={150} height={100} src={`http://localhost:3000/images/${row.shopImage}`} alt='chh' className='vendor-p-img' />)
    },
    {
      name: "Image",
      selector: row => (<img width={150} height={100} src={`http://localhost:3000/images/${row.menuImage}`} alt='chh' className='vendor-p-img' />)
    },
    {
      name: "Shop Name",
      selector: (row) => row.shopname,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.shopmobilenumber,
    },
    {
      name: "Address",
      selector: row =><p className='ad-address'>{ row.shopaddress}</p>,
      
    },
    {
      name: "Start Time",
      selector: row => row.starttime
    },
    {
      name: "End Time",
      selector: row => row.endtime
    },
    {
      name: "Action",
      cell: row => (<div className='admin-user-btns'>
        <Button className="admin-edit-btn edit" variant="success" onClick={e => handleUpdate(row._id)}><i><EditOutlined  className='admin-edit-icon' /></i><i></i></Button>
        <Button className="admin-edit-btn" variant="danger" onClick={e => handleDelete(row._id)}> <i><DeleteOutlined className='admin-edit-icon' /></i><i></i></Button>
      </div>),

    }

  ]
  const SearchBar = (e) => {
    const newdata = vendordata.filter(res => {
    return res.shopname.toLowerCase().includes(e.target.value.toLowerCase().trim())

    })
    setData(newdata)
  }
  return (
    <Dashboard title={'Product-Details'}>
      <DataTable title="Vendor Product Details"
        columns={colums} data={vendordata}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows={<Button>delete</Button>}
        selectableRowsHighlight
        highlightOnHover
        actions={<Button variant='success' className='m-3' onClick={e => { navigate(`/vendorsignproduct`) }}>product register</Button>}
        subHeader
        SearchBar
        subHeaderComponent={
          <input
            type="text"
            className="admin-search-hover form-control"
            placeholder="search here..."
            onChange={SearchBar}
          />
        }
      />
    </Dashboard>
  )
}

export default VendorProductDetails