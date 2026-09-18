import emailjs from '@emailjs/browser';

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
}

export interface EmailServiceResult {
  success: boolean;
  message?: string;
}

/**
 * Dedicated utility to dispatch contact form transmissions using EmailJS.
 * Credentials are retrieved securely from environment variables.
 */
export async function sendContactMessage(payload: ContactMessagePayload): Promise<EmailServiceResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    const errorMsg =
      'EmailJS credentials missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.local';
    console.error(`[EmailService Error]: ${errorMsg}`);
    throw new Error(errorMsg);
  }

  const templateParams: Record<string, string> = {
    from_name: payload.name.trim(),
    from_email: payload.email.trim(),
    message: payload.message.trim(),
    reply_to: payload.email.trim(),
    source: 'Nikunj Rathi Portfolio',
    to_email: 'nrnikunj2005@gmail.com',
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200) {
      return { success: true, message: response.text };
    } else {
      throw new Error(`EmailJS responded with status ${response.status}: ${response.text}`);
    }
  } catch (error: any) {
    console.error("EmailJS failed:", {
      status: error?.status,
      text: error?.text,
      message: error?.message,
    });
    throw error;
  }
}
