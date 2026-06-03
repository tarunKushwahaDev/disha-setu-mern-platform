'use client';

import { useState } from 'react';
import {
  Radio,
  Smartphone,
  RefreshCw,
  Upload,
  Download,
  Signal,
  SignalLow,
  SignalMedium,
  Check,
  Loader2,
} from 'lucide-react';
import { useConnectivity } from '@/hooks/use-connectivity';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import type { MeshDevice } from '@/lib/store/app-store';

export function MeshSyncPanel() {
  const { t } = useTranslation();
  const {
    connectivity,
    meshDevices,
    isScanningDevices,
    scanForDevices,
    syncData,
    shareViaMesh,
    receiveFromMesh,
  } = useConnectivity();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [activeTransfers, setActiveTransfers] = useState<Record<string, 'share' | 'receive' | null>>({});

  const handleScan = async () => {
    await scanForDevices();
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    const result = await syncData();
    setIsSyncing(false);
    setSyncResult(result.success ? `Synced from ${result.source}` : 'Sync failed');
    setTimeout(() => setSyncResult(null), 3000);
  };

  const handleShare = async (deviceId: string) => {
    setActiveTransfers((prev) => ({ ...prev, [deviceId]: 'share' }));
    await shareViaMesh(deviceId, { type: 'scholarship-updates' });
    setActiveTransfers((prev) => ({ ...prev, [deviceId]: null }));
  };

  const handleReceive = async (deviceId: string) => {
    setActiveTransfers((prev) => ({ ...prev, [deviceId]: 'receive' }));
    await receiveFromMesh(deviceId);
    setActiveTransfers((prev) => ({ ...prev, [deviceId]: null }));
  };

  const getSignalIcon = (strength: number) => {
    if (strength >= 80) return Signal;
    if (strength >= 50) return SignalMedium;
    return SignalLow;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Radio className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Bluetooth Mesh Sync</h3>
            <p className="text-sm text-muted-foreground">
              Share data with nearby offline devices
            </p>
          </div>
        </div>
        <div
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            connectivity === 'mesh'
              ? 'bg-primary/20 text-primary'
              : connectivity === 'online'
              ? 'bg-success/20 text-success'
              : 'bg-warning/20 text-warning-foreground'
          )}
        >
          {connectivity === 'mesh' ? 'Mesh Active' : connectivity === 'online' ? 'Online' : 'Offline'}
        </div>
      </div>

      {/* Sync Controls */}
      <div className="flex gap-3">
        <button
          onClick={handleScan}
          disabled={isScanningDevices}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg',
            'bg-secondary text-secondary-foreground',
            'hover:bg-secondary/80 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <RefreshCw className={cn('w-4 h-4', isScanningDevices && 'animate-spin')} />
          {isScanningDevices ? t('connectivity.scanning') : 'Scan Devices'}
        </button>
        <button
          onClick={handleSync}
          disabled={isSyncing || connectivity === 'offline'}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg',
            'bg-primary text-primary-foreground',
            'hover:bg-primary/90 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {isSyncing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : syncResult ? (
            <Check className="w-4 h-4" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {syncResult || t('connectivity.sync')}
        </button>
      </div>

      {/* Device List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          {t('connectivity.devices')} ({meshDevices.length})
        </h4>

        {meshDevices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No nearby devices found</p>
            <p className="text-xs mt-1">Click &quot;Scan Devices&quot; to search</p>
          </div>
        ) : (
          <div className="space-y-2">
            {meshDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                isTransferring={activeTransfers[device.id]}
                onShare={() => handleShare(device.id)}
                onReceive={() => handleReceive(device.id)}
                getSignalIcon={getSignalIcon}
              />
            ))}
          </div>
        )}
      </div>

      {/* Data Flow Visualization */}
      {meshDevices.length > 0 && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Data Flow Network
          </h4>
          <div className="relative h-32 bg-muted/30 rounded-lg overflow-hidden">
            <DataFlowVisualization devices={meshDevices} />
          </div>
        </div>
      )}
    </div>
  );
}

interface DeviceCardProps {
  device: MeshDevice;
  isTransferring: 'share' | 'receive' | null | undefined;
  onShare: () => void;
  onReceive: () => void;
  getSignalIcon: (strength: number) => typeof Signal;
}

function DeviceCard({
  device,
  isTransferring,
  onShare,
  onReceive,
  getSignalIcon,
}: DeviceCardProps) {
  const SignalIcon = getSignalIcon(device.signalStrength);

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 rounded-lg',
        'bg-muted/50 border border-border',
        isTransferring && 'border-primary bg-primary/5'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Smartphone className="w-5 h-5 text-muted-foreground" />
          {device.dataAvailable && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{device.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <SignalIcon className="w-3 h-3" />
            <span>{device.signalStrength}%</span>
            {device.dataAvailable && (
              <span className="text-primary">Has updates</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onShare}
          disabled={!!isTransferring}
          className={cn(
            'p-2 rounded-lg transition-colors',
            'hover:bg-secondary',
            isTransferring === 'share' && 'bg-primary/20'
          )}
          title="Share data"
        >
          {isTransferring === 'share' ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Upload className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <button
          onClick={onReceive}
          disabled={!!isTransferring || !device.dataAvailable}
          className={cn(
            'p-2 rounded-lg transition-colors',
            'hover:bg-secondary',
            'disabled:opacity-50',
            isTransferring === 'receive' && 'bg-primary/20'
          )}
          title="Receive data"
        >
          {isTransferring === 'receive' ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Download className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

function DataFlowVisualization({ devices }: { devices: MeshDevice[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Center node (this device) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Smartphone className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          You
        </div>
      </div>

      {/* Connected devices */}
      {devices.slice(0, 4).map((device, index) => {
        const angle = (index * 90 + 45) * (Math.PI / 180);
        const radius = 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={device.id}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Connection line */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '120px',
              }}
            >
              <line
                x1="60"
                y1="60"
                x2={60 - x}
                y2={60 - y}
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-border"
              />
              {device.dataAvailable && (
                <circle
                  r="3"
                  fill="currentColor"
                  className="text-primary"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M60,60 L${60 - x},${60 - y}`}
                  />
                </circle>
              )}
            </svg>

            {/* Device node */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                device.dataAvailable ? 'bg-success/20' : 'bg-muted'
              )}
            >
              <Smartphone className="w-4 h-4 text-foreground" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
