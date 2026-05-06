import { BrainCircuit, Sparkles } from 'lucide-react';

export default function AIAnalysisCard({ analysis, suggestion }: { analysis: string; suggestion?: string }) {
  return (
    <div className="relative overflow-hidden group">
      {/* Animated Gradient Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/10 p-2 rounded-xl text-blue-400">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-lg font-bold tracking-tight">AI Root Cause Analysis</h3>
          </div>
          <div className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">GPT-4o Mini</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed text-lg">
            {analysis}
          </p>

          {suggestion && (
            <div className="bg-slate-900/50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Recommended Action</p>
              <p className="text-sm text-slate-400">{suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
