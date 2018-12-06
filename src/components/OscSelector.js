import React from 'react'

export default ({ selected, onChange }) => {
    return (
        <div>
            <button
                style={{ color: selected === 'sine' ? 'blue' : 'orange' }}
                onClick={() => onChange('sine')}> SINE
            </button>

            <button
                style={{ color: selected === 'square' ? 'blue' : 'orange' }}
                onClick={() => onChange('square')}> SQUARE
            </button>

        </div>
    )
}