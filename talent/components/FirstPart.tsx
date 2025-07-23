import React from 'react'

const FirstPart = () => {
  return (
    <section>
        <div className="flex flex-col items-center p-7 h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenue sur Talent.</h1>
            <p className="text-lg text-gray-700 mb-6">Votre plateforme de formation et de recrutement partout en Côte d'ivoire</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Commencer
            </button>
        </div>
    </section>
  )
}

export default FirstPart
