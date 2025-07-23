import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} Talent. All rights reserved.</p>
        <p className="text-xs mt-2">Designed with ❤️ by Your Company</p>
      </div>
    </footer>
  )
}

export default Footer
