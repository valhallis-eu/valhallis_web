# VALHALLIS ADVISORS - Website

Strona internetowa VALHALLIS ADVISORS z funkcjonalnością wysyłania e-maili, weryfikacji adresów e-mail i obsługą wielojęzyczności.

## Funkcjonalności

- 🌐 **Wielojęzyczność**: Polski i Angielski
- 📧 **Weryfikacja e-mail**: Bezpieczna weryfikacja adresów e-mail
- 📝 **Formularz kontaktowy**: Wysyłanie zapytań o konsultację
- 🔒 **Bezpieczeństwo**: Ochrona przed spamem, rate limiting
- 📱 **Responsywność**: Dostosowana do urządzeń mobilnych
- 🎨 **Nowoczesny design**: Tailwind CSS, animacje

## Technologie

### Frontend
- React 18 + TypeScript
- Vite (bundler)
- Tailwind CSS (styling)
- i18next (internacjonalizacja)
- Lucide React (ikony)

### Backend
- Node.js + Express
- Nodemailer (wysyłanie e-maili)
- Helmet (bezpieczeństwo)
- express-rate-limit (rate limiting)

## Instalacja

1. **Sklonuj repozytorium**
   ```bash
   git clone <repository-url>
   cd VALHALLIS_WEB_SITE
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe**
   ```bash
   cp .env.example .env
   # Edytuj .env i ustaw rzeczywiste wartości
   ```

4. **Uruchom serwer deweloperski**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run server
   ```

## Konfiguracja

### Zmienne środowiskowe (.env)

```env
# Server Configuration
PORT=3001
PUBLIC_BASE_URL=http://localhost:3000

# Email Configuration
CONTACT_EMAIL=advisors@valhallis.eu
SUPPORT_EMAIL=advisors@valhallis.eu
ADMIN_EMAIL=advisors@valhallis.eu

# SMTP Configuration
SMTP_HOST=smtp.valhallis.eu
SMTP_PORT=587
SMTP_USER=no-reply@valhallis.eu
SMTP_PASS=your_smtp_password_here

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:3001
```

### SMTP Configuration

Dla rozwoju lokalnego system automatycznie używa Ethereal (test SMTP) jeśli:
- Brakuje rzeczywistych danych SMTP
- `SMTP_PASS` jest ustawione na 'changeme'

## Struktura projektu

```
VALHALLIS_WEB_SITE/
├── src/
│   ├── components/          # Komponenty React
│   ├── config/             # Konfiguracja
│   ├── lib/                # Biblioteki i funkcje
│   ├── locales/            # Tłumaczenia
│   └── main.tsx            # Punkt wejścia
├── server/
│   └── index.js            # Backend Express
├── public/
│   └── assets/             # Obrazy i logo
└── package.json
```

## Deployment

### Frontend (GitHub Pages)
```bash
npm run build
# Prześlij zawartość dist/ do GitHub Pages
```

### Backend (Render/Railway)
```bash
# Skonfiguruj zmienne środowiskowe na platformie
# Wdróż server/index.js
```

## Bezpieczeństwo

- ✅ Rate limiting na endpointach e-mail
- ✅ Walidacja danych wejściowych
- ✅ Ochrona przed spamem (honeypot, minimalny czas wypełnienia)
- ✅ Bezpieczne nagłówki HTTP (Helmet)
- ✅ Weryfikacja podpisów webhook (przygotowane)

## Licencja

Wszystkie prawa zastrzeżone - VALHALLIS ADVISORS
