"use client"
import React, { useState } from 'react'
import CompanyHeader from './_components/CompanyHeader'
import ProfileSection from './_components/ProfileSection';
import CompanyHeader2 from './_components/CompanyHeader2';

const page = () => {

 const [companyData, setCompanyData] = useState({
    name: "L'Oréal Groupe",
    industry: "Cosmétique, E-commerce, Luxe",
    location: "Clichy",
    website: "https://www.loreal.com",
    foundedYear: 1909,
    employees: 90000,
    genderRatio: "58% / 42%",
    revenue: "43,48 Mds €",
    description: `Notre Raison d'être : Créer la beauté qui fait avancer le monde.

Le désir de beauté est une force puissante qui nous fait avancer. La beauté ne se limite pas à l'apparence. Elle nous donne confiance en nous, en qui nous voulons être, et dans notre relation avec les autres.

Depuis plus d'un siècle, nous exerçons ce métier unique : créateur de beauté. Notre but est d'offrir à tous, partout dans le monde, le meilleur de la beauté en termes de qualité, d'efficacité, de sécurité et de sincérité pour satisfaire tous les besoins et désirs de beauté dans leur infinie diversité.`,
    benefits: [
      "Accès à la Vente Au Personnel à des tarifs préférentiels",
      "Télétravail ponctuel autorisé",
      "Accès à la cantine",
      "Accès à L'Oréal Learning Platform pour booster votre développement"
    ],
    commitments: [
      "Égalité hommes-femmes",
      "Développement durable",
      "Innovation sociale",
      "Diversité et inclusion"
    ]
  });

 

    const updateCompanyData = (newData: any) => {
    setCompanyData({ ...companyData, ...newData });
  };
    
  return (
    <div>
       <ProfileSection
                     companyData={companyData} 
                     onUpdate={updateCompanyData} 
                   />
        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, similique veniam saepe et maxime dolorem ipsam magni totam accusantium debitis. Autem quaerat rerum minus iusto suscipit, iure aspernatur deserunt amet?</p>
        <CompanyHeader2  companyData={companyData} 
                     onUpdate={updateCompanyData} />

                     <p><br /><br /><br /></p>
                     <p><br /><br /></p>
    </div>
  )
}

export default page
