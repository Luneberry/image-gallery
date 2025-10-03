import { useState, useEffect } from 'react';
import ImageCard from './ImageCard';

const CDN_URL = 'https://cdn.jsdelivr.net/gh/Luneberry/image-gallery@main/';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);

  useEffect(() => {
    const checkImages = async () => {
      const foundImages = [];
      let imageNumber = 1;
      let failures = 0;

      while (failures < 3) {
        const imageUrl = `${CDN_URL}${imageNumber}.png`;

        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });

          if (response.ok) {
            foundImages.push({
              url: imageUrl,
              name: `Image ${imageNumber}`,
              number: imageNumber,
            });
            failures = 0;
          } else {
            failures++;
          }
        } catch (error) {
          failures++;
        }

        imageNumber++;
      }

      setImages(foundImages);
      setLoading(false);
      setConsecutiveFailures(failures);
    };

    checkImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-card shimmer-effect"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            이미지를 찾을 수 없습니다
          </h2>
          <p className="text-foreground/60">
            갤러리에 표시할 이미지가 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <ImageCard
              key={image.number}
              imageUrl={image.url}
              imageName={image.name}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
