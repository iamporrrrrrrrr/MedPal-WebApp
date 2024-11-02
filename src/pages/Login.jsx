import { React,useState } from 'react'
import { useNavigate } from "react-router-dom"
import patients from "./patient-data.json"
import "./Login.css"

export default function Login({ setIsSignedIn, setMeds, setEmptyTubes, setPatientInfo }){

    const navigate = useNavigate()
    
    const [input,setInput] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const patient = patients.find(e => {
            return e.id == input
        })
        if(patient){
            setIsSignedIn(true)
            setMeds(patient.meds)
            setEmptyTubes(patient.emptyTubes)
            setPatientInfo({id:patient.id, name:patient.name})
            navigate("/Home")
        }
    }


    return(
        <div className="page login-page">
            <div className="login-container">
                <div className="login-name">MedPal</div>
                <img src="./assets/medicine.svg" className="login-logo"/>
                <div className="form"></div>
                <div className="login-header">Login</div>
                <div className="login-desc">Please Enter Patient ID</div>
                <form onSubmit={handleSubmit}className="login-form"> 
                    <input 
                        value= {input} 
                        onChange={e => setInput(e.target.value)} 
                        type="text" 
                        id="patient-id"
                    />
                    <button className="login-submit">Retrieve Info</button>
                </form>
            </div>
        </div>
    )
}