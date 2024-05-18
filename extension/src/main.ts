console.log("The extension is up and running");

declare var browser: typeof chrome;

window.addEventListener('load', () => {
  let images = document.querySelectorAll('img');

  images.forEach((elt: HTMLImageElement) => {
    elt.src = `${browser.runtime.getURL("pp.jpg")}`;
    elt.alt = 'an alt text';
  });
});