# 🎲 Farkle – Pistelaskuri (PWA)

Kevyt ja mobiiliystävällinen **Farkle-pistelaskuri**, joka toimii myös offline-tilassa.  
Projekti on toteutettu **Progressive Web App (PWA)** -tekniikalla, joten sen voi asentaa aloitusnäyttöön kuten tavallisen sovelluksen.

## ✨ Ominaisuudet

- Selkeä pistelaskuri yhdelle tai useammalle pelaajalle
- Värikoodatut pistenapit eri yhdistelmille
- Moninpeli: vuoro ei vaihdu automaattisesti → valitse aktiivinen pelaaja rivistä
- Yksinpeli: ei 1000 pisteen aloitusrajaa
- **Bust**: nollaa kuluvan vuoron pisteet  
- **Undo**: peruu viimeisimmän lisäyksen pelaajalta
- Offline-tuki (service worker + varasivu)
- Lisättävissä aloitusnäyttöön (Android / iOS / Desktop)

## 📂 Projektin rakenne

```
index.html              # Pääsovellus (aiempi farkle.html)
manifest.webmanifest    # PWA-manifesti
sw.js                   # Service Worker (offline-välimuisti)
offline.html            # Varasivu offline-tilaan
icons/
  ├─ icon-192.png
  └─ icon-512.png
README.md               # Tämä tiedosto
```

## 🚀 Käyttö paikallisesti

1. Asenna kevyt HTTP-palvelin, esim.:
   ```bash
   npm install -g http-server
   ```
2. Aja projektia paikallisesti:
   ```bash
   http-server .
   ```
3. Avaa selaimessa: [http://localhost:8080](http://localhost:8080)

⚠️ **Huom:** Service Worker toimii vain **http(s)**-protokollan yli, ei `file://`.

## 📱 Asennus mobiililaitteelle

- Avaa `index.html` selaimessa.
- Valitse selaimen valikosta **“Lisää aloitusnäyttöön”**.
- Sovellus toimii tämän jälkeen erillisenä appina myös offline-tilassa.

## 🔄 Päivitys

- Service Worker välimuistittaa sovelluksen tiedostot.
- Kun teet muutoksia, **muuta `CACHE_VERSION`** -arvoa tiedostossa `sw.js`, esim.:
  ```js
  const CACHE_VERSION = 'v1.0.1';
  ```
- Tämä pakottaa selaimet lataamaan uusimman version.

## 🌐 Julkaisu GitHub Pagesiin

1. Lisää kaikki tiedostot GitHub-repoosi (esim. juureen tai `docs/`-kansioon).
2. Mene repoasetuksiin → **Pages** → Source: `main` branch ja kansio: `/(root)` tai `docs/`.
3. Sovellus on käytettävissä osoitteessa:
   ```
   https://<käyttäjänimi>.github.io/<repo>/
   ```

---

Lisenssi: MIT  
Tekijä: Jouko Riikonen
