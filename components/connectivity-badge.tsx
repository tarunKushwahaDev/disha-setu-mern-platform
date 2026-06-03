'use client';

import { Wifi, WifiOff, Radio } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function ConnectivityBadge() {
  const { t } = useTranslation();
  const connectivity = useAppStore((state) => state.connectivity);
  const lastSyncTime = useAppStore((state) => state.lastSyncTime);

  const formatLastSync = (date: Date | null) => {
    if (!date) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const statusConfig = {
    online: {
      icon: Wifi,
      label: t('connectivity.online'),
      color: 'bg-success/20 text-success border-success/30',
      dotColor: 'bg-success',
    },
    offline: {
      icon: WifiOff,
      label: t('connectivity.offline'),
      color: 'bg-warning/20 text-warning-foreground border-warning/30',
      dotColor: 'bg-warning',
    },
    mesh: {
      icon: Radio,
      label: t('connectivity.mesh'),
      color: 'bg-primary/20 text-primary border-primary/30',
      dotColor: 'bg-primary',
    },
  };

  const config = statusConfig[connectivity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm',
        'transition-all duration-300',
        config.color
      )}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75',
            config.dotColor,
            connectivity !== 'offline' && 'animate-ping'
          )}
        />
        <span
          className={cn('relative inline-flex rounded-full h-2 w-2', config.dotColor)}
        />
      </span>
      <Icon className="w-4 h-4" />
      <span className="font-medium">{config.label}</span>
      {lastSyncTime && connectivity !== 'online' && (
        <span className="text-xs opacity-75">
          {t('connectivity.lastSync')}: {formatLastSync(lastSyncTime)}
        </span>
      )}
    </div>
  );
}
