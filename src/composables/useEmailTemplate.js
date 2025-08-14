import { ref } from "vue";

export function useEmailTemplate() {
  const messageEmail = ref("");

  // Génère le HTML de l'email de confirmation
  const getConfirmationEmailTemplate = (verificationLink) => {
    messageEmail.value = `<!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation d'inscription</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 0; margin: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#4caf50;color:#fff;text-align:center;padding:20px;">
              <h1>Confirmation de votre inscription</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;color:#333;line-height:1.5;">
              <p>Bonjour,</p>
              <p>Merci de vous être inscrit sur <strong>NotreSite</strong> !  
              Veuillez cliquer sur le bouton ci-dessous pour confirmer votre compte :</p>
              <p style="text-align:center;">
                <a href="${verificationLink}" style="display:inline-block;padding:12px 20px;background:#4caf50;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">
                  Confirmer mon compte
                </a>
              </p>
              <p>Ce lien expirera dans <strong>24 heures</strong> pour des raisons de sécurité.</p>
              <p>Si vous n'avez pas demandé cette inscription, ignorez cet email.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f1f1f1;color:#777;text-align:center;padding:15px;font-size:12px;">
              © 2025 NotreSite - Tous droits réservés
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  };

  return {
    messageEmail,
    getConfirmationEmailTemplate,
  };
}
