import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ServicioBusqueda } from '../servicio-busqueda';

interface WatchItem {
  serie_id: number;
  titulo_formateado: string;
  es_top: boolean;
}

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages {
   query = '';
    resultados: any[] = []; // cada elemento tiene la forma { score, show: {...} }
    watchlistKey = 'mi_watchlist';
    watchlist: WatchItem[] = [];
  
    constructor(private tvService: ServicioBusqueda) {}
  
    ngOnInit(): void {
      this.loadWatchlist();
    }
  
    buscar(): void {
      const q = (this.query || '').trim();
      if (!q) {
        this.resultados = [];
        return;
      }
      this.tvService.buscarShows(q).subscribe({
        next: res => {
          this.resultados = res || [];
        },
        error: err => {
          console.error('Error buscando en TVMaze', err);
          this.resultados = [];
        }
      });
    }
  
    private loadWatchlist(): void {
      try {
        const raw = localStorage.getItem(this.watchlistKey);
        this.watchlist = raw ? JSON.parse(raw) as WatchItem[] : [];
      } catch {
        this.watchlist = [];
      }
    }
  
    private saveWatchlist(): void {
      localStorage.setItem(this.watchlistKey, JSON.stringify(this.watchlist));
    }
  
    isInWatchlist(serie_id: number): boolean {
      return this.watchlist.some(i => i.serie_id === serie_id);
    }
  
    toggleWatchlist(show: any): void {
  
      const id = show?.id;
      if (!id) return;
  
      const idx = this.watchlist.findIndex(i => i.serie_id === id);
      if (idx >= 0) {
        // eliminar
        this.watchlist.splice(idx, 1);
        this.saveWatchlist();
        return;
      }
  
      const premiered = show?.premiered || null;
      const year = premiered ? (premiered.substring(0,4)) : 's/a';
      const ratingNum = show?.rating?.average ?? null;
      const esTop = (ratingNum !== null && ratingNum >= 8);
  
      const item: WatchItem = {
        serie_id: id,
        titulo_formateado: `${show?.name || 'Sin nombre'} (${year})`,
        es_top: esTop
      };
  
      this.watchlist.push(item);
      this.saveWatchlist();
    }
  
    displayRating(show: any): string {
      const val = show?.rating?.average;
      return (val === null || val === undefined) ? 'Sin calificar' : val.toString();
    }
  
    getRatingNumber(show: any): number | null {
      const val = show?.rating?.average;
      return (val === null || val === undefined) ? null : Number(val);
    }
}
