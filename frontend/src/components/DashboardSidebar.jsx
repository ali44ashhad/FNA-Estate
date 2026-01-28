import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Eye,
  FileText,
  DollarSign,
  Users,
  Shield,
  CheckCircle,
  Clock,
  FileEdit
} from 'lucide-react';

export const DashboardSidebar = ({ items, title = 'Dashboard' }) => {
  const location = useLocation();

  const iconMap = {
    '📊': <LayoutDashboard className="w-5 h-5" />,
    '🏠': <Home className="w-5 h-5" />,
    '➕': <PlusCircle className="w-5 h-5" />,
    '📈': <BarChart3 className="w-5 h-5" />,
    '💬': <MessageSquare className="w-5 h-5" />,
    '⚙️': <Settings className="w-5 h-5" />,
    '🚪': <LogOut className="w-5 h-5" />,
    '👁️': <Eye className="w-5 h-5" />,
    '📄': <FileText className="w-5 h-5" />,
    '💰': <DollarSign className="w-5 h-5" />,
    '👥': <Users className="w-5 h-5" />,
    '🛡️': <Shield className="w-5 h-5" />,
    '✅': <CheckCircle className="w-5 h-5" />,
    '⏳': <Clock className="w-5 h-5" />,
    '📝': <FileEdit className="w-5 h-5" />,
    '👤': <Users className="w-5 h-5" />,
    '✏️': <FileEdit className="w-5 h-5" />,
    '🔐': <Shield className="w-5 h-5" />,
    '🔔': <MessageSquare className="w-5 h-5" />,
    '📋': <FileText className="w-5 h-5" />
  };

  return (
    <aside className="bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen sticky top-0 w-full md:w-72 shadow-2xl overflow-y-auto">
      {/* Brand Header */}
      <div className="p-8 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-xl">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">FNAEstate</h2>
            <p className="text-sm text-slate-400 font-medium">{title}</p>
          </div>
        </div>
      </div>
 

      {/* Navigation Items */}
      <nav className="py-6 px-4">
        {items.map((item, index) => (
          <div key={index}>
            {item.items && (
              <div className="space-y-1">
                {item.items.map((link, idx) => {
                  const IconComponent = iconMap[link.icon] || <div>{link.icon}</div>;
                  // Support both route-based (path) and state-based (active prop) navigation
                  const isActive = link.active !== undefined ? link.active : (location.pathname === link.path);
                  
                  return (
                    <button
                      key={idx}
                      onClick={link.onClick}
                      className={`w-full text-left px-4 py-4 transition-all duration-300 rounded-xl flex items-center gap-3 group ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <div className={`transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}>
                        {IconComponent}
                      </div>
                      <span className="font-medium">{link.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

       
    </aside>
  );
};