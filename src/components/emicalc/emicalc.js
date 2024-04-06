import { useEffect, useState } from 'react'
import './emicalc.css'
import { tenureData } from './constants.js'

function App() {
  const [cost, setCost] = useState()
  const [interest, setInterest] = useState(10)
  const [fee, setFee] = useState(1)
  const [downPayment, setDownpayment] = useState(0)
  const [tenure, setTenure] = useState(0)
  const [emi, setEmi] = useState(0)

  const calculateEmi = (downpayment) => {
    if(!cost) return

    const loanAmt = cost - downpayment;
    const rateOfInterest = interest/100;
    const numberOfYears = tenure/12;

    const EMI = (loanAmt * rateOfInterest * (1+rateOfInterest) ** numberOfYears)/((1+rateOfInterest)**numberOfYears - 1)

    return Number(EMI/12).toFixed(0)
  }

  const calculateDownpayment = (emi) => {
    if(!cost) return;

    const downpaymentPercentage = 100-(emi/calculateEmi(0)) * 100
    return Number((downpaymentPercentage/100)*cost).toFixed(0)
  }

  useEffect(() => {
    if(!(cost>0))
    {
      setDownpayment(0)
      setEmi(0)
    }

    const emi = calculateEmi(downPayment)
    setEmi(emi)

  },[tenure])

  const updateEMI = (e) =>
  {
    if(!cost) return

    const dp = Number(e.target.value)
    setDownpayment(dp.toFixed(0))

    const emi = calculateEmi(dp)
    setEmi(emi)
  }

  const updateDownPayment =(e) => {
    if(!cost) return

    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0))

    const dp = calculateDownpayment(emi)
    setDownpayment(dp)
  }

  

  return (
    <>
      <div className='App'>
        <span className='title' style={{fontSize: 30, marginTop: 10, textAlign: 'center', color: 'indigo'}}>Emi Calculator</span>
        
        <span className='title'>Total cost of Asset: </span>
        <input 
          type='number'
          className='box'
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Total cost of Assets"
        />

        <span className='title'>Interest rate (in %)</span>
        <input 
          type='number'
          className='box'
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Total cost of Assets"
        />

        <span className='title'>Processing fee (in %)</span>
        <input 
          type='number'
          className='box'
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder="Total cost of Assets"
        />

        <span className='title'>Down Payment:</span>
        <span className='title' style={{textDecoration: "underline"}}>
          Total Down Payment: {(Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0)}
        </span>
        <div>
          <input 
            type='range'
            min={0}
            max={cost}
            className='slider'
            value={downPayment}
            onChange={updateEMI}
          />
        </div>
        <div className='labels'>
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>

        <span className='title'>Loan per month: </span>
        <span className='title' style={{textDecoration: "underline"}}>
          Total Loan Amount: {(emi*tenure).toFixed(0)}
        </span>
        <div>
          <input 
            type='range'
            min={calculateEmi(cost)}
            max={calculateEmi(0)}
            className='slider'
            value={emi}
            onChange={updateDownPayment}
          /><br/>
        </div>

        <div className='labels'>
          <label>{calculateEmi(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEmi(0)}</label>
        </div>
        

        <span className='title'>Tenure: </span>
        <div className='tenureContainer'>
          {tenureData.map((t) => {
              return ( 
                      <button 
                        className={`tenure ${t === tenure ? "selected" : ""}`} 
                        onClick={() => setTenure(t)}
                        >
                          {t}
                      </button>
                    )
          })}
        </div><br/>
      </div>
    </>
  )
}

export default App