import { React,useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Alarm.css'
import InfoPopUp from './components/InfoPopUp'

export default function Alarm({ meds, time, addMed}){

    const navigate = useNavigate()
    
    function findMed(){
        const medAlarm = meds.filter(med => med.info.Take === true);
        if(medAlarm.length) return medAlarm
        return -1
    }

    const [showInfo,setShowInfo] = useState({show:false,info:0})

    return(
        <div className='page alarm-page'>
            <div className="alarm-time">
                {`${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`}
            </div>
            <div className="alarm-img-container">
                <img src="./assets/medicine.svg" alt="" className='med-img'/> 
            </div>
            <div className="alarm-top">
                {findMed()!==-1 && findMed().map(med => {
                    return(
                        <div>
                            {med.info.Name + ' | '+med.info.Dosage+' '+med.info.Type+'(s)'}
                            <button className='alarm-med-info' onClick = {() => setShowInfo({show:true,info:med.info})}> i </button> 
                        </div>
                    )
                })}
                {findMed()===-1&&"No Pending Medicine"}
            </div>
            <button onClick={()=> {
                meds.map(med => {
                    addMed({...med.info,Take:false})
                })
                navigate(-1)
            }}>I have taken the medicine</button>
            {showInfo.show===true && <InfoPopUp info = {showInfo.info} setShowInfo = {setShowInfo}/>}
        </div>
    )
}