// script.js
function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) modal.classList.add('show')
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) modal.classList.remove('show')
}

function showToast(message, duration = 3000) {
  let toast = document.getElementById('globalToast')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'globalToast'
    toast.style.position = 'fixed'
    toast.style.bottom = '30px'
    toast.style.left = '50%'
    toast.style.transform = 'translateX(-50%)'
    toast.style.backgroundColor = '#D4A574'
    toast.style.color = '#0D0D0D'
    toast.style.padding = '12px 24px'
    toast.style.borderRadius = '40px'
    toast.style.fontWeight = 'bold'
    toast.style.zIndex = '3000'
    toast.style.fontFamily = 'inherit'
    document.body.appendChild(toast)
  }
  toast.innerText = message
  toast.style.opacity = '1'
  setTimeout(() => {
    toast.style.opacity = '0'
  }, duration)
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn')
  const navLinks = document.getElementById('navLinks')
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show')
    })
  }
})