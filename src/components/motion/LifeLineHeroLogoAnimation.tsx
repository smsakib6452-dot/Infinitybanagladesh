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
    'idle' | 'falling' | 'impact' | 'pulse' | 'settling' | 'settled'
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

    // Timeline matching exact 1.5s visual infographic specification:
    // 0ms: Hero starts clean
    // 100ms: Drop begins falling from (x: 20.7%, y: -100px)
    const tStart = setTimeout(() => {
      setAnimationPhase('falling');
    }, 100);

    // 750ms: Drop lands directly on logo blood drop & merges
    const tImpact = setTimeout(() => {
      setAnimationPhase('impact');
    }, 750);

    // 880ms: Blood drop glows + single ECG heartbeat pulse activates
    const tPulse = setTimeout(() => {
      setAnimationPhase('pulse');
    }, 880);

    // 1200ms: Glow softly settles
    const tSettling = setTimeout(() => {
      setAnimationPhase('settling');
    }, 1200);

    // 1500ms: Back to 100% normal pristine static state
    const tSettle = setTimeout(() => {
      setAnimationPhase('settled');
      onAnimationComplete?.();
    }, 1500);

    return () => {
      clearTimeout(tStart);
      clearTimeout(tImpact);
      clearTimeout(tPulse);
      clearTimeout(tSettling);
      clearTimeout(tSettle);
    };
  }, [shouldReduceMotion, onAnimationComplete]);

  // Exact target coordinates specified in infographic:
  // Drop center: x = 20.7%, y = 49.5%
  const targetLeftPercent = 20.7;
  const targetTopPercent = 49.5;

  return (
    <div
      className="relative select-none"
      style={{
        width: `${logoSize}px`,
        maxWidth: '100%'
      }}
    >
      {/* 1. Main Logo (Source of Truth - Untouched & Preserved) */}
      <motion.div
        animate={
          animationPhase === 'pulse' && !shouldReduceMotion
            ? { scale: [1, 1.028, 1], transition: { duration: 0.35, ease: 'easeOut' } }
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

        {/* 2. Signature Cinematic Overlay Elements (Active only during opening sequence) */}
        {!shouldReduceMotion && animationPhase !== 'settled' && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* A. The Single Falling Blood Drop (Origin: x: 20.7%, y: -100px -> Target: x: 20.7%, y: 49.5%) */}
            {(animationPhase === 'falling' || animationPhase === 'impact') && (
              <motion.div
                initial={{
                  x: '-50%',
                  y: '-100px',
                  scaleX: 0.85,
                  scaleY: 1.22,
                  opacity: 0
                }}
                animate={
                  animationPhase === 'falling'
                    ? {
                        y: ['-100px', '-45px', '0px'],
                        opacity: [0, 1, 1],
                        scaleX: [0.85, 0.9, 1],
                        scaleY: [1.22, 1.1, 1],
                        transition: {
                          duration: 0.65,
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
                className="z-30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              >
                {/* Luminous Brand Red Teardrop SVG (#E63946) */}
                <svg
                  viewBox="0 0 24 32"
                  className="w-5 h-7 sm:w-6 sm:h-8 filter drop-shadow-[0_4px_14px_rgba(230,57,70,0.85)]"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="lifelineDropGrad" x1="12" y1="0" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF6B7A" />
                      <stop offset="35%" stopColor="#E63946" />
                      <stop offset="100%" stopColor="#9B111E" />
                    </linearGradient>
                    <radialGradient id="lifelineDropGlint" cx="30%" cy="30%" r="40%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M12 1.5 C12 1.5 2.5 14.5 2.5 21 C2.5 26.2467 6.75329 30.5 12 30.5 C17.2467 30.5 21.5 26.2467 21.5 21 C21.5 14.5 12 1.5 12 1.5 Z"
                    fill="url(#lifelineDropGrad)"
                  />
                  <ellipse cx="8.5" cy="17" rx="3" ry="5.5" fill="url(#lifelineDropGlint)" transform="rotate(-15 8.5 17)" />
                </svg>
              </motion.div>
            )}

            {/* B. Blood Drop Glow (Soft radial brand red glow on impact) */}
            {(animationPhase === 'impact' || animationPhase === 'pulse' || animationPhase === 'settling') && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={
                  animationPhase === 'settling'
                    ? { opacity: 0, scale: 1.6, transition: { duration: 0.3 } }
                    : {
                        scale: [0.5, 1.3, 1.6],
                        opacity: [0, 0.95, 0.4]
                      }
                }
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent}%`,
                  top: `${targetTopPercent}%`
                }}
                className="z-20 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-radial from-[#E63946]/70 via-[#E63946]/30 to-transparent blur-xs pointer-events-none"
              />
            )}

            {/* C. ECG Heartbeat Pulse Line Activation (Emits a single pulse from center under text) */}
            {(animationPhase === 'impact' || animationPhase === 'pulse' || animationPhase === 'settling') && (
              <svg
                viewBox="0 0 340 50"
                className="absolute left-[19%] top-[52%] w-[72%] h-auto z-20 pointer-events-none overflow-visible filter drop-shadow-[0_0_10px_rgba(230,57,70,0.9)]"
                fill="none"
              >
                <motion.path
                  d="M 5 25 L 35 25 L 45 8 L 56 42 L 68 14 L 80 34 L 90 25 L 335 25"
                  stroke="#E63946"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    animationPhase === 'settling'
                      ? { opacity: 0, transition: { duration: 0.3 } }
                      : {
                          pathLength: [0, 1, 1],
                          opacity: [0, 1, 0.85],
                          transition: { duration: 0.55, ease: 'easeInOut' }
                        }
                  }
                />
              </svg>
            )}

            {/* D. Ambient Soft Green & Emerald Life Halo */}
            {(animationPhase === 'pulse' || animationPhase === 'settling') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  animationPhase === 'settling'
                    ? { opacity: 0, transition: { duration: 0.3 } }
                    : {
                        opacity: [0, 0.45, 0.15],
                        scale: [0.9, 1.25, 1.35]
                      }
                }
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0 bg-radial from-[#006A4E]/30 via-transparent to-transparent rounded-full blur-2xl pointer-events-none"
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
