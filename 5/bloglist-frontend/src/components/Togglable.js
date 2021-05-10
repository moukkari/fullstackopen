import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(({ 
    preText = '', children, buttonLabel, cancelLabel = 'cancel', up = false 
  }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {toggleVisibility}
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {preText} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {up ? '' : children}
        {preText} <button onClick={toggleVisibility}>{cancelLabel}</button>
        {up ? <div><br/>{children}</div> : ''}
      </div>
    </div>
  )
})

export default Togglable