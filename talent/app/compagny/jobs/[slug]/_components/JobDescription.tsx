// src/app/companies/l-oreal/jobs/[slug]/components/JobDescription.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function JobDescription() {
  const jobSections = [
    {
      title: "Descriptif du poste",
      content: `STAGE 6 MOIS - À partir de janvier 2026 - Performance - CAUDRY- INGENIEUR - 200 000 FCFA mensuel

VENEZ VIVRE L'EXPÉRIENCE L'ORÉAL

Chez L'Oréal, c'est votre potentiel qui fait toute la différence.

Nous croyons qu'il est le moteur de tout : il se manifeste quand vous êtes authentique, s'enrichit quand vous entreprenez, et prend tout son sens lorsque vous réalisez l'impact que vous avez sur le monde. Dans un cadre stimulant, il se développe et vous permet de repousser vos limites.

Alors rejoignez nos équipes aux opérations en tant que stagiaire ingénieur performance.

Ce poste est basé à CAUDRY (59), près de Cambrai. Le permis de conduire ainsi qu'un véhicule personnel sont vivement recommandés pour accéder à notre site de production.

Présentation du poste :

Rattaché à l'ingénieur performance de l'unité de production 1, vous aurez comme missions :
- Chantier pertes global de l'UP (focus sur certains sujets articles/lignes et/ou jus)
- Automatisation de processus et de tâches au conditionnement (inventaires, procédures sur lignes, gestion organisationnelle)
- Suivi performance des lignes
- Sujets d'améliorations continue en soutien ou participant`
    },
    {
      title: "Profil recherché",
      content: `Votre profil :

Vous êtes étudiant en école d'ingénieur et vous recherchez un stage de fin d'étude.
Vous êtes autonome, proactif, force de proposition, vous aimez le travail en équipe et vous avez un esprit analytique.
Vous maîtrisez les outils digitaux.

Au-delà des compétences techniques, nous recherchons avant tout des personnalités avec un fort potentiel, un esprit entrepreneurial et la capacité à faire bouger les lignes.

Alors, si vous vous reconnaissez dans ce descriptif, n'hésitez plus à postuler.`
    },
    {
      title: "Ce que nous offrons",
      content: `- Une gratification de 1 700€ brut mensuel
- Prime transport à calculer au prorata du nombre de km de votre domicile au site de Caudry ou 60 % des frais de transport pris en charge par L'Oréal Groupe
- 1 jour de congé par mois
- Accès à L'Oréal Learning Platform pour booster votre développement
- Accès à la Vente Au Personnel à des tarifs préférentiels
- Accès au restaurant d'entreprise
- La vente flash Friends & Family pour votre entourage`
    },
    {
      title: "Notre processus de recrutement",
      content: `C'est ici que commence l'expérience L'Oréal !

Un entretien de 30 minutes avec un recruteur vous permettra de présenter votre personnalité et d'explorer les opportunités correspondant à votre profil.

Si cet entretien est concluant, vous rencontrerez ensuite votre potentiel futur manager pour un second et dernier entretien, d'une durée de 45 minutes à 1 heure, afin d'échanger sur les missions du poste.

Nb : N'hésitez pas consulter nos conseils sur notre page Youtube.

Et parce que l'égalité des chances et la diversité sont des valeurs fortes au sein du Groupe, en tant que leader de la beauté, nous considérons chaque candidature.

Quelle que soit votre identité de genre, votre orientation sexuelle, votre ou vos handicap(s) visible(s) et/ou invisible(s), vos origines sociales ou culturelles, votre état de santé, votre âge, votre religion ou tout autre élément qui vous rend unique, nos équipes étudieront votre profil avec attention.

Ici, vous pourrez être vous-même, oser, avoir un impact et grandir.

Alors, prêt à vivre l'expérience L'Oréal ?`
    }
  ];

  return (
    <div className="space-y-6">
      {jobSections.map((section, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {section.content}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}