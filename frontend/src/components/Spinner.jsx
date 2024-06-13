import React from 'react'
import HashLoader from "react-spinners/HashLoader";


const Spinner = () => {
    const color = {
        display: 'block',
        width: '30px',
        margin: '0 auto'
    }
  return (
    <>
      <HashLoader
       color='#35C2A8'
       cssOverride={color}
       loading={true}
      />
    </>
  )
}

export default Spinner
