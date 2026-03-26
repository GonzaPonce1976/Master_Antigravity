import { Injectable, signal } from '@angular/core';

export interface Asset {
  assetId: string;
  name: string;
  url: string;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class AssetService {
  private readonly STORAGE_KEY = 'curator_assets';
  
  assets = signal<Asset[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        try {
          let parsed: Asset[] = JSON.parse(data);
          if (parsed && parsed.length > 0) {
            
            // Forzar actualización/inserción de VID-001 y VID-030 a petición del usuario
            const idx1 = parsed.findIndex(a => a.assetId === 'VID-001');
            const targetUrl1 = 'C:\\Users\\USUARIO\\Desktop\\Master_Antigravity\\02_15_Naimara\\public\\WIN_20260322_10_47_52_Pro.mp4';
            if (idx1 >= 0) {
              parsed[idx1].url = targetUrl1;
            } else {
              parsed.push({ assetId: 'VID-001', name: 'Video Naimara (Local)', url: targetUrl1, tags: ['Marketing', 'Q4_Launch'] });
            }

            const idx30 = parsed.findIndex(a => a.assetId === 'VID-030');
            const targetUrl30 = 'C:\\Users\\USUARIO\\Desktop\\Master_Antigravity\\02_15_Naimara\\public\\EJEMPLO_030.mp4';
            if (idx30 >= 0) {
              parsed[idx30].url = targetUrl30;
            } else {
              parsed.push({ assetId: 'VID-030', name: 'Nuevo Activo 30', url: targetUrl30, tags: ['Nuevo'] });
            }

            // Eliminar duplicados en caso de que existan
            const uniqueAssets = parsed.filter((v, i, a) => a.findIndex(t => (t.assetId === v.assetId)) === i);
            this.assets.set(uniqueAssets);
            
            // Actualizar el storage con los forzados
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem(this.STORAGE_KEY, JSON.stringify(uniqueAssets));
            }
            return;
          }
        } catch (e) {
          console.error('Error parsing local storage data', e);
        }
      }
    }
    this.initializeDefaults();
  }

  private initializeDefaults() {
    const defaults: Asset[] = [
      {
        assetId: 'VID-001',
        name: 'Video Naimara (Local)',
        url: 'C:\\Users\\USUARIO\\Desktop\\Master_Antigravity\\02_15_Naimara\\public\\WIN_20260322_10_47_52_Pro.mp4',
        tags: ['Marketing', 'Q4_Launch']
      },
      {
        assetId: 'VID-030',
        name: 'Nuevo Activo 30',
        url: 'C:\\Users\\USUARIO\\Desktop\\Master_Antigravity\\02_15_Naimara\\public\\EJEMPLO_030.mp4',
        tags: ['Nuevo']
      }
    ];
    this.assets.set(defaults);
    this.saveToStorage();
  }

  private saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.assets()));
    }
  }

  saveAsset(newAsset: Asset) {
    const current = this.assets();
    const index = current.findIndex(a => a.assetId === newAsset.assetId);
    if (index >= 0) {
      const updated = [...current];
      updated[index] = newAsset;
      this.assets.set(updated);
    } else {
      this.assets.set([...current, newAsset]);
    }
    this.saveToStorage();
  }

  deleteAsset(id: string) {
    const updated = this.assets().filter(a => a.assetId !== id);
    this.assets.set(updated);
    this.saveToStorage();
  }

  getAsset(id: string): Asset | undefined {
    return this.assets().find(a => a.assetId === id);
  }
}
