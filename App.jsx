import StoryBuilder from './StoryBuilder';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-brand-blue/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>
      
      <main className="relative z-10 py-12">
        <StoryBuilder />
      </main>
    </div>
  );
}

export default App;
