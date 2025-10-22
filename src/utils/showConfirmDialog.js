import Swal from 'sweetalert2'

export async function showConfirmDialog({
  title = 'Êtes-vous sûr ?',
  text = 'Cette action est irréversible.',
  confirmButtonText = 'Oui, confirmer',
  cancelButtonText = 'Annuler',
  icon = 'warning'
} = {}) {

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#d33',       // couleur bouton confirmer
    cancelButtonColor: '#3085d6',     // couleur bouton annuler
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,            // bouton annuler à gauche
    customClass: {
      popup: 'my-swal-popup',
      title: 'my-swal-title',
      confirmButton: 'my-swal-confirm',
      cancelButton: 'my-swal-cancel'
    }
  })

  return result.isConfirmed
}