import {useEffect, useState} from 'react'
import './App.css'
import NavBar from "./Component/NavBar.jsx";
import axios from 'axios'
import FullTableBoard from "./Component/FullTableBoard.jsx";
import Intensity from "./Component/Intensity.jsx";
import Likelihood from "./Component/Likelihood.jsx";
import Relevance from './Component/Relevance';
import { LinearProgress } from '@mui/material';
function App() {
    const [DataChart,setDatachart]=useState([])
    const [loading,setLoading]=useState(false)
useEffect(()=>{
    if(DataChart.length==0){
        setLoading(true)
        if(JSON.parse(localStorage.getItem('getcharts'))){
            console.log('getting from here')
            setDatachart(JSON.parse(localStorage.getItem('getcharts')))
            setLoading(false)
            return;
        }
        // axios.get(,)
        //     .then(res=>
        //     {
        //         setDatachart(res.data);
        //     localStorage.setItem('getcharts',JSON.stringify(res.data));}
    
        //     )
        const getData = async () => {
            const response = await axios.get(
                'http://13.233.166.61:8080/api/v2/datacharts'
            );
            if(response.data && response.data.length>0){
            setDatachart(response.data)
            localStorage.setItem('getcharts',JSON.stringify(response.data));
            setLoading(false)
            }
        };
        getData()
       console.log('still downloading')
        console.log(DataChart)
    }else{
        console.log('downloaded')
        console.log(DataChart)
        setLoading(false)
    }

},[])
  return (
    <div className="App">
        {loading&&<LinearProgress />}
      {/*<NavBar/>*/}
        {DataChart.length>0 && <FullTableBoard datacharts={DataChart}/>}
        {DataChart.length>0 && <Intensity datachart={DataChart}/>}
        {DataChart.length>0 && <Likelihood datachart={DataChart}/> }
        {DataChart.length>0 && <Relevance datachart={DataChart}/> }
    </div>
  )
}

export default App
