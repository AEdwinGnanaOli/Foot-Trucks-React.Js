import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CiSearch } from 'react-icons/ci'
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Navbar, Container, Nav, Button, Table } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import Dashboard from './Dashboard';
function LoginVendorData() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/loginvendordata').then(user => {
            setData(user.data.vendorDatas)
        })
    }, [])
    console.log(data)
    const handleDelete = (id) => {
        console.log(id)
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
    console.log(colums)
    const SearchBar = (e) => {
        const newdata = data.filter(res => {
            return res.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
        })
        setData(newdata)
    }

    return (
        <>
            <Dashboard title={"Vendor Login Details"}>
                <DataTable title="Vendor Login Details"
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
                />
            </Dashboard>


        </>
    )
}

export default LoginVendorData