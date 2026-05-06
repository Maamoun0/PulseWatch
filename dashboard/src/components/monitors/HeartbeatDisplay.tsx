'use client';

import { Copy, Terminal } from 'lucide-react';

export default function HeartbeatDisplay({ token }: { token: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/heartbeat/${token}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Terminal size={20} className="text-emerald-400" />
          Heartbeat Configuration
        </h3>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-400">Ping this URL at the end of your job:</p>
        <div className="flex items-center gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm group">
          <code className="text-emerald-400 break-all">{url}</code>
          <button 
            onClick={copyToClipboard}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors ml-auto"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl">
        <p className="text-xs text-blue-400 leading-relaxed">
          <strong>Tip:</strong> You can use <code>curl {url}</code> in your crontab or shell scripts.
        </p>
      </div>
    </div>
  );
}
