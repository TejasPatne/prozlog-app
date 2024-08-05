import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div className='mt-10 p-3'>
        <p className="text-center text-gray-400">Copyright &copy; {year} Vivekanand Education Society's Institute of Technology, Mumbai</p>
    </div>
  )
}

export default Footer