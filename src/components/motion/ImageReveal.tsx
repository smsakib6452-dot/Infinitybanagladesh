import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio = 'aspect-[16/10]'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden relative ${aspectRatio} ${className}`}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px', amount: 0.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden relative ${aspectRatio} ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-90 scale-102'
        } ${imgClassName}`}
      />
    </motion.div>
  );
};
