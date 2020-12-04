import React from 'react'
import './Notification.css'

const Notification = ({msg, error}) => {
    if (msg === '' || msg === null) {
        return null
    } else if (error) {
        return <div className="error note">{msg}</div>
    } else {
        return <div className="info note">{msg}</div>
    }
}

export default Notification