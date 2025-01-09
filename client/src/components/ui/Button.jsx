import React from 'react'

const Button = ({ button, handleEvent }) => {
    return (
        <button className='px-4 py-2 bg-transparent border border-hover text-white text-sm font-normal rounded-full hover:bg-hover' onClick={handleEvent}>
            {button}
        </button>
    )
}

export default Button