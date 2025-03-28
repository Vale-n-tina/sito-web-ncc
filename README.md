# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
Il progetto backend si trova su GitHub al seguente link: [Backend Repository](https://github.com/Vale-n-tina/BackAndNcc)

Il mio progetto prevede la creazione di un sito web per la gestione delle prenotazioni di corse NCC (Noleggio Con Conducente) destinate sia ai turisti che ai clienti locali. Utilizzando le API di Google Maps, il sito consentirà agli utenti di visualizzare il percorso delle corse in tempo reale, rendendo l'esperienza più interattiva e trasparente.
Il sistema calcolerà automaticamente il costo della corsa attraverso fetch al backend, garantendo un servizio dinamico e preciso. Il sito presenterà anche una sezione dedicata ai vari servizi offerti dall'azienda, come tour e altri pacchetti personalizzati, permettendo agli utenti di esplorare tutte le opzioni disponibili.

Il sito sarà sviluppato in React con  TypeScript per il frontend, mentre il backend sarà realizzato in Java per gestire la logica applicativa, le richieste e la gestione dei dati.

Inoltre, una pagina di login consentirà all'amministratore del sito di accedere e visualizzare tutte le prenotazioni effettuate, permettendo di gestire facilmente le richieste dei clienti. Ogni volta che un cliente effettuerà una registrazione, una email di conferma verrà inviata automaticamente, sia al cliente che all'amministratore, per confermare la prenotazione e garantire una comunicazione efficiente e tempestiva.

Questo progetto mira a semplificare il processo di prenotazione per gli utenti e ottimizzare la gestione delle corse e dei servizi da parte dell'azienda, attraverso un'esperienza utente moderna, intuitiva e funzionale.
