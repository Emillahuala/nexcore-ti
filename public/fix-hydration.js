// Remove any 'hidden' class from <html> on hydration to prevent hydration mismatch
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.remove('hidden');
  });
}
