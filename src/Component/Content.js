import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Form, Modal, ModalBody, ModalHeader, ModalTitle, Row, Table } from 'react-bootstrap';
import { AiFillDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import DataContext from '../Context/DataContext';
import Api from '../api/Api';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Link } from 'react-router-dom';

const Content = () => {
    const { getData, setGetData, amount_type, setAmount_type, catagory_name, setCatagory_name,} = useContext(DataContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModal , setDeleteModal] = useState(false);
    const [deleteId , setDeleteId] = useState(0);
    const [editValue, setEditValue] = useState([]);
    const [itemId, setItemId] = useState(0);

    const handleModal = () => {
        setModalIsOpen(true);
        setCatagory_name("");
        setAmount_type("")
    }

    const handleAdd = async () => {
        const filtered = getData.filter((obj) => (obj.name).toString() === (catagory_name).toString());
        const editFiltered = editValue.filter((obj) => (obj.name).toString() === (catagory_name).toString());

        if (itemId === 0) {
            const id = getData.length ? getData[getData.length - 1].id +1 : 1;
            const add = { id : id, name: catagory_name, type: amount_type }
            if (catagory_name.trim().length === 0) {
                alert("Empty space is not allowed")
            } else {
                if ((catagory_name === "") || (amount_type === "")) {
                    alert("Catagory name OR Account Type is Empty")
                    setModalIsOpen(true)
                } else {
                    if (filtered.length === 0) {
                        try {
                            const response = await Api.post('/catagory/', add)
                            setGetData([...getData, response.data])
                        } catch (err) {
                            console.log(err.message)
                        }
                        setModalIsOpen(false);
                    } else {
                        alert("name already Exist")
                        setModalIsOpen(true)
                    }
                }
            }

        } else {
            if (catagory_name.trim().length === 0) {
                alert("Empty space is not allowed")
            } else {
                if ((catagory_name === "") || (amount_type === "")) {
                    alert("Catagory name OR Account Type is Empty")
                    setModalIsOpen(true)
                } else {
                    if ((editFiltered.length === 0)) {
                        const editValue = { id: itemId, name: catagory_name, type: amount_type }
                        try {
                            const response = await Api.put(`/catagory/${itemId}`, editValue)
                            setGetData(getData.map((item => item.id === itemId ? { ...response.data } : item)));
                            setModalIsOpen(false)
                        } catch (err) {
                            console.log(err.message)
                        }
                    } else {
                        alert('Name already Exist')
                    }
                }

            }

        }

    }
    const handleEdit = (id, name, type) => {
        const editFilter = getData.filter((data) => data.id !== id)
        setEditValue(editFilter)
        setModalIsOpen(true);
        setCatagory_name(name);
        setAmount_type(type)
        setItemId(id);

    }
    const handleDelete =  (id) => {
        setDeleteModal(true)
        setDeleteId(id)
       }
        
    const handleDeleteOk = async () => {
        const filtered = getData.filter((data) => data.id !== deleteId)
        setGetData(filtered)
        try {
            await Api.delete(`/catagory/${deleteId}`)
        } catch (err) {
            console.log(err.message)
        }
        setDeleteModal(false)
    }

    return (
        <Container>
            <Row>
                <Link to='/'>
                    <Button>Home</Button>
                </Link>
                <Col>
                    <Button onClick={() => handleModal()}> Add Catagory &nbsp;
                        <AiOutlinePlusCircle
                        />
                    </Button>

                </Col>
                <Col>
                    <Table className='border' >
                        <thead >
                            <tr>
                                <th>S.No</th>
                                <th>Catagory</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getData.map((data, index) =>
                                <tr key={data.id}>
                                    <td>{index + 1}</td>
                                    <td><b>{data.name}</b></td>
                                    <td>{data.type}</td>
                                    <td>
                                        <AiOutlineEdit
                                            role='button'
                                            tabIndex='0'
                                            onClick={() => handleEdit(data.id, data.name, data.type)}
                                        />
                                        <AiFillDelete
                                            role='button'
                                            tabIndex='0'
                                            onClick={() => handleDelete(data.id)}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
                <div className='modal'>
                    <Modal show={modalIsOpen} >
                    <ModalHeader>Add Catagory</ModalHeader>
                    <ModalBody>
                        <ModalTitle>Catagory Name</ModalTitle>
                        <Form.Control
                            type='text'
                            placeholder='Catagory name here'
                            value={catagory_name}
                            onChange={(e) => setCatagory_name(e.target.value)}
                        />
                        <ModalTitle>Account Type</ModalTitle>
                        <RadioGroup
                            row
                            type='radio'
                            name='type'
                            value={amount_type}
                            onChange={(e) => setAmount_type(e.target.value)}
                        >
                            <FormControlLabel value='Income' label='Income' control={<Radio />} />
                            <FormControlLabel value='Expense' label='Expense' control={<Radio />} />
                        </RadioGroup>
                        <Button onClick={() => handleAdd()}>Add</Button>
                        <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
                    </ModalBody>
                </Modal>
                </div>
                <div className='modal'>
                <Modal show = {deleteModal} className = "modal-dialog-centered">
                    <ModalHeader><b>Are you Sure Do you want to Delete</b></ModalHeader>
                    <ModalBody>
                        <Button onClick={() => handleDeleteOk()}>OK</Button>
                        <Button onClick={() => setDeleteModal(false) }>Cancel</Button>
                    </ModalBody>
                </Modal>
                </div>
                
            </Row>
        </Container>
    )
}

export default Content