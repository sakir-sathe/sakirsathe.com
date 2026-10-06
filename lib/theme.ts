// Shared plain module: this must not be exported from a "use client" module,
// since the server layout needs the actual script string, not a client reference.
export const themeScript = `(function(){var s=null;try{s=localStorage.getItem('theme')}catch(e){}var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)})();`;
