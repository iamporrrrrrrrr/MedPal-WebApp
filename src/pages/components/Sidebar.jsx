import { React,useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Sidebar.css'


export default function Sidebar({patientInfo}){

    const navigate = useNavigate()

    return(
        <div className='sidebar-page'>
            <div className="sidebar-container">
                <button className="sidebar-close">X</button>
                <div className="sidebar-img-container">
                    <img src={`./assets/patient-img/${patientInfo.id}.jpg`} alt="" className="sidebar-img" />
                </div>
                <div className="sidebar-name">{(patientInfo.name).toUpperCase()}</div>
                <div className="sidebar-option">
                    <img src="./assets/user-solid-dark.svg" alt="" className="sidebar-icon" />

                </div>
                <div className="sidebar-option"></div>
                <div className="sidebar-option"></div>
            </div>
        </div>
    )
}