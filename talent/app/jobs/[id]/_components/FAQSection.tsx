// // src/app/companies/l-oreal/jobs/[slug]/components/FAQSection.tsx
// import { Card, CardContent } from "@/components/ui/card";

// export default function FAQSection() {
//   const faqs = [
//     {
//       question: "Le télétravail est-il possible pour ce poste ?",
//       answer: "Oui, cette offre propose un télétravail fréquent comme indiqué dans les détails du poste."
//     },
//     {
//       question: "Quel est le type de contrat pour ce poste ?",
//       answer: "Il s'agit d'un stage de 6 mois à partir de janvier 2026."
//     }
//   ];

//   return (
//     <Card>
//       <CardContent className="p-6">
//         <h2 className="text-xl font-bold mb-4">Questions et réponses sur l'offre</h2>
//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div key={index}>
//               <h3 className="font-semibold text-gray-900">{faq.question}</h3>
//               <p className="text-gray-600 mt-1">{faq.answer}</p>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }





// src/app/jobs/[id]/_components/FAQSection.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { FormattedJobPosting } from "@/types/jobPosting";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQSectionProps {
  job: FormattedJobPosting;
}

export default function FAQSection({ job }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const formatContractType = (contract: string) => {
    const contractMap: { [key: string]: string } = {
      'FULL_TIME': 'CDI',
      'PART_TIME': 'Temps partiel',
      'CONTRACT': 'CDD',
      'INTERNSHIP': 'Stage',
      'TEMPORARY': 'Intérim'
    };
    return contractMap[contract] || contract;
  };

  const formatRemotePolicy = (policy: string) => {
    const policyMap: { [key: string]: string } = {
      'ONSITE': 'Présentiel',
      'HYBRID': 'Hybride',
      'REMOTE': 'Distanciel'
    };
    return policyMap[policy] || policy;
  };

  const formatExperienceLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'INTERNSHIP': 'Stage',
      'ENTRY_LEVEL': 'Débutant',
      'JUNIOR': 'Junior',
      'MID_LEVEL': 'Intermédiaire',
      'SENIOR': 'Senior',
      'LEAD': 'Lead',
      'EXECUTIVE': 'Direction'
    };
    return levelMap[level] || level;
  };

  const faqs = [
    {
      question: "Le télétravail est-il possible pour ce poste ?",
      answer: `Cette offre propose un travail ${formatRemotePolicy(job.remotePolicy).toLowerCase()}. ${
        job.remotePolicy === 'HYBRID' 
          ? 'Le poste combine travail en présentiel et à distance.' 
          : job.remotePolicy === 'REMOTE'
          ? 'Le poste peut être exercé entièrement à distance.'
          : 'Le poste nécessite une présence sur site.'
      }`
    },
    {
      question: "Quel est le type de contrat proposé ?",
      answer: `Il s'agit d'un ${formatContractType(job.contract).toLowerCase()}. ${
        job.contract === 'INTERNSHIP'
          ? 'Ce stage peut déboucher sur une embauche selon les performances.'
          : job.contract === 'FULL_TIME'
          ? 'Contrat à durée indéterminée avec période d\'essai.'
          : 'Contrat offrant une grande flexibilité.'
      }`
    },
    {
      question: "Quel niveau d'expérience est requis ?",
      answer: `Nous recherchons un profil ${formatExperienceLevel(job.experienceLevel).toLowerCase()}. ${
        job.experienceLevel === 'INTERNSHIP' || job.experienceLevel === 'ENTRY_LEVEL'
          ? 'Idéal pour les jeunes diplômés ou personnes en reconversion.'
          : job.experienceLevel === 'SENIOR' || job.experienceLevel === 'EXECUTIVE'
          ? 'Poste nécessitant une expertise confirmée dans le domaine.'
          : 'Niveau intermédiaire avec quelques années d\'expérience.'
      }`
    },
    {
      question: "Où se situe le poste ?",
      answer: `Le poste est basé à ${job.location}. ${
        job.remotePolicy !== 'ONSITE'
          ? 'Des déplacements occasionnels peuvent être nécessaires.'
          : 'Le travail s\'effectue exclusivement sur site.'
      }`
    },
    {
      question: "Comment se déroule le processus de recrutement ?",
      answer: `Le processus typique comprend :\n• Analyse de votre candidature sous 48h\n• Entretien téléphonique avec le recrutement\n• Entretien technique avec l'équipe\n• Éventuel test pratique\n• Décision finale sous 1-2 semaines\n\nNous nous engageons à vous tenir informé à chaque étape.`
    },
    {
      question: "Quand puis-je commencer ?",
      answer: `La date de début est flexible selon votre disponibilité. Nous pouvons discuter d'une période d'intégration adaptée à votre situation actuelle. En général, les embauches se font sous 1 à 3 mois selon le niveau du poste.`
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Questions fréquentes sur l'offre</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg transition-all duration-200 hover:border-gray-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <div className="border-t pt-4">
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Une question spécifique ?</h4>
          <p className="text-blue-700 text-sm">
            N'hésitez pas à nous contacter directement si vous avez des questions supplémentaires 
            sur le poste, l'entreprise ou le processus de recrutement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}