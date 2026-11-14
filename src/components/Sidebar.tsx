import React, { useState } from 'react';
import {
  BarChart3,
  ClipboardCheck,
  History,
  Scale,
  X,
} from 'lucide-react';
import { MenuKey } from '../types/bhp';

interface SidebarProps {
  activeMenu: MenuKey;
  onSelectMenu: (menu: MenuKey) => void;
  pendingApprovalCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  onSelectMenu,
  pendingApprovalCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [imgError, setImgError] = useState(false);

  const navItems: Array<{
    key: MenuKey;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }> = [
    {
      key: 'dashboard',
      label: 'Dashboard Layanan',
      description: 'Rekap Layanan & SLA > 14 Hari',
      icon: BarChart3,
    },
    {
      key: 'tindak-lanjut',
      label: 'Tindak Lanjut',
      description: 'Persetujuan Dokumen Hukum',
      icon: ClipboardCheck,
      count: pendingApprovalCount,
    },
    {
      key: 'history',
      label: 'History Layanan',
      description: 'Riwayat Layanan Selesai',
      icon: History,
    },
  ];

  const handleSelect = (key: MenuKey) => {
    onSelectMenu(key);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-slate-900 text-slate-100">
      {/* Institutional Brand Block */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold tracking-tight text-white">
              BHP Surabaya
            </p>
            <p className="truncate text-xs text-slate-400">
              Kementerian Hukum RI
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Tutup menu navigasi"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Menu Utama Kepala BHP"
        className="flex-1 space-y-1.5 px-3 py-5"
      >
        <p className="px-3 pb-2 text-xs font-medium text-slate-400">
          Menu Pimpinan
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSelect(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </div>
                  <div
                    className={`truncate text-xs ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
              {typeof item.count === 'number' && (
                <span
                  className={`shrink-0 font-mono text-xs font-semibold tabular-nums ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Executive Profile Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          {!imgError ? (
            <img
              src="/src/assets/images/avatar_kepala_bhp_1794619087337.jpg"
              alt="Foto Profil Kepala BHP Surabaya"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-10 w-10 shrink-0 rounded-lg object-cover border border-slate-700"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200">
              PW
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Dr. H. Prasetyo Wibowo
            </p>
            <p className="truncate text-xs text-slate-400">
              Kepala BHP Surabaya
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <aside className="no-print hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64 lg:border-r lg:border-slate-800">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-72 max-w-[85vw] shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
