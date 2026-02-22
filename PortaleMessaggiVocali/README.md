# Portale per l'invio di Messaggi Vocali 

Si tratta di un portale web che permette agli utenti di registrare messaggi vocali e inviarli direttamente via email.  
Il progetto è stato creato per un evento, offrendo un modo semplice e rapido per condividere messaggi vocali senza la necessità di scaricare applicazioni aggiuntive. <br>

## Funzionalità
- Registrazione vocale direttamente dal browser.
- Invio sicuro del messaggio registrato tramite EmailJS.
- Upload automatico su Cloudinary per la gestione degli audio.
- Compatibile con desktop e dispositivi mobili (iOS/Android).
- Blocco multiplo invio per evitare spam.

## Come usare
1. Aprire il sito web.
2. Cliccare su **🎙️ Registra** per iniziare la registrazione.
3. Cliccare su **⏹️ Ferma** per terminare la registrazione.
4. Cliccare su **📧 Invia** per inviare il messaggio vocale all’email preimpostata.

## Tecnologie utilizzate
- HTML5 / CSS3 / JavaScript
- [EmailJS](https://www.emailjs.com/) per l’invio email senza backend.
- [Cloudinary](https://cloudinary.com/) per l’upload e gestione dei file audio.
- MediaRecorder API per la registrazione audio nel browser.

## Configurazione
Per utilizzare il progetto sul tuo ambiente locale:

1. Clona la repository:
   ```bash
   git clone https://github.com/18Michele2025/18michele2025.github.io
2. Configura EmailJS con le tue credenziali:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`

3. Configura Cloudinary con:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_UPLOAD_PRESET`

