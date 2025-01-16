<<<<<<< HEAD
import React from 'react'

const Button = ({ button, handleEvent }) => {
    return (
        <button className='px-4 py-2 bg-transparent border border-hover text-white text-sm font-normal rounded-full hover:bg-hover' onClick={handleEvent}>
            {button}
        </button>
    )
}

=======
import React from 'react'

const Button = ({ button, handleEvent }) => {
    return (
        <button className='px-4 py-2 bg-transparent border border-hover text-white text-sm font-normal rounded-full hover:bg-hover' onClick={handleEvent}>
            {button}
        </button>
    )
}

>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
export default Button