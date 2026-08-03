import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Eye,
  FileText,
  DollarSign,
  Users,
  User,
  Shield,
  CheckCircle,
  Clock,
  FileEdit,
  UserPlus,
  Mail,
} from 'lucide-react';

const iconMap = {
  '📊': <LayoutDashboard className="h-5 w-5" />,
  '🏠': <Building2 className="h-5 w-5" />,
  '➕': <PlusCircle className="h-5 w-5" />,
  '📈': <BarChart3 className="h-5 w-5" />,
  '💬': <MessageSquare className="h-5 w-5" />,
  '⚙️': <Settings className="h-5 w-5" />,
  '🚪': <LogOut className="h-5 w-5" />,
  '👁️': <Eye className="h-5 w-5" />,
  '📄': <FileText className="h-5 w-5" />,
  '💰': <DollarSign className="h-5 w-5" />,
  '👥': <Users className="h-5 w-5" />,
  '🛡️': <Shield className="h-5 w-5" />,
  '✅': <CheckCircle className="h-5 w-5" />,
  '⏳': <Clock className="h-5 w-5" />,
  '📝': <FileEdit className="h-5 w-5" />,
  '👤': <User className="h-5 w-5" />,
  '✏️': <FileEdit className="h-5 w-5" />,
  '🔐': <Shield className="h-5 w-5" />,
  '🔔': <MessageSquare className="h-5 w-5" />,
  '📋': <FileText className="h-5 w-5" />,
  '📧': <Mail className="h-5 w-5" />,
  '➕👤': <UserPlus className="h-5 w-5" />,
};

export const DashboardSidebar = ({ items }) => {
  const location = useLocation();

  const resolveIcon = (icon) => {
    if (typeof icon === 'string') {
      return iconMap[icon] || <span className="text-base">{icon}</span>;
    }
    return icon;
  };

  return (
    <aside className="sticky top-0 h-screen w-full overflow-y-auto bg-brand-800 text-white shadow-xl md:w-72">
      <nav className="space-y-6 px-4 py-6">
        {items.map((group, index) => (
          <div key={index}>
            {group.title && (
              <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-brand-200/60">
                {group.title}
              </h3>
            )}
            {group.items && (
              <div className="space-y-1">
                {group.items.map((link, idx) => {
                  const isActive =
                    link.active !== undefined
                      ? link.active
                      : link.path
                        ? location.pathname + location.search === link.path ||
                          location.pathname === link.path
                        : false;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={link.onClick}
                      className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-gradient text-white shadow-md'
                          : link.danger
                            ? 'text-brand-100/80 hover:bg-red-500/20 hover:text-red-200'
                            : 'text-brand-100/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div
                        className={`transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-brand-200'
                        }`}
                      >
                        {resolveIcon(link.icon)}
                      </div>
                      <span className="font-medium">{link.label}</span>
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-white" />
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
