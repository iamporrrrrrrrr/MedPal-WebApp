import {React, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import './Medicine.css'

export default function Medicine({meds, addMed, setCurMed, deleteMed, time}){
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
        <div className="page medicine-page">
            <div className="med-top">
                <span>Medicine</span>
                <button onClick = {() => navigate('/MedicineConfig')}>
                    <img src="./assets/plus.svg" alt="" /> 
                </button> 
            </div>
            <hr/>
            <div className="list-container">
                {meds.length==0 && "No Pending Medicine"}
                {meds.sort(function(a,b) {return a.info.Tube-b.info.Tube}).map(med => {
                    return (
                        <>
                            <div className="list-element">
                                <div className="list-tube">Tube {med.info.Tube}</div>
                                <div className="list-main">
                                    <span>{med.info.Name}</span>

                                    <button classname='delete-btn'
                                        onClick = {() => deleteMed(med.info)}    
                                    >
                                        <img src="./assets/trash.svg" alt="" className="trash"/> 
                                    </button>

                                    <button className="edit-btn"
                                        onClick = {() => {
                                            setCurMed(med.info)
                                            navigate('/MedicineConfig')
                                        }}
                                    >
                                        <img src="./assets/right-arrow.svg" alt="" className="right-arrow"/> 
                                    </button>

                                </div>
                            </div>
                            <hr/>
                        </>
                    )
                })}
            </div>
            <Link to='/Home'>
                <div className="to-home-container">
                    <img src="./assets/home.svg" alt="" className='to-home'/> 
                </div>
            </Link>
        </div>
    )
}