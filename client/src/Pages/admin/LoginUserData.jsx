import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard';
function LoginUserData() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/login/userdata').then(user => {
            setData(user.data.userDatas)
        })

    }, [])
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/deletedetails/${id}`).then((user) => {
            window.location.reload()
        }).catch(err => { console.log(err) })
    }
    const colums = [
        {
            name: "Vendor Name",
            selector: (row) => row.name,
            sortable:true
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: 'lastLoginDate',
            selector: row => row.lastLoginDate,
        },
        {
            name: "lastLoginTime",
            selector: row => row.lastLogintime
        },
        {
            name: "Action",
            cell: row => <Button className="admin-edit-btn" variant="danger" onClick={e => handleDelete(row.UserId)}> <i><MdDelete className='admin-edit-icon' /></i></Button> 
        }
        
    ]
    // console.log(colums)
    const SearchBar = (e) => {
        const newdata = data.filter(res => {
            return res.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
        })
        setData(newdata)
    }
    return (
        <Dashboard title={"User Login Details"}>
        <DataTable title="User Login Details"
            columns={colums} data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            selectableRows={<Button>delete</Button>}
            selectableRowsHighlight
            highlightOnHover
            actions
            subHeader
            subHeaderComponent={
                <input
                    type="text"
                    className="admin-search-hover form-control"
                    placeholder="search here..."
                    onChange={SearchBar}
                />
            }
            onRowDelete={(row)=>{handleDelete(row._id)}}
        />
    </Dashboard>
    )
}

export default LoginUserData