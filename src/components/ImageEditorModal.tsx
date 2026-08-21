import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Crop,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  RotateCcw as ResetIcon,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Sliders,
  Maximize2
} from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

export type AspectRatioType = 'free' | '1:1' | '4:5' | '3:4' | '4:3' | '16:9' | '21:9';

export interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (croppedDataUrl: string, metadata?: { altText?: string; caption?: string; cropMetadata?: any }) => void;
  title?: string;
  defaultAspectRatio?: AspectRatioType;
  allowedAspectRatios?: AspectRatioType[];
  initialAltText?: string;
  initialCaption?: string;
  onOpenMediaLibrary?: () => void;
}

const ASPECT_RATIO_PRESETS: { id: AspectRatioType; label: string; ratio: number | null; iconTag: string }[] = [
  { id: '1:1', label: '1:1 Square (Profile/Logo)', ratio: 1, iconTag: '1:1' },
  { id: '4:5', label: '4:5 Portrait', ratio: 4 / 5, iconTag: '4:5' },
  { id: '3:4', label: '3:4 Portrait', ratio: 3 / 4, iconTag: '3:4' },
  { id: '4:3', label: '4:3 Standard', ratio: 4 / 3, iconTag: '4:3' },
  { id: '16:9', label: '16:9 Widescreen', ratio: 16 / 9, iconTag: '16:9' },
  { id: '21:9', label: '21:9 Hero / Banner', ratio: 21 / 9, iconTag: '21:9' },
  { id: 'free', label: 'Free / Original', ratio: null, iconTag: 'Free' }
];

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onSave,
  title,
  defaultAspectRatio = '1:1',
  allowedAspectRatios,
  initialAltText = '',
  initialCaption = '',
  onOpenMediaLibrary
}) => {
  const { isBn } = useLanguage();

  // Current active image URL (can be switched via local file upload)
  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>(defaultAspectRatio);

  // Transformations
  const [zoom, setZoom] = useState<number>(1.0); // 0.5 to 4.0
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  // Metadata
  const [altText, setAltText] = useState(initialAltText);
  const [caption, setCaption] = useState(initialCaption);

  // Drag interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync props on open
  useEffect(() => {
    if (isOpen) {
      setCurrentSrc(imageUrl);
      setAspectRatio(defaultAspectRatio);
      setZoom(1.0);
      setPan({ x: 0, y: 0 });
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setAltText(initialAltText);
      setCaption(initialCaption);
    }
  }, [isOpen, imageUrl, defaultAspectRatio, initialAltText, initialCaption]);

  // Load Image Object
  useEffect(() => {
    if (!currentSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageObjRef.current = img;
      drawCanvas();
      drawPreview();
    };
    img.onerror = () => {
      console.warn('Failed to load image for editing:', currentSrc);
    };
    img.src = getAssetUrl(currentSrc);
  }, [currentSrc]);

  // Draw main interactive editing canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageObjRef.current;
    if (!canvas || !img || !containerRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = containerRef.current.clientWidth || 500;
    const containerHeight = containerRef.current.clientHeight || 400;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save state
    ctx.save();

    // Center coordinates
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply flips
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Calculate base draw size maintaining aspect ratio
    const imgAspect = img.width / img.height;
    let drawWidth = canvas.width * 0.8 * zoom;
    let drawHeight = drawWidth / imgAspect;

    if (drawHeight > canvas.height * 0.8 * zoom) {
      drawHeight = canvas.height * 0.8 * zoom;
      drawWidth = drawHeight * imgAspect;
    }

    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

    ctx.restore();
  }, [pan, zoom, rotation, flipH, flipV]);

  // Draw final crop preview
  const drawPreview = useCallback(() => {
    const previewCanvas = previewCanvasRef.current;
    const img = imageObjRef.current;
    if (!previewCanvas || !img) return;

    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;

    const preset = ASPECT_RATIO_PRESETS.find(p => p.id === aspectRatio);
    const targetRatio = preset?.ratio || img.width / img.height;

    // Set export canvas dimensions
    const baseSize = 400;
    let outWidth = baseSize;
    let outHeight = baseSize / targetRatio;
    if (outHeight > baseSize) {
      outHeight = baseSize;
      outWidth = baseSize * targetRatio;
    }

    previewCanvas.width = outWidth;
    previewCanvas.height = outHeight;

    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    ctx.save();
    ctx.translate(previewCanvas.width / 2 + (pan.x * (previewCanvas.width / 400)), previewCanvas.height / 2 + (pan.y * (previewCanvas.height / 400)));
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    const imgAspect = img.width / img.height;
    let drawW = previewCanvas.width * zoom;
    let drawH = drawW / imgAspect;

    if (drawH < previewCanvas.height * zoom) {
      drawH = previewCanvas.height * zoom;
      drawW = drawH * imgAspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  }, [aspectRatio, pan, zoom, rotation, flipH, flipV]);

  // Redraw when transform parameters change
  useEffect(() => {
    drawCanvas();
    drawPreview();
  }, [drawCanvas, drawPreview]);

  // Mouse / Touch Drag Events for Pan
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom helpers
  const handleZoomChange = (newZoom: number) => {
    const clamped = Math.max(0.5, Math.min(4.0, parseFloat(newZoom.toFixed(2))));
    setZoom(clamped);
  };

  const handleZoomIn = () => {
    handleZoomChange(zoom + 0.15);
  };

  const handleZoomOut = () => {
    handleZoomChange(zoom - 0.15);
  };

  // Rotate helpers
  const handleRotateLeft = () => {
    setRotation(prev => (prev - 90 + 360) % 360);
  };

  const handleRotateRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Reset to original
  const handleReset = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setAspectRatio(defaultAspectRatio);
  };

  // Local File Upload trigger
  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCurrentSrc(uploadEvent.target.result as string);
          handleReset();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Final Export & Save
  const handleSaveCrop = () => {
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) {
      onSave(currentSrc, { altText, caption });
      onClose();
      return;
    }

    try {
      const dataUrl = previewCanvas.toDataURL('image/jpeg', 0.92);
      onSave(dataUrl, {
        altText,
        caption,
        cropMetadata: {
          aspectRatio,
          zoom,
          pan,
          rotation,
          flipH,
          flipV,
          originalSrc: currentSrc
        }
      });
      onClose();
    } catch (err) {
      console.error('Failed to export cropped canvas:', err);
      onSave(currentSrc, { altText, caption });
      onClose();
    }
  };

  if (!isOpen) return null;

  const visiblePresets = allowedAspectRatios
    ? ASPECT_RATIO_PRESETS.filter(p => allowedAspectRatios.includes(p.id))
    : ASPECT_RATIO_PRESETS;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#EAE3D9] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-display flex items-center gap-2">
                <span>{title || (isBn ? 'ছবি ক্রপ ও পজিশন এডিটর' : 'Interactive Image Crop & Position Editor')}</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                {isBn ? 'জুম করুন, ড্র্যাগ করে পজিশন ঠিক করুন এবং রেশিও অনুযায়ী নিখুঁত ক্রপ সংরক্ষণ করুন।' : 'Zoom, pan focal area, crop to aspect ratio, and fine-tune orientation.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Upload button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLocalFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE3D9] hover:border-[#006A4E] text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-warm-xs cursor-pointer transition-all"
              title="Upload from PC"
            >
              <Upload className="w-3.5 h-3.5 text-[#006A4E]" />
              <span className="hidden sm:inline">{isBn ? 'কম্পিউটার থেকে আপলোড' : 'Upload from PC'}</span>
            </button>

            {onOpenMediaLibrary && (
              <button
                type="button"
                onClick={onOpenMediaLibrary}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE3D9] hover:border-[#006A4E] text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-warm-xs cursor-pointer transition-all"
                title="Select from Media Library"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#006A4E]" />
                <span className="hidden sm:inline">{isBn ? 'মিডিয়া গ্যালারি' : 'Media Library'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          
          {/* Left Canvas: Interactive Editor View */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#006A4E]" />
                <span>{isBn ? 'ইন্টারেক্টিভ এডিটিং ক্যানভাস' : 'Interactive Editing Canvas'}</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {isBn ? 'ড্র্যাগ করে পজিশন করুন' : 'Drag canvas to reposition focal point'}
              </span>
            </div>

            <div
              ref={containerRef}
              className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-900 overflow-hidden border-2 border-slate-700/50 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            >
              {/* Main Transform Canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-full"
              />

              {/* Crop Box Overlay Frame with Rule of Thirds Guide */}
              <div className="absolute inset-8 sm:inset-10 border-2 border-white/80 pointer-events-none rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
                {/* Rule of Thirds grid lines */}
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#006A4E]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#006A4E]" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#006A4E]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#006A4E]" />

                {/* Active Aspect Ratio Badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px] font-bold">
                  {aspectRatio}
                </div>
              </div>
            </div>

            {/* Quick Canvas Toolbar below */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9]">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                  className="flex-1 accent-[#006A4E] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs font-bold text-slate-700 min-w-[40px] text-right">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              {/* Rotation & Flip & Reset */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRotateLeft}
                  className="p-1.5 rounded-lg bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-700 cursor-pointer"
                  title="Rotate Left 90°"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleRotateRight}
                  className="p-1.5 rounded-lg bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-700 cursor-pointer"
                  title="Rotate Right 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setFlipH(prev => !prev)}
                  className={`p-1.5 rounded-lg border cursor-pointer ${flipH ? 'bg-[#E6F3EF] border-[#006A4E] text-[#006A4E]' : 'bg-white border-[#EAE3D9] text-slate-700'}`}
                  title="Flip Horizontal"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setFlipV(prev => !prev)}
                  className={`p-1.5 rounded-lg border cursor-pointer ${flipV ? 'bg-[#E6F3EF] border-[#006A4E] text-[#006A4E]' : 'bg-white border-[#EAE3D9] text-slate-700'}`}
                  title="Flip Vertical"
                >
                  <FlipVertical className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#EAE3D9] hover:bg-slate-100 text-rose-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Reset adjustments"
                >
                  <ResetIcon className="w-3.5 h-3.5" />
                  <span>{isBn ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Aspect Ratio & Live Preview & Metadata */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            
            {/* Aspect Ratio Preset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#006A4E]" />
                <span>{isBn ? 'অ্যাসপেক্ট রেশিও নির্বাচন' : 'Aspect Ratio Preset'}</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {visiblePresets.map(preset => {
                  const isSelected = aspectRatio === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setAspectRatio(preset.id)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-warm-xs'
                          : 'bg-[#FAF7F2] text-slate-700 border-[#EAE3D9] hover:border-slate-400'
                      }`}
                    >
                      <span className="block font-mono text-[11px]">{preset.iconTag}</span>
                      <span className="text-[10px] opacity-80 truncate block">{preset.label.split(' ')[1] || preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Crop Output Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
                <span>{isBn ? 'ফাইনাল প্রিভিউ' : 'Final Cropped Preview'}</span>
              </span>
              <div className="w-full h-44 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] p-3 flex items-center justify-center overflow-hidden">
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-full max-w-full rounded-xl shadow-warm-sm border border-slate-200 object-contain"
                />
              </div>
            </div>

            {/* SEO & Accessibility Metadata */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>{isBn ? 'ছবির অল্ট টেক্সট (Alt Text)' : 'Image Alt Text (SEO & A11y)'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{isBn ? 'প্রয়োজনীয়' : 'Recommended'}</span>
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder={isBn ? 'ছবির বর্ণনা (যেমন: Infinity Relief Drive)' : 'e.g. Executive Committee President Photo'}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {isBn ? 'ক্যাপশন (ঐচ্ছিক)' : 'Image Caption (Optional)'}
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={isBn ? 'ছবির সাথে প্রদর্শনের জন্য ক্যাপশন' : 'Optional caption text'}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-[#FAF7F2] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer transition-all"
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleSaveCrop}
            className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-extrabold shadow-warm-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{isBn ? 'ক্রপ সংরক্ষণ করুন' : 'Apply & Save Crop'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
