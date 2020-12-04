import React from 'react'

const Header = (props) => {
    console.log(props)
    return <h2>{props.course}</h2>   
}

export default Header