// src/app/company/dashboard/a-la-une/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RiStarLine, 
  RiFireLine, 
  RiSearchLine, 
  RiExternalLinkLine,
  RiUserLine,
  RiGlobalLine,
  RiMoneyEuroCircleLine,
  RiTeamLine,
  RiCodeLine,
  RiLightbulbLine,
  
  RiShieldCheckLine,
  RiCalendarLine,
  RiMedalLine,
  RiFileTextLine,
  RiRobotLine,
  RiGraduationCapLine,
  RiBuildingLine,
  RiDingdingLine
} from '@remixicon/react';

// Types
interface Service {
  id: string;
  title: string;
  description: string;
  category: 'payment' | 'consulting' | 'recruitment' | 'freelance' | 'technology' | 'international' | 'accounting' | 'ai' | 'certification';
  status: 'active' | 'beta' | 'coming-soon';
  popularity: number;
  rating: number;
  users: number;
  price: string;
  features: string[];
  icon: any;
  color: string;
  url: string;
  image?: string;
  company?: string;
}

// Données mock étendues avec les nouvelles catégories
const mockServices: Service[] = [
  // Comptabilité et documents légaux
  {
    id: 'accounting-1',
    title: 'LegalFinance Pro',
    description: 'Solution complète de comptabilité, paiement et gestion des documents légaux',
    category: 'accounting',
    status: 'active',
    popularity: 92,
    rating: 4.9,
    users: 8900,
    price: 'À partir de 199€/mois',
    features: ['Comptabilité automatisée', 'Documents légaux', 'Paiements intégrés', 'Conformité fiscale'],
    icon: RiFileTextLine,
    color: '#059669',
    url: '#',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    company: 'LegalFinance Group'
  },
  {
    id: 'accounting-2',
    title: 'BizDoc Solutions',
    description: 'Gestion intégrée des documents légaux et services comptables pour PME',
    category: 'accounting',
    status: 'active',
    popularity: 87,
    rating: 4.7,
    users: 5400,
    price: '149€/mois',
    features: ['Signature électronique', 'Archivage cloud', 'Audit trail', 'Support expert'],
    icon: RiBuildingLine,
    color: '#DC2626',
    url: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    company: 'BizDoc Corporation'
  },

  // IA et Chatbots
  {
    id: 'ai-1',
    title: 'ChatBrain AI',
    description: 'Créez votre chatbot IA personnalisé avec vos données en quelques minutes',
    category: 'ai',
    status: 'active',
    popularity: 96,
    rating: 4.8,
    users: 15200,
    price: '79€/mois',
    features: ['Apprentissage automatique', 'Intégration données', 'Analytics', 'Multi-langues'],
    icon: RiRobotLine,
    color: '#7C3AED',
    url: '#',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    company: 'NeuroTech Labs'
  },
  {
    id: 'ai-2',
    title: 'DataBot Creator',
    description: 'Plateforme no-code pour créer des assistants IA basés sur vos documents',
    category: 'ai',
    status: 'beta',
    popularity: 89,
    rating: 4.6,
    users: 6800,
    price: '59€/mois',
    features: ['Interface drag-drop', 'API REST', 'Analytics temps réel', 'Support 24/7'],
    icon: RiCodeLine,
    color: '#0891B2',
    url: '#',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=250&fit=crop',
    company: 'AI Solutions Inc'
  },

  // Certification employés
  {
    id: 'certification-1',
    title: 'SkillCert Pro',
    description: 'Plateforme de certification en ligne pour développer les compétences de vos équipes',
    category: 'certification',
    status: 'active',
    popularity: 88,
    rating: 4.7,
    users: 12300,
    price: '29€/employé/mois',
    features: ['500+ formations', 'Certifications reconnues', 'Tracking progrès', 'Rapports détaillés'],
    icon: RiGraduationCapLine,
    color: '#EA580C',
    url: '#',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    company: 'EduTech Global'
  },
  {
    id: 'certification-2',
    title: 'TalentBoost Academy',
    description: 'Solutions de formation et certification pour monter en compétences',
    category: 'certification',
    status: 'active',
    popularity: 85,
    rating: 4.8,
    users: 8700,
    price: 'Abonnement entreprise',
    features: ['Formations personnalisées', 'Coach dédié', 'Badges numériques', 'Mobile learning'],
    icon: RiMedalLine,
    color: '#CA8A04',
    url: '#',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
    company: 'TalentBoost Partners'
  },

  // Outils de paiement (existants)
  {
    id: 'pay-tool-1',
    title: 'PayFlow Pro',
    description: 'Solution de paiement en ligne complète avec gestion des transactions internationales',
    category: 'payment',
    status: 'active',
    popularity: 95,
    rating: 4.8,
    users: 12500,
    price: 'À partir de 29€/mois',
    features: ['Paiements multidevises', 'Fraude detection', 'API REST', 'Reporting temps réel'],
    icon: RiMoneyEuroCircleLine,
    color: '#10B981',
    url: '#',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    company: 'PayFlow Technologies'
  },

  // Consulting Data & Digital (existants)
  {
    id: 'consult-1',
    title: 'DataTransform Consulting',
    description: 'Cabinet de conseil en transformation digitale et analyse de données',
    category: 'consulting',
    status: 'active',
    popularity: 92,
    rating: 4.9,
    users: 450,
    price: 'Sur devis',
    features: ['Audit digital', 'Stratégie data', 'Transformation IA', 'Accompagnement'],
    icon: RiDingdingLine,
    color: '#8B5CF6',
    url: '#',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    company: 'DataTransform Group'
  },

  // Ajout de 3 services supplémentaires pour compléter
  {
    id: 'international-3',
    title: 'GlobalWork Visa',
    description: 'Service complet de gestion des visas et travail international',
    category: 'international',
    status: 'active',
    popularity: 84,
    rating: 4.7,
    users: 3200,
    price: 'Forfait par employé',
    features: ['Gestion visas', 'Relocation', 'Conformité légale', 'Support dédié'],
    icon: RiGlobalLine,
    color: '#2563EB',
    url: '#',
    image: 'https://images.unsplash.com/photo-1527689361194-b3c5e85a7a79?w=400&h=250&fit=crop',
    company: 'GlobalWork Solutions'
  },
  {
    id: 'freelance-3',
    title: 'ExpertNetwork',
    description: 'Réseau de freelances experts vérifiés pour vos projets critiques',
    category: 'freelance',
    status: 'active',
    popularity: 91,
    rating: 4.9,
    users: 15600,
    price: 'Commission 8%',
    features: ['Experts senior', 'Quality guarantee', 'Project management', 'Payment protection'],
    icon: RiUserLine,
    color: '#DB2777',
    url: '#',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop',
    company: 'ExpertNetwork Ltd'
  },
  {
    id: 'technology-1',
    title: 'CloudScale Infrastructure',
    description: 'Solutions cloud scalables pour entreprises en croissance',
    category: 'technology',
    status: 'active',
    popularity: 89,
    rating: 4.6,
    users: 9800,
    price: 'Sur mesure',
    features: ['Infrastructure cloud', 'Sécurité avancée', 'Support 24/7', 'Scalabilité'],
    icon: RiShieldCheckLine,
    color: '#059669',
    url: '#',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    company: 'CloudScale Technologies'
  }
];

