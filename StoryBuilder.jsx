import React, { useState, useEffect } from 'react';
import { Edit3, Save, Plus, BookOpen, Send, Trash2, ChevronRight, CheckCircle2, History, Copy } from 'lucide-react';

const STAR_HINTS = {
  s: "Describe the setting: When, where, and why was this moment critical?",
  t: "What was the specific challenge? What were you responsible for?",
  a: "The most important part: What did YOU specifically do? Use active verbs.",
  r: "The outcome: What changed? Use metrics, results, or specific feedback."
};

const STAR_LABELS = {
  s: "Situation",
  t: "Task",
  a: "Action",
  r: "Result"
};

const StarInput = ({ letter, value, onChange, isCompleted }) => (
  <div className={`glass-panel p-10 relative overflow-hidden group transition-all duration-300 border-l-8 ${isCompleted ? 'border-green-500/30' : 'border-brand-blue/30'} hover:bg-white/5`}>
    <div className="absolute top-[-20px] right-[-10px] text-9xl font-black opacity-[0.03] select-none group-hover:opacity-[0.07] transition-opacity uppercase">
      {letter}
    </div>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-lg transition-all ${isCompleted ? 'bg-green-500/10 text-green-500 border border-green-500/20 shadow-green-500/5' : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20 shadow-brand-blue/5'}`}>
        {letter.toUpperCase()}
      </div>
      <h3 className="text-2xl font-black tracking-tight">{STAR_LABELS[letter]}</h3>
      {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-500 animate-in zoom-in" />}
    </div>
    <p className="opacity-40 text-sm mb-8 leading-relaxed italic">{STAR_HINTS[letter]}</p>
    
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(letter, e.target.value)}
        className="w-full bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-8 text-lg min-h-[180px] focus:outline-none focus:border-brand-blue/40 focus:bg-brand-blue/5 transition-all resize-none placeholder:opacity-10 placeholder:font-black"
        placeholder={`ENTER ${STAR_LABELS[letter].toUpperCase()} DATA...`}
      />
      {!value && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
           <Edit3 className="w-8 h-8 mb-2" />
           <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Teammate Domain: Editor Active</p>
        </div>
      )}
    </div>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8 border border-white/5">
    <div 
      className="h-full bg-gradient-to-r from-brand-blue to-blue-400 transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const PracticeView = ({ story, onFinish }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['s', 't', 'a', 'r'];
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-center mb-12">
        <div className="space-y-1">
          <h2 className="text-3xl font-black italic tracking-tighter">PRACTICE MODE</h2>
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">Narrative Engine v2.0</p>
        </div>
        <div className="flex gap-3">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === activeStep ? 'bg-brand-blue w-12' : i < activeStep ? 'bg-green-500 w-4' : 'bg-white/10 w-4'}`} 
            />
          ))}
        </div>
      </div>

      <div className="glass-panel p-16 min-h-[450px] flex flex-col justify-center relative group transition-all duration-700 hover:bg-white/[0.02] border-brand-blue/10">
        <div className="absolute top-12 left-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-xs">
              {steps[activeStep].toUpperCase()}
            </span>
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{STAR_LABELS[steps[activeStep]]}</span>
          </div>
          <p className="text-[10px] opacity-20 font-medium italic max-w-xs">{STAR_HINTS[steps[activeStep]]}</p>
        </div>

        <div className="absolute top-12 right-12 flex items-center gap-2 opacity-20">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Live Prompt</span>
        </div>
        
        <p className="text-4xl font-medium leading-[1.4] text-center max-w-2xl mx-auto">
          {story[steps[activeStep]] ? (
            story[steps[activeStep]]
          ) : (
            <span className="opacity-10 italic">This section is empty. Skip to next step.</span>
          )}
        </p>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <p className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-30">Maintain eye contact • Speak clearly • Time check: 45s</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <button 
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          className={`px-8 py-4 glass-panel border border-white/5 hover:bg-white/5 font-bold uppercase tracking-widest text-[10px] transition-all ${activeStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'}`}
        >
          Previous Segment
        </button>
        
        {activeStep < 3 ? (
          <button 
            onClick={() => setActiveStep(prev => prev + 1)}
            className="px-12 py-5 bg-brand-blue/20 hover:bg-brand-blue/30 border border-brand-blue/40 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-brand-blue/10 flex items-center gap-4 transition-all active:scale-95 group"
          >
            Advance Pipeline <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={onFinish}
            className="px-12 py-5 bg-green-500/20 hover:bg-green-600/30 border border-green-500/40 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-green-500/10 flex items-center gap-4 transition-all active:scale-95 text-green-500"
          >
            Complete Session <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const StoryCard = ({ story, onEdit, onDelete, onPreview }) => (
  <div className="glass-panel p-6 hover:bg-white/5 transition-all group flex flex-col justify-between h-full border border-white/10">
    <div>
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-bold truncate max-w-[200px]">{story.title || 'Untitled Story'}</h4>
        <span className="text-[10px] opacity-30 font-mono">{new Date(story.timestamp).toLocaleDateString()}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {['s', 't', 'a', 'r'].map(l => (
          <div key={l} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${story[l] ? 'bg-green-500' : 'bg-white/10'}`} />
            <span className="text-[10px] uppercase font-bold opacity-40">{l}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex gap-2 pt-4 border-t border-white/5">
      <button 
        onClick={() => onPreview(story)}
        className="flex-1 p-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
      >
        <BookOpen className="w-4 h-4 opacity-40" />
      </button>
      <button 
        onClick={() => onEdit(story)}
        className="flex-1 p-2 bg-brand-blue/10 hover:bg-brand-blue/20 rounded-lg flex items-center justify-center transition-colors text-brand-blue cursor-pointer"
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <button 
        onClick={() => onDelete(story.timestamp)}
        className="p-2 hover:bg-red-500/10 rounded-lg flex items-center justify-center transition-colors text-red-500/50 hover:text-red-500 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function StoryBuilderPage() {
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState({ title: '', s: '', t: '', a: '', r: '', timestamp: null });
  const [view, setView] = useState('editor'); // 'editor', 'repository', 'preview', 'practice'
  const [previewStory, setPreviewStory] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('star-stories');
    if (saved) setStories(JSON.parse(saved));
  }, []);

  const calculateProgress = () => {
    const fields = ['s', 't', 'a', 'r'];
    const completed = fields.filter(f => currentStory[f].trim().length > 10).length;
    return (completed / fields.length) * 100;
  };

  const handleInputChange = (field, value) => {
    setCurrentStory(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!currentStory.s && !currentStory.t && !currentStory.a && !currentStory.r) return;
    
    const newTimestamp = currentStory.timestamp || Date.now();
    const updatedStory = { ...currentStory, timestamp: newTimestamp };
    
    const newStories = currentStory.timestamp 
      ? stories.map(s => s.timestamp === currentStory.timestamp ? updatedStory : s)
      : [updatedStory, ...stories];
    
    setStories(newStories);
    localStorage.setItem('star-stories', JSON.stringify(newStories));
    setCurrentStory({ title: '', s: '', t: '', a: '', r: '', timestamp: null });
    setView('repository');
  };

  const handleEdit = (story) => {
    setCurrentStory(story);
    setView('editor');
  };

  const handleDelete = (timestamp) => {
    const newStories = stories.filter(s => s.timestamp !== timestamp);
    setStories(newStories);
    localStorage.setItem('star-stories', JSON.stringify(newStories));
  };

  const startNew = () => {
    setCurrentStory({ title: '', s: '', t: '', a: '', r: '', timestamp: null });
    setView('editor');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      <style dangerouslySetInnerHTML={{ __html: `
        .glow-icon { filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5)); }
      `}} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-current tracking-tighter flex items-center gap-4">
            Story Builder <BookOpen className="text-brand-blue w-10 h-10 glow-icon" />
          </h1>
          <p className="opacity-40 font-medium italic">Architect Visuals • Teammate Data Strategy</p>
        </div>
        
        <div className="flex gap-3">
          {view === 'editor' ? (
            <>
              <button 
                onClick={() => setView('repository')}
                className="px-6 py-3 glass-panel hover:bg-white/5 flex items-center gap-3 font-bold transition-all active:scale-95 cursor-pointer"
              >
                <History className="w-4 h-4 opacity-40" />
                <span className="tracking-widest text-[10px] uppercase">Library</span>
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-3 glass-panel bg-brand-blue/20 hover:bg-brand-blue/30 border-brand-blue/30 flex items-center gap-3 font-bold transition-all active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4 text-brand-blue" />
                <span className="tracking-widest text-[10px] uppercase">Store Story</span>
              </button>
            </>
          ) : (
            <button 
              onClick={startNew}
              className="px-8 py-3 glass-panel bg-brand-blue/20 hover:bg-brand-blue/30 border-brand-blue/30 flex items-center gap-3 font-bold transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-brand-blue" />
              <span className="tracking-widest text-[10px] uppercase">New Story</span>
            </button>
          )}
        </div>
      </div>

      {view === 'editor' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-2xl">
            <input 
              type="text"
              value={currentStory.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Story Headline (e.g., The Time I Saved the Project)"
              className="w-full bg-transparent text-3xl font-bold focus:outline-none placeholder:opacity-20 border-b border-white/5 pb-2 mb-4"
            />
            <ProgressBar progress={calculateProgress()} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StarInput 
              letter="s" 
              value={currentStory.s} 
              onChange={handleInputChange} 
              isCompleted={currentStory.s.trim().length > 10} 
            />
            <StarInput 
              letter="t" 
              value={currentStory.t} 
              onChange={handleInputChange} 
              isCompleted={currentStory.t.trim().length > 10} 
            />
            <StarInput 
              letter="a" 
              value={currentStory.a} 
              onChange={handleInputChange} 
              isCompleted={currentStory.a.trim().length > 10} 
            />
            <StarInput 
              letter="r" 
              value={currentStory.r} 
              onChange={handleInputChange} 
              isCompleted={currentStory.r.trim().length > 10} 
            />
          </div>
          
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => {
                setPreviewStory(currentStory);
                setView('preview');
              }}
              className="group flex items-center gap-4 px-12 py-6 glass-panel border-2 border-dashed border-white/10 hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all cursor-pointer"
            >
              <div className="text-left">
                <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">Ready for Next Step?</p>
                <p className="text-xl font-black">Preview Narrative Flow</p>
              </div>
              <ChevronRight className="w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      )}

      {view === 'repository' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <History className="w-6 h-6 text-brand-blue opacity-50" />
            <h2 className="text-2xl font-bold">Story Repository</h2>
            <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-mono opacity-50">{stories.length} Items</span>
          </div>

          {stories.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center glass-panel border-dashed border-2 border-white/10">
              <BookOpen className="w-12 h-12 opacity-10 mb-4" />
              <p className="opacity-30 font-medium">No stories archived yet. Start building your first narrative.</p>
              <button 
                onClick={startNew}
                className="mt-6 text-brand-blue font-bold text-sm hover:underline cursor-pointer"
              >
                Create New Story
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map(story => (
                <StoryCard 
                  key={story.timestamp} 
                  story={story} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}
                  onPreview={(s) => { setPreviewStory(s); setView('preview'); }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'preview' && previewStory && (
        <div className="max-w-3xl mx-auto space-y-12 animate-in zoom-in-95 duration-500">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-black tracking-tighter">{previewStory.title || 'Untitled Story'}</h2>
            <div className="w-24 h-1 bg-brand-blue mx-auto rounded-full" />
            <button 
              onClick={() => {
                const text = `TITLE: ${previewStory.title}\n\nSITUATION:\n${previewStory.s}\n\nTASK:\n${previewStory.t}\n\nACTION:\n${previewStory.a}\n\nRESULT:\n${previewStory.r}`;
                navigator.clipboard.writeText(text);
                alert("Story copied to clipboard!");
              }}
              className="flex items-center gap-2 mx-auto mt-4 text-[10px] uppercase font-bold text-brand-blue hover:opacity-100 opacity-50 transition-opacity cursor-pointer"
            >
              <Copy className="w-3 h-3" /> Copy Full Narrative
            </button>
          </div>

          <div className="glass-panel p-12 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue/30" />
             
             {['s', 't', 'a', 'r'].map(l => (
               <div key={l} className="space-y-2">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{STAR_LABELS[l]}</span>
                 </div>
                 <p className="text-xl leading-relaxed opacity-80">
                   {previewStory[l] || <span className="opacity-20 italic">No content provided for this section...</span>}
                 </p>
               </div>
             ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setView('practice')}
              className="w-full py-6 glass-panel bg-brand-blue text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-4 group cursor-pointer"
            >
              <span className="font-black text-lg uppercase tracking-widest">Start Practice Session</span>
              <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </button>
            
            <button 
              onClick={() => setView(currentStory.timestamp ? 'editor' : 'repository')}
              className="text-xs font-bold opacity-30 hover:opacity-100 transition-opacity uppercase tracking-widest cursor-pointer"
            >
              Go Back to Edit
            </button>
          </div>
        </div>
      )}

      {view === 'practice' && previewStory && (
        <PracticeView 
          story={previewStory} 
          onFinish={() => setView('repository')} 
        />
      )}

      {/* Footer Branding */}
      <div className="pt-12 flex justify-center border-t border-white/5">
         <div className="text-[10px] font-bold opacity-20 tracking-[0.5em] uppercase text-center">
           Structured Storytelling Methodology • STAR Framework • V2.0.4
         </div>
      </div>
    </div>
  );
}
