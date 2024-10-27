import { React, useEffect,useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Clock from "./components/Clock"
import MedicineList from "./components/MedicineList"
import './Home.css'

export default function Home({ addMed, meds, time}){
    const navigate = useNavigate()

    useEffect(() => {
        const formattedTime = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
        const medAlarm = meds.filter(med => med.info.Time.includes(formattedTime));
        medAlarm.map(med => {
            addMed({...med.info, Take:true})
        })
        if(medAlarm.length && !time.getSeconds()){
            navigate('/Alarm')
        }
    },[time,meds])

    return(
        <div className='page home-page'>
            <div className="home-top">   
                <div className='home-top-top'>
                    <div className='profile-container'>
                        <img src="src/pages/assets/user-solid.svg" alt="" className='profile'/> 
                    </div>
                    <span className="name-container">MR JOHN SMITH</span>
                </div>    
                <Clock time = {time}/>
            </div>
            <div className="home-bottom">
                <span>Upcoming</span>
                <MedicineList meds = {meds} time = {time}/>
                <Link to="/Medicine">
                    <div className="to-list-container">
                        <img src="src/pages/assets/three-lines.svg" alt="" className='to-list'/> 
                    </div>
                </Link>
            </div>    
        </div>
    )
}