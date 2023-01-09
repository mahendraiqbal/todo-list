import React, { useState, useEffect } from 'react'
import Edit from "../../assets/edit.png"
import Delete from "../../assets/delete.png"
import { Modal, Button } from "react-bootstrap";

import { patchToDoActivity, getAllToDoActivity, deleteToDoListActivity } from "../../utils/https/activity"

import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CardToDo({ activity_group_id, id, is_active, priority, title }) {
    // console.log(activity_group_id, id, is_active, priority, title)
    const [activity, setActivity] = useState([]);
    const [isNotGet, setIsNotGet] = useState(true);
    const [isShow, invokeModal] = useState(false);
    const [data, setData] = useState({
        activity_group_id: '',
        title: '',
        priority: 'very-high',
    });

    const fetchData = () => {
        getAllToDoActivity(id)
            .then((res) => {
                console.log(res.data);
                setActivity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (activity.length === 0 && isNotGet) {
            fetchData();
            setIsNotGet(false);
        }
    }, [activity, isNotGet]);

    const initModal = () => {
        return invokeModal(!false);
    };
    const closeModal = () => {
        return invokeModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleSubmit = () => {
        const body = {
            activity_group_id: id,
            title: data.title,
            priority: data.priority,
        }
        patchToDoActivity(id, body)
            .then((res) => {
                fetchData()
            })
            .then((res) => {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteHandler = () => {
        Swal.fire({
            icon: "warning",
            title: "Delete This Item?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const body = id;
                deleteToDoListActivity(body)
                    .then((res) => {
                        console.log(res);
                        return toast.success("Delete Succesfully", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    .then((res) => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000)
                    })
                    .catch((err) => console.error(err))
            }
        })
    }
    return (
        <>
            <ToastContainer />
            <div className='content-item'>
                <div className='d-flex align-items-center form-check'>
                    <div>
                        <input type="checkbox" className='form-check-input' />
                    </div>
                    <span>{title}</span>
                    <form onSubmit={handleSubmit}>
                        <Button onClick={initModal} className="icon-edit">
                            <img src={Edit} alt="edit" className='icon-edit-p' />
                        </Button>
                        <Modal show={isShow}>
                            <Modal.Header closeButton onClick={closeModal}>
                                <Modal.Title>Tambah List Item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="modal-body">
                                    <div>
                                        <label>NAMA LIST ITEM</label>
                                        <input
                                            placeholder="Tambahkan Nama Activity"
                                            className="form-control"
                                            name="title"
                                            defaultValue={title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <label>Priority</label>
                                    <select name="priority" id="priority" onChange={handleChange} defaultValue={priority}>
                                        <option value="very-high">Very High</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                        <option value="very-low">Very Low</option>
                                    </select>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="dark" type="submit" onClick={handleSubmit}>
                                    Simpan
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
                <img src={Delete} alt="delete" onClick={deleteHandler} className="delete-icon" />
            </div>
        </>
    )
}
