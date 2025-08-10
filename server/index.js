import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load translations
function loadTranslations(language) {
  try {
    const translationsPath = join(__dirname, '..', 'src', 'locales', `${language}.json`);
    const translations = JSON.parse(readFileSync(translationsPath, 'utf8'));
    return translations;
  } catch (error) {
    console.error(`Error loading translations for ${language}:`, error);
    // Fallback to Polish
    try {
      const fallbackPath = join(__dirname, '..', 'src', 'locales', 'pl.json');
      return JSON.parse(readFileSync(fallbackPath, 'utf8'));
    } catch (fallbackError) {
      console.error('Error loading fallback translations:', fallbackError);
      return {};
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://valhallis-eu.github.io'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Email rate limiting
const emailLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5 // limit each IP to 5 email requests per minute
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Email configuration
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const emailConfig = {
  contact: process.env.CONTACT_EMAIL,
  support: process.env.SUPPORT_EMAIL,
  admin: process.env.ADMIN_EMAIL,
  smtp: {
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }
};

// Minimal anti-spam helpers (no DB)
function isSpamLike(req) {
  try {
    const { hp, formStartMs } = req.body || {};
    if (typeof hp === 'string' && hp.trim().length > 0) return true;
    const started = Number(formStartMs) || 0;
    if (started > 0 && Date.now() - started < 2000) return true;
  } catch {}
  return false;
}

// Create nodemailer transporter (supports Ethereal in dev if SMTP creds missing)
async function getTransporter() {
  const hasValidSmtp = Boolean(
    emailConfig.smtp.host &&
    emailConfig.smtp.port &&
    emailConfig.smtp.auth?.user &&
    emailConfig.smtp.auth?.pass &&
    emailConfig.smtp.auth.pass !== 'changeme'
  );
  if (hasValidSmtp) {
    return nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: emailConfig.smtp.auth
    });
  }
  const testAccount = await nodemailer.createTestAccount();
  console.warn('Using Ethereal test SMTP. Preview emails will be available in console.');
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

function isEtherealTransport(transporter) {
  try {
    return transporter?.options?.host === 'smtp.ethereal.email';
  } catch {
    return false;
  }
}

// Simple in-memory verification tokens (no DB)
const verificationTokens = new Map();
function generateToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

// Send verification email
app.post('/api/email/verification', emailLimiter, async (req, res) => {
  try {
    if (isSpamLike(req)) {
      return res.status(429).json({ success: false, message: 'Too fast / spam detected' });
    }
    const { email, language = 'pl' } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Nieprawidłowy adres email' });
    }

    const token = generateToken();
    const expiresAt = Date.now() + (15 * 60 * 1000);
    verificationTokens.set(token, { email, expiresAt });

    const transporter = await getTransporter();

    const verificationUrl = `${req.protocol}://${req.get('host')}/verify?token=${token}`;
    const publicBaseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
    const localLogoPath = join(__dirname, '..', 'public', 'assets', 'VA_LOGO_3.png');
    const hasLocalLogo = existsSync(localLogoPath);
    const logoCid = 'va_logo@valhallis';
    const logoUrl = `${publicBaseUrl}/assets/VA_LOGO_3.png`;

    const info = await transporter.sendMail({
      from: emailConfig.smtp.auth.user,
      to: email,
      subject: language === 'en' ? 'Email Verification - VALHALLIS ADVISORS' : 'Weryfikacja adresu email - VALHALLIS ADVISORS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
        </head>
        <body style="margin:0;padding:0;background:#f5f7fb;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f7fb;">
            <tr>
              <td align="center" style="padding:24px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width:640px;background:#ffffff;border-radius:10px;box-shadow:0 4px 14px rgba(0,0,0,0.06);">
                  <tr>
                    <td align="center" style="padding:28px 28px 10px 28px;">
                      <img src="${hasLocalLogo ? `cid:${logoCid}` : logoUrl}" width="160" style="display:block;border:0;outline:none;text-decoration:none;width:160px;height:auto;" alt="VALHALLIS ADVISORS" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:4px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;color:#1a2b4a;font-size:22px;font-weight:700;">
                      ${language === 'en' ? 'Email Verification' : 'Weryfikacja adresu email'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;color:#333333;font-size:14px;line-height:22px;">
                      ${language === 'en' ? 'Click the button below to verify your email address and continue.' : 'Kliknij poniższy przycisk, aby zweryfikować adres email i kontynuować.'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 28px 16px 28px;font-family:Arial,Helvetica,sans-serif;color:#1a2b4a;font-size:16px;font-weight:600;text-align:center;background:#f8f9fa;border-left:4px solid #d4af37;margin:0 28px;">
                      ${language === 'en' ? 'Click the button below to verify your email address and continue.' : 'Kliknij poniższy przycisk, aby zweryfikować adres email i kontynuować.'}
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:8px 28px 28px 28px;">
                      <a href="${verificationUrl}" style="background:#d4af37;color:#1a2b4a;text-decoration:none;padding:12px 22px;border-radius:4px;font-weight:700;font-family:Arial,Helvetica,sans-serif;display:inline-block;">
                        ${language === 'en' ? 'VERIFY EMAIL' : 'ZWERYFIKUJ EMAIL'}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 28px 24px 28px;font-family:Arial,Helvetica,sans-serif;color:#6b7280;font-size:12px;">
                      ${language === 'en' ? 'If you did not request this email, you can ignore it.' : 'Jeśli nie prosiłeś o tę wiadomość, zignoruj ją.'}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: hasLocalLogo ? [{ filename: 'VA_LOGO_3.png', path: localLogoPath, cid: logoCid }] : []
    });
    if (isEtherealTransport(transporter)) {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) console.log('Ethereal preview (verification):', url);
    }

    res.json({ success: true, message: 'Email weryfikacyjny wysłany' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera' });
  }
});

// API: verify token and return email
app.get('/api/email/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const entry = verificationTokens.get(token);
    if (!entry) return res.status(400).json({ success: false, message: 'Nieprawidłowy token' });
    if (Date.now() > entry.expiresAt) {
      verificationTokens.delete(token);
      return res.status(400).json({ success: false, message: 'Token wygasł' });
    }
    const { email } = entry;
    verificationTokens.delete(token);
    res.json({ success: true, email });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera' });
  }
});

// Verify page — redirect to frontend with verified email (avoids inline script/CSP issues)
app.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    const entry = typeof token === 'string' ? verificationTokens.get(token) : null;
    if (!entry) return res.status(400).send('Invalid or expired link');
    if (Date.now() > entry.expiresAt) {
      verificationTokens.delete(token);
      return res.status(400).send('Link expired');
    }
    const { email } = entry;
    verificationTokens.delete(token);
    const publicBaseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = `${publicBaseUrl}/?verified_email=${encodeURIComponent(email)}`;
    res.redirect(302, redirectUrl);
  } catch (error) {
    console.error('Background verification error:', error);
    res.status(500).send('Error');
  }
});

