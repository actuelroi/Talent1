// src/app/companies/l-oreal/jobs/[slug]/components/FAQSection.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function FAQSection() {
  const faqs = [
    {
      question: "Le télétravail est-il possible pour ce poste ?",
      answer: "Oui, cette offre propose un télétravail fréquent comme indiqué dans les détails du poste."
    },
    {
      question: "Quel est le type de contrat pour ce poste ?",
      answer: "Il s'agit d'un stage de 6 mois à partir de janvier 2026."
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Questions et réponses sur l'offre</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}