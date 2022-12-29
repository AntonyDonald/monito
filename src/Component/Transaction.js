import { MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Api from '../api/Api'
import DataContext from '../Context/DataContext'

const Transaction = () => {
  const { getData, setGetData, amount_type, setAmount_type, catagory_name, setCatagory_name, transData, setTransData, mainData, setMainData } = useContext(DataContext);
  const [selectId, setSelectId] = useState(0);
  const [amount, setAmount] = useState("")
  const [itemId, setItemId] = useState("");


  const moment = require('moment')

  // catagory Id
  var demo = itemId

  // handleClick for Transaction Data  

  const handleClick = async () => {
    if (selectId === 0 || amount === "") {
      alert("Value is Empty")
    } else {
      const today = new Date();
      const filtered = getData.filter((data) => data.id === parseInt(demo));
      const newItem = { Date: today, name: filtered[0].name, type: filtered[0].type, Amount: amount };
      try {
        const response = await Api.post('/transaction/', newItem);
        if (response) {
          handleMain()
        }
        setTransData([...transData, response.data]);
        setSelectId(0);
        setAmount("")
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  // handleMain For Main Data 

  const handleMain = async () => {
    if (selectId === 0 || amount === "") {
      alert("Value is Empty")
    } else {

      const today = new Date();
      const z = today.setHours(0, 0, 0, 0)
      const Today = moment(new Date(z)).format('DD-MM-YYYY  HH:mm:ss');
      const id = mainData.length ? mainData[mainData.length - 1].id + 1 : 1;

      const filtered = getData.filter((data) => data.id === parseInt(demo));
      const newItem = { id: id, date: Today, catagory_Id: parseInt(demo), name: filtered[0].name, type: filtered[0].type, Amount: parseInt(amount) };

      const demoFilter = mainData.map((data) => data.name)

      const checkFilter = demoFilter.filter((data) => (data).toString() === newItem.name)


      if (!checkFilter.length) {
        try {
          const response = await Api.post('/main/', newItem)
          setMainData([...mainData, response.data]);
          setSelectId(0);
          setAmount("")
        } catch (err) {
          console.log(err.message)
        }
      } else {
        const mainFilter = mainData.filter((data) => data.date === Today);

        if (mainFilter.length > 0) {
          // main Data ID 
          const mainDataId = mainData.filter((data) => data.name === filtered[0].name)
          const mainId = mainDataId[0].id;
          const a = parseInt(mainDataId[0].Amount);
          const b = parseInt(amount);
          const add = a + b;
          const putAmount = { id: id, date: Today, catagory_Id: parseInt(demo), name: filtered[0].name, type: filtered[0].type, Amount: add };
          try {
            const response = await Api.put(`/main/${mainId}`, putAmount);
            setMainData(mainData.map((item) => item.id === mainId ? { ...response.data } : item))
          } catch (err) {
            console.log(err.message)
          }

        } else {
          console.log("post")
        }
      }
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <div>
          <Link to='/'>
            <Button>Home</Button>
          </Link>
        </div>
        <div className='col-md-12'>
          <Form>
            <div className='col-md-4'>
              <select className="custom-select"
                value={selectId}
                onChange={(e) => setSelectId(e.target.value)}
                onClick={(e) => setItemId(e.target.value)}
              >
                <option style={{ display: 'none' }}>Click Me!</option>
                {getData.map((data) =>
                  <React.Fragment key={data.id} >
                    <option value={data.id} >{data.name}</option>
                  </React.Fragment>
                )}
              </select>
            </div>
            <div className='col-md-4'>
              <FormControl
                type='number'
                placeholder='EnterAmount'
                className='input_amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <Button type='button' onClick={() => { handleClick() }}>Submit</Button>
            </div>
          </Form>

        </div>

      </div>
    </div >
  )
}

export default Transaction