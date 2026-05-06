import MonitorForm from '@/components/monitors/MonitorForm';
import { Activity, Plus, Search } from 'lucide-react';

export default function MonitorsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Monitors</h1>
          <p className="text-slate-400">Manage and track your service uptime.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
          <Plus size={20} />
          Add Monitor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <Search className="text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search monitors..."
              className="bg-transparent border-none focus:ring-0 w-full text-lg outline-none"
            />
          </div>

          {/* Placeholder for Monitor List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
            <div className="bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
              <Activity className="text-slate-500" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">No monitors found</h3>
              <p className="text-slate-400">Start by creating your first URL or Cron monitor.</p>
            </div>
          </div>
        </div>

        <div>
          <MonitorForm />
        </div>
      </div>
    </div>
  );
}