// Email verification disabled

// Token verification disabled

// Background verification disabled

// Consultation request endpoint
app.post('/api/email/consultation', emailLimiter, async (req, res) => {
  try {
    if (isSpamLike(req)) {
      return res.status(429).json({ success: false, message: 'Too fast / spam detected' });
    }
    const { name, email, company, message, language = 'pl' } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Wszystkie wymagane pola muszą być wypełnione' });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Nieprawidłowy adres email' });
    }
    
    if (message.length > 1000) {
      return res.status(400).json({ success: false, message: 'Wiadomość jest za długa' });
    }
    
    // Create transport
    const transporter = await getTransporter();
    
    // Load translations
    const translations = loadTranslations(language);
    
    // Send consultation request to VALHALLIS ADVISORS
    const info = await transporter.sendMail({
      from: emailConfig.smtp.auth.user,
      to: emailConfig.contact,
      replyTo: email,
      subject: language === 'en' ? `New consultation request - ${name}` : `Nowe zapytanie o konsultację - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .logo { text-align: center; margin-bottom: 30px; }
            h2 { color: #1a365d; margin-bottom: 20px; font-size: 24px; }
            p { color: #333; line-height: 1.6; margin-bottom: 15px; }
            .info-box { background: #f8f9fa; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="display: inline-block; background: linear-gradient(135deg, #1a2b4a, #2d4a7a); padding: 15px 25px; border-radius: 8px; border: 2px solid #d4af37; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                  <div style="color: #d4af37; font-size: 24px; font-weight: bold; font-family: Arial, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                    VALHALLIS
                  </div>
                  <div style="color: #ffffff; font-size: 12px; font-weight: 500; font-family: Arial, sans-serif; margin-top: 2px; letter-spacing: 1px;">
                    ADVISORS
                  </div>
                  <div style="width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin-top: 5px;"></div>
                </div>
              </div>
            </div>
            
            <h2>${language === 'en' ? 'New consultation request' : 'Nowe zapytanie o konsultację'}</h2>
            
            <div class="info-box">
              <p><strong>${language === 'en' ? 'Full name:' : 'Imię i nazwisko:'}</strong> ${name}</p>
              <p><strong>${language === 'en' ? 'Email:' : 'Email:'}</strong> ${email}</p>
              <p><strong>${language === 'en' ? 'Company:' : 'Firma:'}</strong> ${company || (language === 'en' ? 'Not provided' : 'Nie podano')}</p>
            </div>
            
            <p><strong>${language === 'en' ? 'Message:' : 'Wiadomość:'}</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div class="footer">
              <p><strong>${language === 'en' ? 'Message sent from VALHALLIS ADVISORS contact form' : 'Wiadomość wysłana z formularza kontaktowego VALHALLIS ADVISORS'}</strong></p>
              <p style="font-size: 12px; color: #999;">
                ${language === 'en' ? 'Date:' : 'Data:'} ${new Date().toLocaleString(language === 'en' ? 'en-US' : 'pl-PL')}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    if (isEtherealTransport(transporter)) {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) console.log('Ethereal preview (consultation):', url);
    }
    
    res.json({ success: true, message: 'Zapytanie o konsultację wysłane pomyślnie' });
    
  } catch (error) {
    console.error('Consultation error:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera' });
  }
});

// Confirmation email endpoint
app.post('/api/email/confirmation', emailLimiter, async (req, res) => {
  try {
    const { email, name, language = 'pl' } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Brak wymaganych danych' });
    }
    
    // Create transport
    const transporter = await getTransporter();
    
    // Load translations
    const translations = loadTranslations(language);
    
    // Send confirmation email to user
    const info = await transporter.sendMail({
      from: emailConfig.smtp.auth.user,
      to: email,
      subject: language === 'en' ? 'Request Confirmation - VALHALLIS ADVISORS' : 'Potwierdzenie zapytania - VALHALLIS ADVISORS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .logo { text-align: center; margin-bottom: 30px; }
            h2 { color: #1a365d; margin-bottom: 20px; font-size: 24px; }
            p { color: #333; line-height: 1.6; margin-bottom: 15px; }
            .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; color: #155724; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="display: inline-block; background: linear-gradient(135deg, #1a2b4a, #2d4a7a); padding: 15px 25px; border-radius: 8px; border: 2px solid #d4af37; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                  <div style="color: #d4af37; font-size: 24px; font-weight: bold; font-family: Arial, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                    VALHALLIS
                  </div>
                  <div style="color: #ffffff; font-size: 12px; font-weight: 500; font-family: Arial, sans-serif; margin-top: 2px; letter-spacing: 1px;">
                    ADVISORS
                  </div>
                  <div style="width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin-top: 5px;"></div>
                </div>
              </div>
            </div>
            
            <h2>${language === 'en' ? 'Thank you for contacting us!' : 'Dziękujemy za kontakt!'}</h2>
            
            <p>${language === 'en' ? 'Dear' : 'Drogi/a'} <strong>${name}</strong>,</p>
            
            <div class="success-box">
              <p><strong>✓ ${language === 'en' ? 'Receipt Confirmation' : 'Potwierdzenie otrzymania'}</strong></p>
              <p>${language === 'en' ? 'We have received your consultation request. Our team of experts will analyze your needs and contact you shortly.' : 'Otrzymaliśmy Twoje zapytanie o konsultację. Nasz zespół ekspertów przeanalizuje Twoje potrzeby i skontaktuje się z Tobą w najbliższym czasie.'}</p>
            </div>
            
            <p>${language === 'en' ? 'In the meantime, if you have urgent questions or need additional information, you can contact us directly at:' : 'W międzyczasie, jeśli masz pilne pytania lub potrzebujesz dodatkowych informacji, możesz skontaktować się z nami bezpośrednio pod adresem:'} <strong>${emailConfig.contact}</strong></p>
            
            <div class="footer">
              <p><strong>${language === 'en' ? 'Best regards,<br>VALHALLIS ADVISORS Team' : 'Pozdrawiamy,<br>Zespół VALHALLIS ADVISORS'}</strong></p>
              <p style="font-size: 12px; color: #999;">
                ${language === 'en' ? 'This email was sent automatically. Please do not reply to this message.' : 'Ten email został wysłany automatycznie. Prosimy nie odpowiadać na tę wiadomość.'}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    if (isEtherealTransport(transporter)) {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) console.log('Ethereal preview (confirmation):', url);
    }
    
    res.json({ success: true, message: 'Email potwierdzający wysłany' });
    
  } catch (error) {
    console.error('Confirmation error:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 