# Revolution Minds - App Guida

Questa applicazione è stata sviluppata per promuovere il consumo consapevole e mappare i negozi di abbigliamento usato a Verona.

## Come Pubblicare il Sito su GitHub Pages

Ho già configurato le **GitHub Actions** per te. Segui questi passi per mettere il sito online:

1. **Crea un repository su GitHub**: Carica tutti i file del progetto in un nuovo repository.
2. **Attiva GitHub Pages**:
   - Vai nelle **Settings** del tuo repository su GitHub.
   - Clicca su **Pages** nella barra laterale sinistra.
   - Sotto la sezione **Build and deployment**, cambia la "Source" da `Deploy from a branch` a `GitHub Actions`.
3. **Pousha le modifiche**: Ogni volta che farai un `git push` sulla branch `main`, GitHub Actions costruirà il sito e lo pubblicherà automaticamente.

## Caratteristiche
- **Mappa Interattiva**: Tutti i negozi "Second Hand" della provincia di Verona.
- **Mission**: Documentazione sul fast fashion e l'impatto ambientale.
- **Educational**: Quiz sulla carbon footprint.
- **Mobile Optimized**: Design pronto per l'uso da smartphone senza barre di scorrimento visibili.

## Sviluppo Locale

```bash
# Installa le dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Costruisci per la produzione
npm run build
```
