// quartz/components/scripts/scramble.inline.ts

function initScrambler() {
  const chars = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒˆ˜–—‘’‚“”„†‡•…‰‹›€™';
  const elements = document.querySelectorAll('.scramble-text');
  
  elements.forEach((element) => {
    const htmlEl = element as HTMLElement;
    if (htmlEl.dataset.running) return;
    htmlEl.dataset.running = "true";
    
    // Dynamically snapshot the exact text inside the HTML tag at render time
    const originalText = htmlEl.textContent || "";
    
    const intervalId = setInterval(() => {
      // Memory leak guard: Clear if user leaves the page
      if (!document.body.contains(htmlEl)) {
        clearInterval(intervalId);
        return;
      }

      if (Math.random() > 0.3) { 
        const index = Math.floor(Math.random() * originalText.length);
        if (originalText[index] === ' ') return; // Don't scramble spaces
        
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
}

// Hooks cleanly into Quartz's SPA navigation architecture
document.addEventListener("nav", initScrambler);
