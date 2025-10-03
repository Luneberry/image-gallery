import { useState } from 'react';
import { Download, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function ImageCard({ imageUrl, imageName, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const shareOnTwitter = () => {
    const text = `이 이미지를 확인해보세요!`;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`,
      '_blank'
    );
  };

  return (
    <div
      className="relative group aspect-square rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-card shimmer-effect"></div>
      )}

      <img
        src={imageUrl}
        alt={imageName}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={index < 4 ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg mb-3">
            {imageName}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
              aria-label="Download image"
            >
              <Download size={18} />
              <span className="text-sm font-medium">Download</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={shareOnTwitter}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-110"
                aria-label="Share on Twitter"
              >
                <Twitter size={18} />
              </button>
              <button
                onClick={shareOnFacebook}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-110"
                aria-label="Share on Facebook"
              >
                <Facebook size={18} />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-110"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
