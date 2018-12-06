import React from 'react'

export default ({value, onChange}) => (
    <input type="number" value={value} onChange={event => onChange(parseInt(event.target.value))} />
)