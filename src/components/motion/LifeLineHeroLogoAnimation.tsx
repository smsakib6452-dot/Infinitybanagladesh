import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getAssetUrl } from '../../lib/utils/assetHelper';

interface LifeLineHeroLogoAnimationProps {
  logoUrl?: string;
  logoSize?: number;
  logoZoom?: number;
  logoCrop?: React.CSSProperties['objectFit'];
  onAnimationComplete?: () => void;
}

export const LifeLineHeroLogoAnimation: React.FC<LifeLineHeroLogoAnimationProps> = ({
  logoUrl = '/brand/Infinitylifeline-logo.svg',
  logoSize = 480,
  logoZoom = 1,
  logoCrop = 'contain',
  onAnimationComplete
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [animationPhase, setAnimationPhase] = useState<
    'idle' | 'falling' | 'impact' | 'pulse' | 'settled'
  >(() => (shouldReduceMotion ? 'settled' : 'idle'));

  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimationPhase('settled');
      onAnimationComplete?.();
      return;
    }

    if (hasAnimatedRef.current) {
      setAnimationPhase('settled');
      return;
    }

    hasAnimatedRef.current = true;

    // Start falling drop shortly after mount (50ms)
    const tStart = setTimeout(() => {
      setAnimationPhase('falling');
    }, 50);

    // Drop reaches target & merges at ~750ms
    const tImpact = setTimeout(() => {
      setAnimationPhase('impact');
    }, 750);

    // Heartbeat pulse & ECG life signal at ~850ms
    const tPulse = setTimeout(() => {
      setAnimationPhase('pulse');
    }, 850);

    // Settle cleanly back to pristine static state at ~1250ms
    const tSettle = setTimeout(() => {
      setAnimationPhase('settled');
      onAnimationComplete?.();
    }, 1250);

    return () => {
      clearTimeout(tStart);
      clearTimeout(tImpact);
      clearTimeout(tPulse);
      clearTimeout(tSettle);
    };
  }, [shouldReduceMotion, onAnimationComplete]);

  // Target coordinates inside the 1903 x 826 viewBox of Infinitylifeline-logo.svg
  // Drop center: x ≈ 333 / 1903 = 17.5%, y ≈ 413 / 826 = 50.0%
  const targetLeftPercent = 17.5;
  const targetTopPercent = 50.0;

  return (
    <div
      className="relative select-none"
      style={{
        width: `${logoSize}px`,
        maxWidth: '100%'
      }}
    >
      {/* 1. Main Logo Image (Source of Truth - Preserved Exactly) */}
      <motion.div
        animate={
          animationPhase === 'pulse' && !shouldReduceMotion
            ? { scale: [1, 1.025, 1], transition: { duration: 0.35, ease: 'easeOut' } }
            : { scale: 1 }
        }
        className="relative w-full overflow-visible"
      >
        <img
          src={getAssetUrl(logoUrl)}
          alt="Infinity LifeLine - One Drop, Infinite Hope"
          style={{
            transform: `scale(${logoZoom})`,
            transformOrigin: 'left center',
            objectFit: logoCrop
          }}
          className="w-full h-auto object-contain mx-auto lg:mx-0 drop-shadow-md transition-all duration-200"
          loading="eager"
        />

        {/* 2. Cinematic Animation Overlays (Only active during 0 - 1.25s opening sequence) */}
        {!shouldReduceMotion && animationPhase !== 'settled' && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* A. The Single Falling Blood Drop */}
            {(animationPhase === 'falling' || animationPhase === 'impact') && (
              <motion.div
                initial={{
                  x: '-50%',
                  y: '-80px',
                  scaleX: 0.85,
                  scaleY: 1.2,
                  opacity: 0
                }}
                animate={
                  animationPhase === 'falling'
                    ? {
                        y: ['-80px', '-40px', '0px'],
                        opacity: [0, 1, 1],
                        scaleX: [0.85, 0.9, 1],
                        scaleY: [1.2, 1.1, 1],
                        transition: {
                          duration: 0.7,
                          ease: [0.45, 0.05, 0.25, 1]
                        }
                      }
                    : {
                        scale: [1, 1.25, 0],
                        opacity: [1, 0.8, 0],
                        transition: { duration: 0.2, ease: 'easeOut' }
                      }
                }
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent}%`,
                  top: `${targetTopPercent}%`
                }}
                className="z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              >
                {/* Handcrafted Luminous Ruby Blood Drop SVG */}
                <svg
                  viewBox="0 0 24 32"
                  className="w-5 h-7 sm:w-6 sm:h-8 filter drop-shadow-[0_4px_12px_rgba(225,29,72,0.7)]"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="dropGrad" x1="12" y1="0" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FB7185" />
                      <stop offset="40%" stopColor="#E11D48" />
                      <stop offset="100%" stopColor="#9F1239" />
                    </linearGradient>
                    <radialGradient id="dropGlint" cx="30%" cy="30%" r="40%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Teardrop Geometry */}
                  <path
                    d="M12 1.5 C12 1.5 2.5 14.5 2.5 21 C2.5 26.2467 6.75329 30.5 12 30.5 C17.2467 30.5 21.5 26.2467 21.5 21 C21.5 14.5 12 1.5 12 1.5 Z"
                    fill="url(#dropGrad)"
                  />
                  {/* Subtle Inner Highlight Glint */}
                  <ellipse cx="8.5" cy="17" rx="3" ry="5.5" fill="url(#dropGlint)" transform="rotate(-15 8.5 17)" />
                </svg>
              </motion.div>
            )}

            {/* B. Merge Ripple & Activation Glow Wave */}
            {(animationPhase === 'impact' || animationPhase === 'pulse') && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: [0.6, 1.4, 2.0],
                  opacity: [0, 0.75, 0]
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent}%`,
                  top: `${targetTopPercent}%`
                }}
                className="z-10 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-radial from-rose-500/50 via-rose-600/20 to-transparent pointer-events-none"
              />
            )}

            {/* C. ECG / Heartbeat Horizontal Life Signal Beam */}
            {(animationPhase === 'impact' || animationPhase === 'pulse') && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scaleX: [0.3, 1.1, 1.3]
                }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent + 2}%`,
                  top: `${targetTopPercent}%`,
                  transformOrigin: 'left center'
                }}
                className="z-10 -translate-y-1/2 h-8 w-28 sm:w-36 bg-radial from-emerald-400/40 via-emerald-500/15 to-transparent blur-xs pointer-events-none"
              />
            )}

            {/* D. Ambient Soft Radial Heartbeat Pulse Aura */}
            {animationPhase === 'pulse' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0.9, 1.2, 1.3]
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 bg-radial from-emerald-500/20 via-transparent to-transparent rounded-full blur-xl pointer-events-none"
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
