'use client';

import { useState } from 'react';
import { Globe, Clock, Zap, Shield } from 'lucide-react';

export default function MonitorForm() {
  const [type, setType] = useState<'URL' | 'CRON'>('URL');
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    interval: 60,
    expectedStatus: 200,
    timeout: 10,
  });

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="text-yellow-400" size={24} />
          New Monitor
        </h2>
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setType('URL')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === 'URL' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            URL
          </button>
          <button 
            onClick={() => setType('CRON')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === 'CRON' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            CRON
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Monitor Name</label>
          <input 
            type="text" 
            placeholder="e.g. My Website API"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {type === 'URL' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">URL to Probe</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="url" 
                placeholder="https://api.example.com/health"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Check Interval (s)</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="number" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={formData.interval}
                onChange={e => setFormData({...formData, interval: parseInt(e.target.value)})}
              />
            </div>
          </div>
          {type === 'URL' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Expected Status</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="number" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.expectedStatus}
                  onChange={e => setFormData({...formData, expectedStatus: parseInt(e.target.value)})}
                />
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
        >
          Create Monitor
        </button>
      </form>
    </div>
  );
}
