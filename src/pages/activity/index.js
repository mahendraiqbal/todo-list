import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./style.css";

import EmptyActivity from "../../assets/activity-empty-state.png";
import Edit from "../../assets/edit.png";

import { getOneActivity, addTodoActivity, patchTitleActivity } from "../../utils/https/activity";
import CardToDo from "../../components/CardToDo";

function Activity() {
    const [activity, setActivity] = useState([]);
    const [oneActivity, setOneActivity] = useState([]);
    const [isNotGet, setIsNotGet] = useState(true);
    const [isShow, invokeModal] = useState(false);
    const [data, setData] = useState({
        activity_group_id: '',
        title: '',
        priority: 'very-high',
    });
    const [edit, setEdit] = useState({
        id: '',
        title: '',
    })


    const initModal = () => {
        return invokeModal(!false);
    };
    const closeModal = () => {
        return invokeModal(false);
    };
    const { id } = useParams();
    const fetchData = () => {
        getOneActivity(id)
            .then((res) => {
                console.log(res.data.todo_items);
                setActivity(res.data.todo_items);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity, isNotGet]);

    const fetchOneData = () => {
        getOneActivity(id)
            .then((res) => {
                console.log(res.data.todo_items);
                setOneActivity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (oneActivity.length === 0 && isNotGet) {
            fetchOneData();
            setIsNotGet(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oneActivity, isNotGet]);

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
        addTodoActivity(body)
            .then((res) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleEdit = (e) => {
        const value = e.target.value;
        setEdit({
            ...edit,
            [e.target.name]: value,
        })
    }

    const submitEdit = () => {
        const body = {
            id: id,
            title: edit.titleEdit,
        }
        patchTitleActivity(id, body)
            .then((res) => {
                console.log(res)
            })
    }

    useEffect(() => {
        document.title = "To Do List - Detail"
    })

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="todo-header">
                    <div className="todo-title">
                        <div className="icon-back">
                            <a href="/">
                                <button>{'<'}</button>
                            </a>
                        </div>
                        <form onSubmit={submitEdit}>
                            <div className="icon-edit-h">
                                <input id="TitleDetail" defaultValue={oneActivity.title} className="editTitle" onChange={handleEdit} name="titleEdit" />
                                <button type="submit" onClick={submitEdit}>
                                    <img src={Edit} alt="edit" />
                                </button>
                            </div>
                        </form>
                        <div className="d-flex">
                            <div className="dropdown">
                                <div>
                                    <button id="ButtonSort" className="btn-sort">
                                        <div className="icon-sort"></div>
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <Button variant="primary" onClick={initModal}>
                                    + Tambah
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
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <label>Priority</label>
                                            <select name="priority" id="priority" onChange={handleChange}>
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
                    </div>
                </div>
                <div className="detail-content">
                    {activity.length === 0 ? (
                        <div className="empty-item">
                            <img src={EmptyActivity} alt="empty" id="TextEmptyToDo" />
                        </div>
                    ) : (
                        <>
                            {activity.map((activities) => {
                                return (
                                    <CardToDo
                                        activity_group_id={activities.activity_group_id}
                                        id={activities.id}
                                        is_active={activities.is_active}
                                        priority={activities.priority}
                                        title={activities.title}
                                    />
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Activity;
