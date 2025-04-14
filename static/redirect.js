// Redirect script for sunset pages
// This script will be included in all pages through the Static plugin
document.addEventListener('DOMContentLoaded', function() {
  // Only execute if we're not already on index.html or 404.html
  const path = window.location.pathname;
  if (path !== '/' && path !== '/index.html' && path !== '/404.html') {
    window.location.href = '/';
  }
}); 