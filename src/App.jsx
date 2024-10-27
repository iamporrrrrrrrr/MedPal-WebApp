import {React, useState, useEffect} from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import Home from "./pages/Home"
import Medicine from "./pages/Medicine"
import MedicineConfig from "./pages/MedicineConfig"
import Alarm from "./pages/Alarm"
import "./App.css"

export default function App() {
    

    const [meds, setMeds] = useState(() => {
        // return []
        const localValue = localStorage.getItem("MEDS")
        if(localValue == null) return []    
        return JSON.parse(localValue)
    })

    const [curMed, setCurMed] = useState(() => {
        // return {Name:"", Type:"", Dosage:"", Interval:"", Duration:"", Instruction:"", Description:"", Time:[""],Tube: 0}
        const localValue = localStorage.getItem("CURMED")
        if(localValue == null) return {Name:"", Type:"", Dosage:"", Interval:"", Duration:"", Instruction:"", Description:"", Time:[""], Tube:0, Take:false}    
        return JSON.parse(localValue)
    })

    const [emptyTubes, setEmptyTubes] = useState(() =>{
        // return [1,2,3,4,5,6,7,8]
        const localValue = localStorage.getItem("TUBES")
        if(localValue == null) return [1,2,3,4,5,6,7,8]   
        return JSON.parse(localValue)
    })

    const [time, setTime] = useState(new Date())

    useEffect( () => {
      const intervalId = setInterval(() => setTime(new Date()),1000)
      return () => {
        clearInterval(intervalId)
      }
    }
    ,[])
    
    useEffect(() => {
        localStorage.setItem("MEDS", JSON.stringify(meds))
    }, [meds])

    useEffect(() => {
        localStorage.setItem("CURMED", JSON.stringify(curMed))
    }, [curMed])

    useEffect(() => {
        localStorage.setItem("TUBES", JSON.stringify(emptyTubes))
    }, [emptyTubes])

    function addMed(medInfo) {
        setMeds(currentTodos => {
            return [...(currentTodos.filter(todo => todo.info.Name !== medInfo.Name)), { id: crypto.randomUUID(), info: medInfo}]
        })
        setEmptyTubes(tubes => tubes.filter(e => e !== medInfo.Tube))
    }

    function deleteMed(medInfo){
        setMeds(currentTodos => {
                return currentTodos.filter(todo => todo.info !==  medInfo)
        })
        setEmptyTubes(tubes => [...tubes, medInfo.Tube])
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Home meds = {meds} addMed = {addMed} time = {time} />} />                    
                    <Route path="/Home" element={<Home meds = {meds} addMed = {addMed} time= {time}/>} />
                    <Route path="/Medicine" element={<Medicine meds = {meds} addMed = {addMed} setCurMed = {setCurMed} deleteMed = {deleteMed} time = {time} />} />
                    <Route path="/MedicineConfig" element={<MedicineConfig meds = {meds} addMed = {addMed} curMed = {curMed} setCurMed = {setCurMed} emptyTubes = {emptyTubes} time={time}/>} />
                    <Route path="/Alarm" element={<Alarm meds = {meds} time = {time} addMed = {addMed}/>} />
                </Routes>  
            </Router>  
        </>
    )
}
