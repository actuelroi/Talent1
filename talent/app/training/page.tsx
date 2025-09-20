// src/app/training/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import FiltersSidebar from './_compoenents/FiltersSidebar';
import CourseGrid from './_compoenents/CourseGrid';
import FooterSection from '../compagny/_components/FooterSection';


// Mock data for courses - in a real app, this would come from an API

const mockCourses = [
  {
    id: '1',
    title: 'Introduction au Marketing Digital',
    description: 'Apprenez les bases du marketing digital et développez vos compétences en stratégie digitale.',
    category: 'marketing',
    level: 'beginner',
    duration: '4h 30min',
    instructor: 'Marie Dupont',
    rating: 4.7,
    students: 1250,
    price: 49,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true
  },
  {
    id: '2',
    title: 'Développement Web avec React',
    description: 'Maîtrisez React.js et construisez des applications web modernes et réactives.',
    category: 'development',
    level: 'intermediate',
    duration: '12h 15min',
    instructor: 'Pierre Martin',
    rating: 4.8,
    students: 2890,
    price: 79,
    image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true
  },
  {
    id: '3',
    title: 'Gestion de Projet Agile',
    description: 'Découvrez les méthodologies Agile et devenez un chef de projet efficace.',
    category: 'business',
    level: 'intermediate',
    duration: '8h 45min',
    instructor: 'Sophie Lambert',
    rating: 4.6,
    students: 980,
    price: 59,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'Data Science pour Débutants',
    description: 'Initiez-vous à la data science avec Python et les bibliothèques essentielles.',
    category: 'data',
    level: 'beginner',
    duration: '10h 30min',
    instructor: 'Thomas Bernard',
    rating: 4.5,
    students: 1560,
    price: 0,
    image: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'UI/UX Design Avancé',
    description: 'Perfectionnez vos compétences en design d interface et expérience utilisateur.',
    category: 'design',
    level: 'advanced',
    duration: '14h 20min',
    instructor: 'Julie Moreau',
    rating: 4.9,
    students: 870,
    price: 0,
    image: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '6',
    title: 'Anglais des Affaires',
    description: 'Améliorez votre anglais professionnel pour exceller en environnement international.',
    category: 'language',
    level: 'intermediate',
    duration: '16h 40min',
    instructor: 'John Smith',
    rating: 4.7,
    students: 2100,
    price: 0,
    image: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '7',
    title: 'Growth Hacking Strategies',
    description: 'Découvrez les techniques de growth hacking pour booster votre business.',
    category: 'marketing',
    level: 'advanced',
    duration: '7h 15min',
    instructor: 'Marc Dubois',
    rating: 4.8,
    students: 1320,
    price: 50000,
    image: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '8',
    title: 'Introduction à l Intelligence Artificielle',
    description: 'Comprenez les bases de l IA et ses applications dans le monde réel.',
    category: 'data',
    level: 'beginner',
    duration: '9h 10min',
    instructor: 'Dr. Alice Martin',
    rating: 4.6,
    students: 1950,
    price: 25000,
    image: '/api/placeholder/300/200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'Toutes les catégories' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'development', name: 'Développement' },
  { id: 'design', name: 'Design' },
  { id: 'business', name: 'Business' },
  { id: 'data', name: 'Data Science' },
  { id: 'language', name: 'Langues' }
];

// Levels for filtering
const levels = [
  { id: 'all', name: 'Tous les niveaux' },
  { id: 'beginner', name: 'Débutant' },
  { id: 'intermediate', name: 'Intermédiaire' },
  { id: 'advanced', name: 'Avancé' }
];

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Filter courses based on selected filters
  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      case 'popular':
      default:
        return b.students - a.students;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Développez vos compétences</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Découvrez nos programmes de formation et cours en ligne pour booster votre carrière
            </p>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un cours, une compétence..."
                className="w-full px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <FiltersSidebar
                categories={categories}
                levels={levels}
                selectedCategory={selectedCategory}
                selectedLevel={selectedLevel}
                priceRange={priceRange}
                onCategoryChange={setSelectedCategory}
                onLevelChange={setSelectedLevel}
                onPriceChange={setPriceRange}
              />
            </div>

            {/* Courses Grid */}
            <div className="lg:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {sortedCourses.length} cours disponibles
                  </h2>
                  <p className="text-gray-600">
                    Filtrez selon vos besoins et intérêts
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                    Trier par:
                  </label>
                  <select
                    id="sort"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Popularité</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="price-low">Prix (croissant)</option>
                    <option value="price-high">Prix (décroissant)</option>
                    <option value="newest">Plus récent</option>
                  </select>
                </div>
              </div>

              <CourseGrid courses={sortedCourses} />
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}