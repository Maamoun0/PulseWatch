import { Bell, Mail, Plus, Trash2 } from 'lucide-react';

export default function AlertsSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight mb-2">Alert Settings</h1>
        <p className="text-slate-400">Configure how you want to be notified during downtime.</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/10 p-3 rounded-2xl text-blue-400">
              <Bell size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Notification Channels</h3>
              <p className="text-sm text-slate-500">PulseWatch sends alerts via Email (MVP).</p>
            </div>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Plus size={20} />
            Add Channel
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <Mail className="text-slate-500" size={24} />
              <div>
                <p className="font-bold">Primary Email</p>
                <p className="text-sm text-slate-500">user@example.com</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-emerald-500/20">
                Active
              </span>
            </div>
            <button className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
