// src/app/training/components/CourseCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock, Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  videoUrl: string;
  featured?: boolean;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  const formatCategory = (category: string) => {
    const categories: { [key: string]: string } = {
      marketing: 'Marketing',
      development: 'Développement',
      design: 'Design',
      business: 'Business',
      data: 'Data Science',
      language: 'Langues'
    };
    return categories[category] || category;
  };

  const formatLevel = (level: string) => {
    const levels: { [key: string]: string } = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé'
    };
    return levels[level] || level;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div 
          className="h-48 bg-gray-200 relative cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-white rounded-full p-3">
              <Play className="h-6 w-6 text-blue-600 fill-current" />
            </div>
          </div>
          {course.featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
              Populaire
            </div>
          )}
        </div>

        {showVideo && (
          <VideoPlayer 
            videoUrl={course.videoUrl}
            previewImage={course.image}
            onClose={() => setShowVideo(false)}
          />
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {formatCategory(course.category)}
          </span>
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {formatLevel(course.level)}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span>Par {course.instructor}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            {course.price === 0 ? 'Gratuit' : `${course.price} FCFA`}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            S'inscrire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}