const categories = [
  { id: 'all', label: 'Tous les services', icon: RiStarLine, count: mockServices.length },
  { id: 'payment', label: 'Paiement', icon: RiMoneyEuroCircleLine, count: mockServices.filter(s => s.category === 'payment').length },
  { id: 'accounting', label: 'Comptabilité & Légal', icon: RiFileTextLine, count: mockServices.filter(s => s.category === 'accounting').length },
  { id: 'ai', label: 'IA & Chatbots', icon: RiRobotLine, count: mockServices.filter(s => s.category === 'ai').length },
  { id: 'certification', label: 'Certification', icon: RiGraduationCapLine, count: mockServices.filter(s => s.category === 'certification').length },
  { id: 'consulting', label: 'Consulting', icon: RiDingdingLine, count: mockServices.filter(s => s.category === 'consulting').length },
  { id: 'international', label: 'International', icon: RiGlobalLine, count: mockServices.filter(s => s.category === 'international').length },
  { id: 'freelance', label: 'Freelance', icon: RiUserLine, count: mockServices.filter(s => s.category === 'freelance').length },
];

export default function ALaUnePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredServices = mockServices
    .filter(service => 
      (activeCategory === 'all' || service.category === activeCategory) &&
      (service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       service.company?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity': return b.popularity - a.popularity;
        case 'rating': return b.rating - a.rating;
        case 'users': return b.users - a.users;
        default: return 0;
      }
    });

  const getStatusBadge = (status: Service['status']) => {
    const config = {
      active: { label: 'Actif', variant: 'default' as const, color: 'green' },
      beta: { label: 'Beta', variant: 'secondary' as const, color: 'blue' },
      'coming-soon': { label: 'Bientôt', variant: 'outline' as const, color: 'gray' }
    };
    
    const { label, variant } = config[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatUsers = (users: number) => {
    if (users >= 1000) return `${(users / 1000).toFixed(1)}k`;
    return users.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <RiFireLine className="h-4 w-4 mr-1" />
              NOUVEAUTÉS 2024
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Écosystème de services 
              <span className="text-blue-600"> professionnels</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Découvrez les meilleures solutions pour chaque aspect de votre entreprise : 
              IA, comptabilité, certification, recrutement international et bien plus encore
            </p>

            {/* Barre de recherche */}
            <div className="relative max-w-2xl mx-auto">
              <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher un service, une entreprise, une solution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Statistiques Globales */}
        <GlobalStats />

        {/* Services Tendances */}
        <TrendingServices services={mockServices} />

        {/* Filtres et tris */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Catégories */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="flex flex-col items-center gap-1 h-auto p-3"
                >
                  <category.icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{category.label}</span>
                  <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Tri */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Trier par :</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="popularity">Popularité</option>
              <option value="rating">Note</option>
              <option value="users">Utilisateurs</option>
            </select>
          </div>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Message vide */}
        {filteredServices.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <RiSearchLine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun service trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou explorez une autre catégorie
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                Voir tous les services
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CTA Final */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-12 mt-12">
          <CardContent>
            <h2 className="text-2xl font-bold mb-2">Vous proposez un service professionnel ?</h2>
            <p className="text-blue-100 mb-6">
              Rejoignez notre écosystème et présentez votre solution à des milliers d'entreprises innovantes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Proposer un service
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                Devenir partenaire
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composant Carte de Service amélioré avec image
function ServiceCard({ service }: { service: Service }) {
  const IconComponent = service.icon;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden">
      {/* Image en en-tête */}
      {service.image && (
        <div className="h-40 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${service.color}20` }}
            >
              <IconComponent 
                className="h-5 w-5" 
                style={{ color: service.color }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{service.title}</h3>
              {service.company && (
                <p className="text-sm text-gray-600">{service.company}</p>
              )}
            </div>
          </div>
          {getStatusBadge(service.status)}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {service.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{service.features.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Métriques */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <RiUserLine className="h-4 w-4" />
              <span>{formatUsers(service.users)} utilisateurs</span>
            </div>
            <div className="flex items-center gap-1">
              <RiStarLine className="h-4 w-4 text-yellow-500" />
              <span>{service.rating}</span>
            </div>
          </div>
          <div className="font-semibold" style={{ color: service.color }}>
            {service.price}
          </div>
        </div>

        {/* Action */}
        <Button 
          className="w-full group-hover:shadow-lg transition-shadow font-semibold"
          style={{ backgroundColor: service.color }}
          size="lg"
        >
          {service.status === 'coming-soon' ? 'Pré-inscription' : 'Découvrir'}
          <RiExternalLinkLine className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

// Composant Statistiques Globales
function GlobalStats() {
  const stats = [
    { label: 'Services actifs', value: mockServices.length.toString(), icon: RiStarLine },
    { label: 'Entreprises satisfaites', value: '15K+', icon: RiBuildingLine },
    { label: 'Pays desservis', value: '80+', icon: RiGlobalLine },
    { label: 'Taux de satisfaction', value: '98%', icon: RiMedalLine },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Section Services Tendances
function TrendingServices({ services }: { services: Service[] }) {
  const trendingServices = services
    .filter(service => service.popularity >= 90)
    .slice(0, 3);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <RiFireLine className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-900">Services tendances du moment</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingServices.map(service => (
          <Card key={service.id} className="border-orange-200 bg-orange-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon className="h-5 w-5" style={{ color: service.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <Badge variant="default" className="bg-orange-500">🔥 Trending</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              <Button size="sm" style={{ backgroundColor: service.color }} className="w-full">
                Découvrir maintenant
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Fonction helper pour les badges de statut
function getStatusBadge(status: Service['status']) {
  const config = {
    active: { label: 'Actif', variant: 'default' as const },
    beta: { label: 'Beta', variant: 'secondary' as const },
    'coming-soon': { label: 'Bientôt', variant: 'outline' as const }
  };
  
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// Fonction helper pour formater les nombres d'utilisateurs
function formatUsers(users: number) {
  if (users >= 1000000) return `${(users / 1000000).toFixed(1)}M`;
  if (users >= 1000) return `${(users / 1000).toFixed(1)}k`;
  return users.toString();
}