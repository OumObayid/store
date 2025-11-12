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
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,            // bouton annuler à gauche
    customClass: {
      popup: 'my-swal-popup',
      title: 'my-swal-title',
      
    }
  })

  return result.isConfirmed
}

