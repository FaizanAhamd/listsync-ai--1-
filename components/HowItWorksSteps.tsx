import React from 'react';
import { 
  Squares2X2Icon, 
  CubeIcon, 
  DocumentDuplicateIcon, 
  ListBulletIcon, 
  ChartBarIcon, 
  InboxIcon, 
  MegaphoneIcon, 
  SparklesIcon, 
  ChatBubbleLeftRightIcon, 
  BuildingStorefrontIcon, 
  MagnifyingGlassIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

export const HowItWorksSteps: React.FC = () => {
  return (
    <div className="bg-[#09090b] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-white font-black text-3xl md:text-5xl mb-4 tracking-tight">Master Dashboard Preview</h2>
           <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
             One central command center to manage pricing, inventory, and listings across every major Indian marketplace.
           </p>
        </div>

        {/* High-Fidelity Dashboard Recreation */}
        <div className="relative mx-auto max-w-6xl aspect-[16/10] bg-[#020617] rounded-2xl border border-zinc-800 shadow-[0_0_100px_rgba(37,99,235,0.1)] flex overflow-hidden group select-none transition-all duration-700 hover:border-blue-500/30">
          {/* Sidebar */}
          <div className="w-64 bg-[#09090b] border-r border-zinc-800 flex flex-col p-4 shrink-0 hidden md:flex">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-white text-lg">L</div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight">ListSync AI</p>
                <p className="text-zinc-500 text-[10px] uppercase font-bold">More Sales</p>
              </div>
            </div>

            <div className="space-y-1">
              <SidebarItem icon={Squares2X2Icon} label="Dashboard" active />
              <SidebarItem icon={CubeIcon} label="Products" count="3" />
              <SidebarItem icon={DocumentDuplicateIcon} label="Templates" count="30" />
              <SidebarItem icon={ListBulletIcon} label="Listings" count="10" expandable />
              <SidebarItem icon={ChartBarIcon} label="Analytics" count="10" expandable />
              <SidebarItem icon={InboxIcon} label="Inventory" count="10" expandable />
              <SidebarItem icon={MegaphoneIcon} label="Marketing" count="10" expandable />
              <SidebarItem icon={SparklesIcon} label="AI" count="10" expandable />
              <SidebarItem icon={ChatBubbleLeftRightIcon} label="Chats" count="9" />
              <SidebarItem icon={BuildingStorefrontIcon} label="Marketplaces" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-[#020617] overflow-hidden">
            {/* Top Header */}
            <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#09090b]/50 backdrop-blur-md">
              <div className="flex gap-6">
                <p className="text-white text-sm font-bold border-b border-white pb-5 mt-5">Overview</p>
                <p className="text-zinc-500 text-sm font-medium pb-5 mt-5 hover:text-white transition-colors cursor-pointer">Products</p>
                <p className="text-zinc-500 text-sm font-medium pb-5 mt-5 hover:text-white transition-colors cursor-pointer">Marketplaces</p>
                <p className="text-zinc-500 text-sm font-medium pb-5 mt-5 hover:text-white transition-colors cursor-pointer">Settings</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden lg:block">
                  <MagnifyingGlassIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input className="bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-10 pr-4 text-xs text-zinc-300 w-64 focus:outline-none focus:border-blue-500/50" placeholder="Search..." />
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center cursor-pointer hover:bg-zinc-700">
                  <MoonIcon className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-white border border-zinc-700 cursor-pointer">SN</div>
              </div>
            </div>

            {/* Dashboard Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
                </div>
                <button className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors">Download</button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-zinc-900/50 border border-zinc-800 rounded-lg w-fit">
                <div className="px-4 py-1.5 bg-zinc-800 text-white text-xs font-bold rounded-md shadow-sm">Overview</div>
                <div className="px-4 py-1.5 text-zinc-500 text-xs font-medium hover:text-zinc-300 cursor-pointer">Analytics</div>
                <div className="px-4 py-1.5 text-zinc-500 text-xs font-medium hover:text-zinc-300 cursor-pointer">Reports</div>
                <div className="px-4 py-1.5 text-zinc-500 text-xs font-medium hover:text-zinc-300 cursor-pointer">Notifications</div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Revenue" value="₹45,231.89" change="+20.1% from last month" icon="💰" />
                <StatCard label="Active Listings" value="+2350" change="+180.1% from last month" icon="📊" />
                <StatCard label="Total Sales" value="+12,234" change="+19% from last month" icon="📦" />
                <StatCard label="Sync Active" value="100%" change="Real-time connectivity" icon="⚡" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Chart Mockup */}
                <div className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                  <p className="text-white font-bold text-sm mb-8">Performance History</p>
                  <div className="h-64 flex items-end justify-between gap-3 px-2">
                    {[40, 60, 80, 50, 45, 70, 85, 40, 95, 80, 65, 75].map((h, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 gap-4">
                         <div className="w-full bg-zinc-800/40 rounded-t-sm group-hover:bg-blue-600/20 transition-all cursor-pointer relative" style={{ height: `${h}%` }}>
                            <div className="absolute inset-x-0 bottom-0 bg-blue-600 h-full transition-all rounded-t-sm" style={{ height: '30%' }}></div>
                         </div>
                         <p className="text-[10px] font-mono text-zinc-600">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity Mockup */}
                <div className="lg:col-span-5 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 flex flex-col">
                  <p className="text-white font-bold text-sm mb-1">Live Feed</p>
                  <p className="text-zinc-500 text-xs mb-8">Recent sync activity across stores.</p>
                  <div className="space-y-6 flex-1">
                    <ActivityItem marketplace="Amazon" event="New Order #4410" time="2m ago" />
                    <ActivityItem marketplace="Flipkart" event="Inventory Update" time="15m ago" />
                    <ActivityItem marketplace="Meesho" event="SKU Published" time="1h ago" />
                    <ActivityItem marketplace="Amazon" event="Price Synced" time="2h ago" />
                    <ActivityItem marketplace="Flipkart" event="New Order #9912" time="4h ago" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, count, active = false, expandable = false }: any) => (
  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors group ${active ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}>
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
      <span className="text-xs font-bold tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-2">
       {count && <span className="text-[10px] font-mono font-bold opacity-40">{count}</span>}
       {expandable && <span className="text-[10px] opacity-20">▼</span>}
    </div>
  </div>
);

const StatCard = ({ label, value, change, icon }: any) => (
  <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <p className="text-white font-bold text-xs tracking-tight">{label}</p>
      <span className="text-zinc-600 text-sm opacity-50">{icon}</span>
    </div>
    <h3 className="text-2xl font-black text-white mb-1">{value}</h3>
    <p className="text-zinc-500 text-[10px] font-medium">{change}</p>
  </div>
);

const ActivityItem = ({ marketplace, event, time }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${marketplace === 'Amazon' ? 'bg-orange-500' : marketplace === 'Flipkart' ? 'bg-blue-500' : 'bg-pink-500'}`}></div>
      <div>
        <p className="text-white text-xs font-bold tracking-tight">{event}</p>
        <p className="text-zinc-500 text-[10px]">{marketplace}</p>
      </div>
    </div>
    <p className="text-zinc-500 text-[10px] italic">{time}</p>
  </div>
);