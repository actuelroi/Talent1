// src/app/training/components/VideoPlayer.tsx (Enhanced)
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Play } from 'lucide-react';
import { useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  previewImage: string;
  onClose: () => void;
}

// Utility function to extract YouTube video ID
const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

export default function VideoPlayer({ videoUrl, previewImage, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  const youtubeId = getYouTubeId(videoUrl);
  const thumbnailUrl = youtubeId && !imageError
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : previewImage;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-black">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-gray-800 text-white hover:bg-gray-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="aspect-video">
            {!isPlaying ? (
              <div className="relative w-full h-full">
                <img
                  src={thumbnailUrl}
                  alt="Video preview"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <Button
                    onClick={handlePlay}
                    className="bg-blue-600 hover:bg-blue-700 rounded-full p-4"
                    size="lg"
                  >
                    <Play className="h-8 w-8 fill-current" />
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                src={videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}