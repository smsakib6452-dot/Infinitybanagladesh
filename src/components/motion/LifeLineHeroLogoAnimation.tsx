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

  const runAnimationSequence = useCallback(() => {
    if (shouldReduceMotion) {
      setAnimationPhase('settled');
      onAnimationComplete?.();
      return;
    }

    setAnimationPhase('falling');

    // 1. 0-650ms: Drop falls straight down from top
    const tImpact = setTimeout(() => {
      setAnimationPhase('impact');
    }, 650);

    // 2. 650-950ms: Drop lands, blood drop glows + ECG heartbeat pulse traces
    const tPulse = setTimeout(() => {
      setAnimationPhase('pulse');
    }, 850);

    // 3. 950-1300ms: Soft radial glow dissipates smoothly
    const tSettling = setTimeout(() => {
      setAnimationPhase('settling');
    }, 1250);

    // 4. 1500ms: Back to 100% clean resting normal state
    const tSettle = setTimeout(() => {
      setAnimationPhase('settled');
      onAnimationComplete?.();
    }, 1550);

    return () => {
      clearTimeout(tImpact);
      clearTimeout(tPulse);
      clearTimeout(tSettling);
      clearTimeout(tSettle);
    };
  }, [shouldReduceMotion, onAnimationComplete]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimationPhase('settled');
      onAnimationComplete?.();
      return;
    }

    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      const timer = setTimeout(() => {
        runAnimationSequence();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion, runAnimationSequence, onAnimationComplete]);

  // Exact target coordinates specified in infographic:
  // Drop center: x = 20.7%, y = 49.5%
  const targetLeftPercent = 20.7;
  const targetTopPercent = 49.5;

  return (
    <div
      className="relative select-none cursor-pointer group"
      onClick={() => {
        if (animationPhase === 'settled') {
          runAnimationSequence();
        }
      }}
      title="Click to replay opening animation"
      style={{
        width: `${logoSize}px`,
        maxWidth: '100%'
      }}
    >
      {/* 1. Main Logo (Source of Truth - Untouched & Preserved) */}
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

        {/* 2. Signature Cinematic Overlay Elements (Active only during opening sequence) */}
        {!shouldReduceMotion && animationPhase !== 'settled' && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* A. The Single Falling Blood Drop (Origin: x: 20.7%, y: -100px -> Target: x: 20.7%, y: 49.5%) */}
            {(animationPhase === 'falling' || animationPhase === 'impact') && (
              <motion.div
                initial={{
                  x: '-50%',
                  y: '-120px',
                  scaleX: 0.85,
                  scaleY: 1.25,
                  opacity: 0
                }}
                animate={
                  animationPhase === 'falling'
                    ? {
                        y: ['-120px', '-50px', '0px'],
                        opacity: [0, 1, 1],
                        scaleX: [0.85, 0.92, 1],
                        scaleY: [1.25, 1.12, 1],
                        transition: {
                          duration: 0.65,
                          ease: [0.4, 0.0, 0.2, 1]
                        }
                      }
                    : {
                        scale: [1, 1.3, 0],
                        opacity: [1, 0.8, 0],
                        transition: { duration: 0.2, ease: 'easeOut' }
                      }
                }
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent}%`,
                  top: `${targetTopPercent}%`
                }}
                className="z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
              >
                {/* Luminous Light Particle Trail */}
                {animationPhase === 'falling' && (
                  <div className="w-0.5 h-14 bg-gradient-to-t from-[#E63946] via-[#E63946]/50 to-transparent -mb-1 filter drop-shadow-[0_0_6px_rgba(230,57,70,0.8)]" />
                )}

                {/* Luminous Brand Red Teardrop SVG (#E63946) */}
                <svg
                  viewBox="0 0 24 32"
                  className="w-5 h-7 sm:w-6 sm:h-8 filter drop-shadow-[0_4px_16px_rgba(230,57,70,0.95)]"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="lifelineDropGrad" x1="12" y1="0" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF7D8A" />
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

            {/* B. Impact Ripple Wave Ring */}
            {animationPhase === 'impact' && (
              <motion.div
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent}%`,
                  top: `${targetTopPercent}%`
                }}
                className="z-25 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#E63946] filter drop-shadow-[0_0_8px_rgba(230,57,70,0.8)] pointer-events-none"
              />
            )}

            {/* C. Blood Drop Glow (Soft radial brand red glow on impact) */}
            {(animationPhase === 'impact' || animationPhase === 'pulse' || animationPhase === 'settling') && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={
                  animationPhase === 'settling'
                    ? { opacity: 0, scale: 1.8, transition: { duration: 0.3 } }
                    : {
                        scale: [0.4, 1.35, 1.6],
                        opacity: [0, 0.95, 0.35]
                      }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: `${targetLeftPercent}%`,
                  top: `${targetTopPercent}%`
                }}
                className="z-20 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-radial from-[#E63946]/80 via-[#E63946]/35 to-transparent blur-xs pointer-events-none"
              />
            )}

            {/* D. ECG Heartbeat Pulse Line Activation (Traces from center through the wave) */}
            {(animationPhase === 'impact' || animationPhase === 'pulse' || animationPhase === 'settling') && (
              <svg
                viewBox="0 0 340 50"
                className="absolute left-[19%] top-[52%] w-[72%] h-auto z-20 pointer-events-none overflow-visible filter drop-shadow-[0_0_12px_rgba(230,57,70,0.95)]"
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
                      ? { opacity: 0, transition: { duration: 0.35 } }
                      : {
                          pathLength: [0, 1, 1],
                          opacity: [0, 1, 0.9],
                          transition: { duration: 0.6, ease: 'easeInOut' }
                        }
                  }
                />
              </svg>
            )}

            {/* E. Ambient Soft Green & Emerald Life Halo */}
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
