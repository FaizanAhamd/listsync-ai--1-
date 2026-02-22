
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { PhotoIcon, FilmIcon, PaintBrushIcon, SparklesIcon, ArrowPathIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { generateProductImage, editProductImage, animateImage } from '../services/gemini';

export const AILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'video'>('generate');
  
  // States for Image Gen
  const [genPrompt, setGenPrompt] = useState("");
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [genResult, setGenResult] = useState("");
  const [isGenLoading, setIsGenLoading] = useState(false);

  // States for Editing
  const [editPrompt, setEditPrompt] = useState("");
  const [editImage, setEditImage] = useState<string | null>(null);
  const [editResult, setEditResult] = useState("");
  const [isEditLoading, setIsEditLoading] = useState(false);

  // States for Video
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoImage, setVideoImage] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (s: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Fix: Helper to ensure user has selected an API key from the dialog
  const checkVeoKey = async () => {
    if (typeof window.aistudio !== 'undefined') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }
  };

  const onGenerate = async () => {
    setIsGenLoading(true);
    try {
      // Fix: Check for key selection for gemini-3-pro-image-preview
      await checkVeoKey();
      const res = await generateProductImage(genPrompt, size);
      setGenResult(res);
    } catch (e: any) { 
      // Fix: Handle reset if entity not found error occurs
      if (e.message?.includes("entity was not found")) {
        await window.aistudio.openSelectKey();
      }
      alert(e.message || e); 
    } finally { setIsGenLoading(false); }
  };

  const onEdit = async () => {
    if (!editImage) return;
    setIsEditLoading(true);
    try {
      const res = await editProductImage(editImage, editPrompt);
      setEditResult(res);
    } catch (e: any) { alert(e.message || e); } finally { setIsEditLoading(false); }
  };

  const onAnimate = async () => {
    if (!videoImage) return;
    setIsVideoLoading(true);
    try {
      // Fix: Check for key selection for Veo models
      await checkVeoKey();
      const res = await animateImage(videoImage, videoPrompt, aspectRatio);
      setVideoResult(res);
    } catch (e: any) { 
      // Fix: Handle key reset if entity not found error occurs
      if (e.message?.includes("entity was not found")) {
        await window.aistudio.openSelectKey();
      }
      alert(e.message || e); 
    } finally { setIsVideoLoading(false); }
  };

  return (
    <section className="">
      <div className="max-w-5xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="flex border-b border-zinc-800">
          <button onClick={() => setActiveTab('generate')} className={`flex-1 py-6 flex items-center justify-center transition-all ${activeTab === 'generate' ? 'bg-zinc-800 text-white border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <PhotoIcon className="w-6 h-6" />
          </button>
          <button onClick={() => setActiveTab('edit')} className={`flex-1 py-6 flex items-center justify-center transition-all ${activeTab === 'edit' ? 'bg-zinc-800 text-white border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <PaintBrushIcon className="w-6 h-6" />
          </button>
          <button onClick={() => setActiveTab('video')} className={`flex-1 py-6 flex items-center justify-center transition-all ${activeTab === 'video' ? 'bg-zinc-800 text-white border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-zinc-400'}`}>
            <FilmIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'generate' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <textarea 
                  value={genPrompt}
                  onChange={(e) => setGenPrompt(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 h-48 focus:border-emerald-500 outline-none resize-none"
                  placeholder="Describe the product image you want to generate..."
                />
                <div className="flex gap-4">
                  {["1K", "2K", "4K"].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setSize(s as any)}
                      className={`flex-1 py-2 rounded-lg font-mono text-xs transition-all ${size === s ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button onClick={onGenerate} disabled={isGenLoading} className="w-full h-16 bg-emerald-500 text-black rounded-xl flex items-center justify-center shadow-lg">
                  {isGenLoading ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <SparklesIcon className="w-6 h-6" />}
                </button>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center h-[400px] overflow-hidden">
                {genResult ? <img src={genResult} className="w-full h-full object-contain" alt="Generated result" /> : <PhotoIcon className="w-12 h-12 text-zinc-800" />}
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="w-full h-48 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden bg-zinc-950">
                  {editImage ? <img src={editImage} className="w-full h-full object-cover" alt="Source" /> : <ArrowUpTrayIcon className="w-10 h-10 text-zinc-800" />}
                  <input type="file" className="hidden" onChange={(e) => handleFile(e, setEditImage)} />
                </label>
                <input 
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none"
                  placeholder="Describe changes (e.g., 'add a wooden table background')..."
                />
                <button onClick={onEdit} disabled={isEditLoading || !editImage} className="w-full h-16 bg-emerald-500 disabled:opacity-30 text-black rounded-xl flex items-center justify-center shadow-lg">
                  {isEditLoading ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <PaintBrushIcon className="w-6 h-6" />}
                </button>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center h-[400px] overflow-hidden">
                {editResult ? <img src={editResult} className="w-full h-full object-contain" alt="Edit result" /> : <div className="w-12 h-12 text-zinc-800" />}
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="w-full h-48 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden bg-zinc-950">
                  {videoImage ? <img src={videoImage} className="w-full h-full object-cover" alt="Video source" /> : <ArrowUpTrayIcon className="w-10 h-10 text-zinc-800" />}
                  <input type="file" className="hidden" onChange={(e) => handleFile(e, setVideoImage)} />
                </label>
                <input 
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none"
                  placeholder="Describe the motion (e.g., 'smooth camera pan left')..."
                />
                <div className="flex gap-4">
                  {["16:9", "9:16"].map((ar) => (
                    <button 
                      key={ar} 
                      onClick={() => setAspectRatio(ar as any)}
                      className={`flex-1 py-2 rounded-lg font-mono text-xs transition-all ${aspectRatio === ar ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
                <button onClick={onAnimate} disabled={isVideoLoading || !videoImage} className="w-full h-16 bg-emerald-500 disabled:opacity-30 text-black rounded-xl flex items-center justify-center shadow-lg">
                  {isVideoLoading ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <FilmIcon className="w-6 h-6" />}
                </button>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center h-[400px] overflow-hidden">
                {videoResult ? (
                  <video src={videoResult} controls className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    {isVideoLoading ? <ArrowPathIcon className="w-10 h-10 text-emerald-500 animate-spin" /> : <FilmIcon className="w-12 h-12 text-zinc-800" />}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
