// Offline Data Sync Utilities for DishaSetu
// Handles data serialization, compression, and mesh network sync

export interface SyncPayload {
  type: 'scholarships' | 'careers' | 'quiz_results' | 'applications' | 'notifications';
  timestamp: number;
  version: string;
  data: unknown;
  checksum: string;
}

export interface PeerDevice {
  id: string;
  name: string;
  type: 'seed' | 'peer';
  lastSeen: number;
  dataVersion: string;
}

// Simple checksum for data integrity
export function generateChecksum(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Compress data for efficient transfer
export function compressPayload(data: unknown): string {
  const jsonString = JSON.stringify(data);
  // Simple RLE-like compression for repeated patterns
  return btoa(jsonString);
}

// Decompress received data
export function decompressPayload(compressed: string): unknown {
  try {
    const jsonString = atob(compressed);
    return JSON.parse(jsonString);
  } catch {
    console.error('[Sync] Failed to decompress payload');
    return null;
  }
}

// Create a sync payload with metadata
export function createSyncPayload(
  type: SyncPayload['type'],
  data: unknown
): SyncPayload {
  const jsonData = JSON.stringify(data);
  return {
    type,
    timestamp: Date.now(),
    version: '1.0.0',
    data,
    checksum: generateChecksum(jsonData),
  };
}

// Validate received payload
export function validatePayload(payload: SyncPayload): boolean {
  const jsonData = JSON.stringify(payload.data);
  const expectedChecksum = generateChecksum(jsonData);
  return payload.checksum === expectedChecksum;
}

// IndexedDB wrapper for offline storage
const DB_NAME = 'dishasetu-offline';
const DB_VERSION = 1;

export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create stores for different data types
      if (!db.objectStoreNames.contains('scholarships')) {
        db.createObjectStore('scholarships', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('careers')) {
        db.createObjectStore('careers', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('quiz_results')) {
        db.createObjectStore('quiz_results', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('applications')) {
        db.createObjectStore('applications', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('sync_queue')) {
        db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('peer_devices')) {
        db.createObjectStore('peer_devices', { keyPath: 'id' });
      }
    };
  });
}

// Save data to IndexedDB
export async function saveOfflineData(
  storeName: string,
  data: unknown[]
): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  
  for (const item of data) {
    store.put(item);
  }
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Get data from IndexedDB
export async function getOfflineData<T>(storeName: string): Promise<T[]> {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
  });
}

// Add item to sync queue for later upload
export async function addToSyncQueue(
  type: string,
  data: unknown
): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction('sync_queue', 'readwrite');
  const store = transaction.objectStore('sync_queue');
  
  store.add({
    type,
    data,
    timestamp: Date.now(),
    synced: false,
  });
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Process sync queue when online
export async function processSyncQueue(): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction('sync_queue', 'readwrite');
  const store = transaction.objectStore('sync_queue');
  const request = store.getAll();
  
  request.onsuccess = async () => {
    const items = request.result;
    
    for (const item of items) {
      if (!item.synced) {
        try {
          // Attempt to sync with server
          const response = await fetch(`/api/${item.type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.data),
          });
          
          if (response.ok) {
            // Mark as synced
            item.synced = true;
            store.put(item);
          }
        } catch (error) {
          console.error('[Sync] Failed to sync item:', error);
        }
      }
    }
  };
}

// Bluetooth Mesh Sync Simulation
// Note: Real Bluetooth/BLE requires platform APIs (Web Bluetooth API)
// This simulates the mesh network behavior for demonstration

export class MeshSyncManager {
  private deviceId: string;
  private deviceName: string;
  private peers: Map<string, PeerDevice> = new Map();
  private onPeerDiscovered?: (peer: PeerDevice) => void;
  private onDataReceived?: (data: SyncPayload) => void;
  private onSyncProgress?: (progress: number) => void;
  private scanInterval?: ReturnType<typeof setInterval>;
  private isSeedDevice: boolean = false;

  constructor(deviceName: string) {
    this.deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.deviceName = deviceName;
  }

  // Set as seed device (has internet connection)
  setSeedDevice(isSeed: boolean): void {
    this.isSeedDevice = isSeed;
  }

  // Start scanning for nearby peers
  startScanning(onPeerDiscovered: (peer: PeerDevice) => void): void {
    this.onPeerDiscovered = onPeerDiscovered;
    
    // Simulate discovering peers
    this.scanInterval = setInterval(() => {
      // In real implementation, this would use Web Bluetooth API
      // navigator.bluetooth.requestDevice({ filters: [...] })
      this.simulatePeerDiscovery();
    }, 3000);
  }

  // Stop scanning
  stopScanning(): void {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = undefined;
    }
  }

  // Simulate peer discovery
  private simulatePeerDiscovery(): void {
    // Simulate finding 1-3 random peers
    const peerCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < peerCount; i++) {
      const peer: PeerDevice = {
        id: `peer_${Date.now()}_${i}`,
        name: `Device ${Math.floor(Math.random() * 1000)}`,
        type: Math.random() > 0.7 ? 'seed' : 'peer',
        lastSeen: Date.now(),
        dataVersion: '1.0.0',
      };
      
      if (!this.peers.has(peer.id)) {
        this.peers.set(peer.id, peer);
        this.onPeerDiscovered?.(peer);
      }
    }
  }

  // Connect to a peer
  async connectToPeer(peerId: string): Promise<boolean> {
    const peer = this.peers.get(peerId);
    if (!peer) return false;

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`[Mesh] Connected to ${peer.name}`);
    return true;
  }

  // Request data from a seed device
  async requestDataFromSeed(
    peerId: string,
    dataType: SyncPayload['type'],
    onProgress: (progress: number) => void
  ): Promise<SyncPayload | null> {
    const peer = this.peers.get(peerId);
    if (!peer || peer.type !== 'seed') {
      console.error('[Mesh] Peer is not a seed device');
      return null;
    }

    // Simulate data transfer with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onProgress(i);
    }

    // Return simulated data
    return createSyncPayload(dataType, {
      lastUpdated: Date.now(),
      source: peer.name,
    });
  }

  // Share data with nearby peers (when this device is a seed)
  async broadcastData(payload: SyncPayload): Promise<number> {
    if (!this.isSeedDevice) {
      console.error('[Mesh] Only seed devices can broadcast');
      return 0;
    }

    let syncedCount = 0;
    const compressed = compressPayload(payload);

    for (const [, peer] of this.peers) {
      if (peer.type === 'peer') {
        // Simulate sending data to peer
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log(`[Mesh] Sent data to ${peer.name}`);
        syncedCount++;
      }
    }

    return syncedCount;
  }

  // Get all discovered peers
  getPeers(): PeerDevice[] {
    return Array.from(this.peers.values());
  }

  // Get this device's info
  getDeviceInfo(): PeerDevice {
    return {
      id: this.deviceId,
      name: this.deviceName,
      type: this.isSeedDevice ? 'seed' : 'peer',
      lastSeen: Date.now(),
      dataVersion: '1.0.0',
    };
  }

  // Cleanup
  destroy(): void {
    this.stopScanning();
    this.peers.clear();
  }
}

// Export singleton instance
let meshManager: MeshSyncManager | null = null;

export function getMeshManager(deviceName?: string): MeshSyncManager {
  if (!meshManager && deviceName) {
    meshManager = new MeshSyncManager(deviceName);
  }
  return meshManager!;
}
