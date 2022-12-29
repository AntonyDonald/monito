import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='Container'>
        <div className='row'>
        <h1>List of Pages</h1>
            <div className='col-md-12 border border-success'>
                <div className='col-md-6 list-group-item'>
                <h6>Go to Catagory Page</h6>
                <Link to='/catagory'>
                <Button><AiOutlineArrowRight/></Button>
                </Link><br/>
                </div>
                <div className='col-md-6 list-group-item '>
                <h6>Go to Transaction Page</h6>
                <Link to='/transaction'>
                <Button><AiOutlineArrowRight/></Button>
                </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home