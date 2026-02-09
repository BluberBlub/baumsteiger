import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// This route must be server-rendered, not prerendered
export const prerender = false;

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

function validateFormData(data: unknown): { isValid: boolean; errors: Record<string, string>; formData?: ContactFormData } {
    const errors: Record<string, string> = {};

    if (!data || typeof data !== "object") {
        return { isValid: false, errors: { general: "Ungültige Anfrage" } };
    }

    const { name, email, phone, message } = data as Record<string, unknown>;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        errors.name = "Name ist erforderlich";
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
        errors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Ungültige E-Mail-Adresse";
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
        errors.message = "Nachricht ist erforderlich";
    }

    if (Object.keys(errors).length > 0) {
        return { isValid: false, errors };
    }

    return {
        isValid: true,
        errors: {},
        formData: {
            name: (name as string).trim(),
            email: (email as string).trim(),
            phone: phone ? String(phone).trim() : undefined,
            message: (message as string).trim(),
        },
    };
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Validate form data
        const validation = validateFormData(body);

        if (!validation.isValid) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Validierungsfehler",
                    errors: validation.errors,
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const { formData } = validation;

        if (!formData) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Ungültige Formulardaten",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: import.meta.env.SMTP_HOST || "smtp.ionos.de",
            port: parseInt(import.meta.env.SMTP_PORT || "587"),
            secure: false, // Use TLS
            auth: {
                user: import.meta.env.SMTP_USER,
                pass: import.meta.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"Baumsteiger Website" <${import.meta.env.CONTACT_EMAIL_FROM || import.meta.env.SMTP_USER}>`,
            to: import.meta.env.CONTACT_EMAIL_TO || "buero@baumsteiger-allgaeu.de",
            replyTo: formData.email,
            subject: `Neue Kontaktanfrage von ${formData.name}`,
            text: `
Neue Kontaktanfrage über die Website

Name: ${formData.name}
E-Mail: ${formData.email}
Telefon: ${formData.phone || "Nicht angegeben"}

Nachricht:
${formData.message}

---
Diese Nachricht wurde über das Kontaktformular auf baumsteiger-allgaeu.de gesendet.
      `.trim(),
            html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Kontaktanfrage</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f0; color: #333;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #2d5a27 0%, #3a7233 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                🌳 Baumsteiger Allgäu
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Neue Kontaktanfrage über die Website
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Contact Info Card -->
              <table role="presentation" style="width: 100%; background-color: #f9faf8; border-radius: 12px; border: 1px solid #e8ebe6;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 20px; color: #2d5a27; font-size: 18px; font-weight: 600;">
                      Kontaktdaten
                    </h2>
                    
                    <!-- Name -->
                    <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 14px; font-weight: 500; vertical-align: top;">Name:</td>
                        <td style="color: #333; font-size: 14px; font-weight: 600;">${formData.name}</td>
                      </tr>
                    </table>
                    
                    <!-- Email -->
                    <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 14px; font-weight: 500; vertical-align: top;">E-Mail:</td>
                        <td style="color: #333; font-size: 14px;">
                          <a href="mailto:${formData.email}" style="color: #2d5a27; text-decoration: none; font-weight: 600;">${formData.email}</a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Phone -->
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 14px; font-weight: 500; vertical-align: top;">Telefon:</td>
                        <td style="color: #333; font-size: 14px; font-weight: 600;">${formData.phone ? `<a href="tel:${formData.phone.replace(/\\s/g, '')}" style="color: #2d5a27; text-decoration: none;">${formData.phone}</a>` : '<span style="color: #999;">Nicht angegeben</span>'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="margin-top: 24px;">
                <h2 style="margin: 0 0 16px; color: #2d5a27; font-size: 18px; font-weight: 600;">
                  Nachricht
                </h2>
                <div style="background-color: #ffffff; border: 1px solid #e8ebe6; border-radius: 12px; padding: 20px; line-height: 1.7; color: #444; font-size: 15px;">
                  ${formData.message.replace(/\\n/g, "<br>")}
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${formData.email}?subject=Re: Ihre Anfrage bei Baumsteiger Allgäu" 
                   style="display: inline-block; background: linear-gradient(135deg, #2d5a27 0%, #3a7233 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(45, 90, 39, 0.3);">
                  ✉️ Jetzt antworten
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f4f4f0; padding: 24px 40px; text-align: center; border-top: 1px solid #e8ebe6;">
              <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.6;">
                Diese Nachricht wurde über das Kontaktformular auf<br>
                <a href="https://www.baumsteiger-allgaeu.de" style="color: #2d5a27; text-decoration: none; font-weight: 500;">baumsteiger-allgaeu.de</a> gesendet.
              </p>
              <p style="margin: 12px 0 0; color: #999; font-size: 11px;">
                © ${new Date().getFullYear()} Baumsteiger Allgäu – Raphael Bernhardt
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Contact form error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Es ist ein Fehler beim Senden aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
