"use client"
import React from 'react'
import axios from 'axios'
import { Button } from '@mui/material'

const Coffee = () => {
  const getDataByYear = async () => {
    const response = await axios.get('http://127.0.0.1:5000/yearly', {
      params: {
        resource: 'coffee'
      }
    }).then((res) => {return res.data})
    console.log(response)
  }
  
  return (
    <Button variant='contained' onClick={getDataByYear}>
      PRESS
    </Button>
  )
}

export default Coffee