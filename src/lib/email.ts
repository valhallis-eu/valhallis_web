
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

interface EmailData {
  name: string;
  email: string;
  company?: string;
  message: string;
  // Anti-spam optional fields
  hp?: string;
  formStartMs?: number;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail(email: string, language: string = 'pl'): Promise<EmailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/email/verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, language })
    });
    const result = await response.json();
    if (response.ok) {
      return { success: true, message: result.message || 'Verification email sent' };
    }
    return { success: false, message: result.message || 'Verification email failed' };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, message: 'Verification email failed' };
  }
}

export async function sendConsultationRequest(data: EmailData, language: string = 'pl'): Promise<EmailResponse> {
  try {
    console.log('Sending consultation request:', data, 'in language:', language);
    
    const response = await fetch(`${API_BASE_URL}/api/email/consultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, language })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Zapytanie o konsultację wysłane pomyślnie'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Błąd wysyłania zapytania o konsultację'
      };
    }
    
  } catch (error) {
    console.error('Error sending consultation request:', error);
    return {
      success: false,
      message: 'Błąd wysyłania zapytania o konsultację'
    };
  }
}

// Function to send confirmation email to the user
export async function sendConfirmationEmail(userEmail: string, userName: string, language: string = 'pl'): Promise<EmailResponse> {
  try {
    console.log('Sending confirmation email to:', userEmail, 'in language:', language);
    
    const response = await fetch(`${API_BASE_URL}/api/email/confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: userEmail, 
        name: userName,
        language
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Email potwierdzający wysłany pomyślnie'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Błąd wysyłania emaila potwierdzającego'
      };
    }
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      message: 'Błąd wysyłania emaila potwierdzającego'
    };
  }
} // Force rebuild
