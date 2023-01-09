import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import "./style.css"
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Delete from "../../assets/delete.png";

import { deleteActivity } from "../../utils/https/activity"

export default function Card({ id, title, date }) {
  // console.log(id, title, date);
  const formatedDate = dayjs(date).locale('id').format('DD MMMM YYYY ');

  const deleteHandler = (e) => {
    Swal.fire({
      icon: "warning",
      title: "Delete This Item?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        const body = id;
        console.log('cek body', body)
        deleteActivity(body, id)
          .then((res) => {
            console.log(res);
            return toast.success("Delete Succesfully", {
              position: toast.POSITION.TOP_RIGHT
            });
          })
          .then((res) => {
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          })
          .catch((err) => console.error(err))
      }
    })
  }
  return (
    <div className='col-3'>
      <ToastContainer />
      <div className='activity-card'>
        <Link style={{ textDecoration: 'none' }}
          to={`/detail/${id}`}
        >
          <div className='activity-body'>
            <h4 data-cy="activity-item-title" className='title-data'>{title}</h4>
          </div>
        </Link>
        <div className='card-footer'>
          <span className='activity-time-date'>{formatedDate}</span>
          <img src={Delete} alt="delete" onClick={deleteHandler} />
        </div>
      </div>
    </div>
  )
}
