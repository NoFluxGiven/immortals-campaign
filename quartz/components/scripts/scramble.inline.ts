// quartz/components/scripts/scramble.inline.ts

// 1. Immediately log to prove the script successfully injected into the page bundle
console.log("⚡ ARG Scramble Script Initialized");

const chars = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒˆ˜–—‘’‚“”„†‡•…‰‹›€™';
const elements = document.querySelectorAll('.scramble-text');

console.log(`🔎 Found ${elements.length} scramble target nodes on this page.`);

elements.forEach((element) => {
  const htmlEl = element as HTMLElement;
  if (htmlEl.dataset.running) return;
  htmlEl.dataset.running = "true";
  
  const originalText = htmlEl.textContent || "";
  
  const intervalId = setInterval(() => {
    if (!document.body.contains(htmlEl)) {
      clearInterval(intervalId);
      return;
    }

    if (Math.random() > 0.3) { 
      const index = Math.floor(Math.random() * originalText.length);
      if (originalText[index] === ' ') return; 
      
      let currentText = htmlEl.textContent ? htmlEl.textContent.split('') : [];
      if (currentText.length === 0) return;
      
      currentText[index] = chars[Math.floor(Math.random() * chars.length)];
      htmlEl.textContent = currentText.join('');
      
      setTimeout(() => {
        if (document.body.contains(htmlEl)) htmlEl.textContent = originalText;
      }, 150);
    }
  }, 100);
});
