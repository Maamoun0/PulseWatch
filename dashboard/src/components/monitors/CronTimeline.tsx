export default function CronTimeline({ checks }: { checks: any[] }) {
  // Simple visualization of the last 20 checks
  const displayChecks = [...checks].reverse().slice(-20);

  return (
    <div className="space-y-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest">Availability Timeline</h3>
        <span className="text-xs text-slate-500 font-medium">Last 20 checks</span>
      </div>

      <div className="flex gap-1.5 h-12 items-end">
        {displayChecks.map((check, i) => (
          <div 
            key={i}
            className={`flex-1 rounded-t-md transition-all duration-300 hover:scale-y-110 cursor-help ${
              check.status === 'UP' 
                ? 'bg-emerald-500/40 hover:bg-emerald-500' 
                : 'bg-red-500/40 hover:bg-red-500 animate-pulse'
            }`}
            style={{ height: check.status === 'UP' ? '100%' : '60%' }}
            title={`${new Date(check.checkedAt).toLocaleTimeString()}: ${check.status}`}
          />
        ))}
        {displayChecks.length < 20 && Array.from({ length: 20 - displayChecks.length }).map((_, i) => (
          <div key={`empty-${i}`} className="flex-1 bg-slate-800/20 h-full rounded-t-md" />
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
        <span>Earlier</span>
        <span>Now</span>
      </div>
    </div>
  );
}
