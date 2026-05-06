import Link from 'next/link';
import { Activity, LayoutDashboard, Settings, Bell, Clock } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 p-6 flex flex-col border-r border-slate-800">
      <div className="flex items-center gap-3 mb-10 px-2">
        <Activity className="text-blue-400 w-8 h-8" />
        <span className="text-xl font-bold tracking-tight">PulseWatch</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        <NavLink href="/monitors" icon={<LayoutDashboard size={20} />} label="Monitors" active />
        <NavLink href="/incidents" icon={<Clock size={20} />} label="Incidents" />
        <NavLink href="/alerts" icon={<Bell size={20} />} label="Alerts" />
      </nav>

      <div className="pt-6 border-t border-slate-800">
        <NavLink href="/settings" icon={<Settings size={20} />} label="Settings" />
      </div>
    </aside>
  );
}

function NavLink({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-blue-600/10 text-blue-400 font-medium' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <span className={`${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
}
