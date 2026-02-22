# Guidaldi – Home Page Personalizzata per Google Chrome

Si tratta di un’estensione per Google Chrome che sostituisce la pagina ‘Nuova scheda’ con una dashboard personalizzata, che include:

- ⏰ Orologio in tempo reale  
- 📅 Data dinamica  
- 🌤️ Meteo in tempo reale
- 🔎 Barra di ricerca Google  
- 🔗 Pulsanti rapidi verso i siti preferiti  

---

## ⚙️ Installazione su Google Chrome

1. Apri **Impostazioni** di Chrome
2. Vai su: chrome://settings/onStartup
3. Seleziona **Apri una pagina specifica o un insieme di pagine**
4. Clicca su **Aggiungi una nuova pagina**
5. Inserisci il percorso del file `index.html`

In questo modo verrà mostrata anche all’apertura del browser.

1. Apri Google Chrome
2. Vai su: chrome://extensions
3. Attiva **Modalità sviluppatore** (in alto a destra)
4. Clicca su **Carica estensione non pacchettizzata**
5. Seleziona la cartella del progetto `Guidaldi`

In questo modo ogni nuova scheda mostrerà Guidaldi.

---

## 🔑 Configurazione API Meteo

Questa estensione usa [OpenWeatherMap](https://openweathermap.org).

### 1. Crea una API Key

1. Vai su [https://openweathermap.org](https://openweathermap.org)
2. Registrati
3. Vai su **My API Keys**
4. Copia la tua chiave

### 2. Inserisci i dati nel codice

Apri il file: script.js

Inserisci la key della tua API come valore di questa costante
```javascript
const CHIAVE_API = '';
```
Inserisci il nome della tua città come valore di questa costante
```javascript
const CITTA = '';
```

## 🛠️ Tecnologie utilizzate

- **HTML5 / CSS3 / JavaScript**
- **Chrome Extensions API (Manifest V3)** – Per trasformare la pagina in una Nuova Scheda di Chrome
- **OpenWeatherMap API** – Per recuperare i dati meteo in tempo reale

