import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function IncidentList({ incidents }: { incidents: any[] }) {
  if (!incidents || incidents.length === 0) {
    return (
      <div className="text-center py-10 bg-slate-900/30 rounded-2xl border border-slate-800">
        <p className="text-slate-500">No incidents recorded yet. 🚀</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2 px-2">
        <Clock className="text-slate-500" size={20} />
        Incident History
      </h3>
      <div className="space-y-3">
        {incidents.map((incident) => (
          <div 
            key={incident.id} 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:border-slate-700 transition-colors"
          >
            {incident.resolvedAt ? (
              <CheckCircle2 className="text-emerald-500 mt-1" size={24} />
            ) : (
              <AlertCircle className="text-red-500 mt-1 animate-pulse" size={24} />
            )}
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className={`font-bold ${incident.resolvedAt ? 'text-slate-300' : 'text-red-400'}`}>
                  {incident.resolvedAt ? 'Resolved' : 'Ongoing Outage'}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {new Date(incident.startedAt).toLocaleString()}
                </span>
              </div>
              
              {incident.rootCause && (
                <div className="mt-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">AI Root Cause Analysis</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{incident.rootCause}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
