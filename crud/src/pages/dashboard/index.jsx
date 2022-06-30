import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
    Button,
    Row,
    Table,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'
import Formproduct from "./form";
import request from "../../helpers/request";
import axios from "axios";

const Dashboard = () => {
    const [productList, setproductList] = useState([]);
    const [formType, setFormType] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formEdited, setEditedForm] = useState();

    const handleAddproduct = () =>{
        setFormType('create')
        setFormVisible(true);
    }

    const handleEdit = (data) =>{
        setEditedForm(data)
        setFormType('edit')
        setFormVisible(true)
    }

    const handleDelete = async (id) =>{
        // const newData = productList.filter(v => v.id !== id)

        await request.delete(`/product/${id}`)
        .then(() => fetchData())
        .catch(err => console.log(err))
    }

    const fetchData = async () =>{
        await request.get('/product')
        .then(({data}) => {
            setproductList(data);
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    // useEffect(() => {
    //     const dataDummy = [
    //         {
    //             "name": "John",
    //             "quantity": 25
    //         },
    //         {
    //             "name": "Doe",
    //             "quantity": 26
    //         }
    //     ]

    //     setproductList(dataDummy); // Test munculin di console browser [Inspect element]
    // }, [])

    console.table(productList)
    return (
        <div className="dashboard-container" style={{margin: "0px 250px"}}>
            <h1>product List</h1>
            <br />
            <Button color="primary" onClick={()=> handleAddproduct()}>Add Product</Button>
            <br />
            <Table striped width={200}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productList.map((row, idx) =>(
                        <tr key={idx}>
                            <th scope="row">
                                {idx + 1}
                            </th>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.quantity}</td>
                            <td>{row.price}</td>
                            <td>
                                <Button color="warning" onClick={() => handleEdit(row)}>Edit</Button>
                                &nbsp;&nbsp;
                                <Button color="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {/* Modal Form */}
            <Modal isOpen={formVisible} toggle={() => setFormVisible(!formVisible)}>
                <ModalHeader>{`Form ${formType} data`}</ModalHeader>
                <ModalBody>
                    <Formproduct 
                        type={formType}
                        setFormVisible={setFormVisible}
                        formEdited = {formEdited}
                        fetchData = {fetchData}
                    />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Dashboard;