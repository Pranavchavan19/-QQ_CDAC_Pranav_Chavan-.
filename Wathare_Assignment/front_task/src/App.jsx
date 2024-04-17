import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
// import data from '../public/sample-data.json'
function App() {
  const [samples, setSamples] = useState([])
  const [dis,setDis] = useState("hidden")
  const btnref = useRef()

  useEffect(() => {
    async function fetchData() {
    const response = await axios.get('http://localhost:5000/api/samples');
    setSamples(response.data);
    }
    fetchData();
    }, []);
   
  const send = () =>
  {
       setDis("")
       console.log(btnref.current.value)
       if(btnref.current.value)
       {

       }
  }

  const data = {
    labels: samples.map((sample) => moment(sample.timestamp).format('YYYY-MM-DD HH:mm:ss')),
    datasets: [
    {
    label: 'Sample Data',
    data: samples.map((sample) => sample.sample),
    backgroundColor: samples.map((sample) => {
    if (sample.sample === 0) return 'yellow';
    if (sample.sample === 1) return 'green';
    return 'red';
    }),
    },
    ],
    };

  // useEffect(() =>{
  //   getData()
  // },[])

  // async function fetchData() {
  //   const data = await import('../public/sample-data.json');
  //   console.log(data.ts);
  // }

  // useEffect(() => {
  //   fetchData
  // },[])
  return (
    <>

       <div className='flex flex-col items-center my-10 max-w-screen-2xl min-h-full'>
          <div className='w-2/3 h-14 border-yellow-300 border-4 text-orange-400 justify-end mb-10' >
             <div className='flex justify-end '>
              <button className='bg-gray-200 text-white p-3 mr-2 hover:bg-blue-500 rounded-md'value="1 hr" ref={btnref} onClick={send}>1 hr</button>
              <button className='bg-gray-200 text-white p-3 mr-2 hover:bg-blue-500 rounded-md' onClick={send}>8 hr</button>
              <button className='bg-gray-200 text-white p-3 mr-2 hover:bg-blue-500 rounded-md'onClick={send}>24 hr</button>
             </div>
          </div>
          <div className='w-4/5 h-52 border-yellow-300 border-4 flex flex-col '>
            <p className={`text-gray-500 ml-24 ${dis}`}>Cycle Status</p>
            <div className={`w-4/5 h-14 border-4 ${dis} ml-36`}></div>
            <div >

            </div>
            </div>
          </div>

      


    </>
  )
}

export default App
