// src/app/training/components/FiltersSidebar.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface FiltersSidebarProps {
  categories: Array<{ id: string; name: string }>;
  levels: Array<{ id: string; name: string }>;
  selectedCategory: string;
  selectedLevel: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onPriceChange: (range: [number, number]) => void;
}

export default function FiltersSidebar({
  categories,
  levels,
  selectedCategory,
  selectedLevel,
  priceRange,
  onCategoryChange,
  onLevelChange,
  onPriceChange
}: FiltersSidebarProps) {
  
  // Handle slider change - ensure we always return a tuple [number, number]
  const handlePriceChange = (value: number[]) => {
    // Convert number[] to [number, number]
    if (value.length === 2) {
      onPriceChange([value[0], value[1]]);
    } else if (value.length === 1) {
      // If somehow we get a single value, use it for both min and max
      onPriceChange([value[0], value[0]]);
    } else {
      // Fallback to default range
      onPriceChange([0, 100]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Catégories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategory === category.id}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Level Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Niveau</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {levels.map(level => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level.id}`}
                checked={selectedLevel === level.id}
                onCheckedChange={() => onLevelChange(level.id)}
              />
              <Label htmlFor={`level-${level.id}`} className="text-sm font-normal">
                {level.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              min={0}
              max={100}
              step={5}
              onValueChange={handlePriceChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0]} FCFA</span>
              <span>{priceRange[1]} FCFA</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="certificate" />
            <Label htmlFor="certificate" className="text-sm font-normal">
              Avec certificat
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="subtitles" />
            <Label htmlFor="subtitles" className="text-sm font-normal">
              Sous-titres disponibles
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="resources" />
            <Label htmlFor="resources" className="text-sm font-normal">
              Ressources téléchargeables
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}