'use client';

import { useEffect, useCallback } from 'react';
import { useAppStore, type MeshDevice } from '@/lib/store/app-store';

export function useConnectivity() {
  const connectivity = useAppStore((state) => state.connectivity);
  const setConnectivity = useAppStore((state) => state.setConnectivity);
  const lastSyncTime = useAppStore((state) => state.lastSyncTime);
  const setLastSyncTime = useAppStore((state) => state.setLastSyncTime);
  const meshDevices = useAppStore((state) => state.meshDevices);
  const addMeshDevice = useAppStore((state) => state.addMeshDevice);
  const removeMeshDevice = useAppStore((state) => state.removeMeshDevice);
  const isScanningDevices = useAppStore((state) => state.isScanningDevices);
  const setIsScanningDevices = useAppStore((state) => state.setIsScanningDevices);
  const offlineCacheReady = useAppStore((state) => state.offlineCacheReady);
  const setOfflineCacheReady = useAppStore((state) => state.setOfflineCacheReady);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      if (meshDevices.length > 0) {
        setConnectivity('mesh');
      } else {
        setConnectivity('online');
      }
    };

    const handleOffline = () => {
      if (meshDevices.length > 0) {
        setConnectivity('mesh');
      } else {
        setConnectivity('offline');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial state
    if (!navigator.onLine) {
      setConnectivity('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [meshDevices.length, setConnectivity]);

  // Simulate mesh device scanning
  const scanForDevices = useCallback(async () => {
    setIsScanningDevices(true);
    
    // Simulate BLE/WiFi Direct scanning delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate finding devices (in real app, this would use Web Bluetooth API)
    const simulatedDevices: MeshDevice[] = [
      {
        id: 'device-1',
        name: 'Peer Device - Ramesh',
        signalStrength: 85,
        lastSeen: new Date(),
        dataAvailable: true,
      },
      {
        id: 'device-2',
        name: 'Seed Node - School Hub',
        signalStrength: 92,
        lastSeen: new Date(),
        dataAvailable: true,
      },
      {
        id: 'device-3',
        name: 'Peer Device - Priya',
        signalStrength: 67,
        lastSeen: new Date(),
        dataAvailable: false,
      },
    ];

    simulatedDevices.forEach((device) => {
      addMeshDevice(device);
    });

    setIsScanningDevices(false);
    
    if (!navigator.onLine && simulatedDevices.length > 0) {
      setConnectivity('mesh');
    }
    
    return simulatedDevices;
  }, [addMeshDevice, setConnectivity, setIsScanningDevices]);

  // Sync data with server or mesh network
  const syncData = useCallback(async () => {
    try {
      if (connectivity === 'online') {
        // Simulate server sync
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLastSyncTime(new Date());
        setOfflineCacheReady(true);
        return { success: true, source: 'server' };
      } else if (connectivity === 'mesh' && meshDevices.length > 0) {
        // Simulate mesh sync
        await new Promise((resolve) => setTimeout(resolve, 2500));
        setLastSyncTime(new Date());
        return { success: true, source: 'mesh' };
      }
      return { success: false, source: 'none' };
    } catch {
      return { success: false, source: 'error' };
    }
  }, [connectivity, meshDevices.length, setLastSyncTime, setOfflineCacheReady]);

  // Share data via mesh network
  const shareViaMesh = useCallback(async (deviceId: string, data: unknown) => {
    const device = meshDevices.find((d) => d.id === deviceId);
    if (!device) return { success: false, error: 'Device not found' };

    // Simulate data transfer
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    console.log('[v0] Sharing data with device:', deviceId, data);
    return { success: true, deviceName: device.name };
  }, [meshDevices]);

  // Receive data from mesh network
  const receiveFromMesh = useCallback(async (deviceId: string) => {
    const device = meshDevices.find((d) => d.id === deviceId);
    if (!device) return { success: false, error: 'Device not found' };
    if (!device.dataAvailable) return { success: false, error: 'No data available' };

    // Simulate data reception
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1500));
    
    return { 
      success: true, 
      deviceName: device.name,
      dataReceived: {
        scholarships: 15,
        careerPaths: 8,
        notifications: 3,
      }
    };
  }, [meshDevices]);

  return {
    connectivity,
    setConnectivity,
    lastSyncTime,
    meshDevices,
    addMeshDevice,
    removeMeshDevice,
    isScanningDevices,
    scanForDevices,
    syncData,
    shareViaMesh,
    receiveFromMesh,
    offlineCacheReady,
  };
}
