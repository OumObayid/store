import { ref } from "vue"

export function useResetPwTemplate() {
  const messageEmail = ref("")

  const getResetPasswordEmailTemplate = (resetLink) => {
    messageEmail.value = 
    `<!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation de mot de passe</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 0; margin: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#2196f3;color:#fff;text-align:center;padding:20px;">
              <h1>Réinitialisation de votre mot de passe</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;color:#333;line-height:1.5;">
              <p>Bonjour,</p>
              <p>Vous avez demandé à réinitialiser votre mot de passe sur <strong>NotreSite</strong>.</p>
              <p>Veuillez cliquer sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
              <p style="text-align:center;">
                <a href="${resetLink}" style="display:inline-block;padding:12px 20px;background:#2196f3;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">
                  Réinitialiser mon mot de passe
                </a>
              </p>
              <p>Ce lien expirera dans <strong>30 minutes</strong> pour des raisons de sécurité.</p>
              <p>Si vous n'avez pas demandé cette action, vous pouvez ignorer cet email.</p>
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
    `
  }

  return {
    messageEmail,
    getResetPasswordEmailTemplate
  }
}
