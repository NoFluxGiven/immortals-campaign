---
aliases:
  - upside-golden-often
  - compendium/natural-phenomena/upside-golden-often
  - compendium/upside-golden-often
unlisted: true
---
She stood, feet bare, upon the snow, wracked with frost and silence, ice creeping its way across the lake. Time had no purchase, here. It was only them.

The wind had burned red across their cheeks. Travel was harder now, the throes of a blizzard forming. No beast lumbered afore, and all they carried was themselves.

They watched the gloom fall, a snow's shadow, heaving. Death, it seemed, was embracing them slowly. In this desolation, a torch bore, burning bright orange against the white snow and the black sky. She had turned and spoke, but the wind stole it. Wisps of white covered their eyes, and so they could not behold one another. Not truly.

The first to fall was <span class="scramble-text">the Dreamer</span>. The cold bites venom, and her veins were coarse with it. Then <span class="scramble-text">the Dream</span>. They laid there, windswept and snowbound. They looked into the eyes of the other, and saw light.

<script>
(function() {
  const initFixedScrambler = () => {
    const chars = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒˆ˜–—‘’‚“”„†‡•…‰‹›€™';
    const elements = document.querySelectorAll('.scramble-text');

    elements.forEach((element) => {
      if (element.dataset.running) return;
      
      const htmlEl = element;
      
      // 1. Measure and lock down visual dimensions BEFORE altering text content
      const exactWidth = htmlEl.getBoundingClientRect().width;
      const length = (htmlEl.textContent || "").length;
      
      // 2. Lock layout styles immediately so it doesn't reposition surrounding elements
      htmlEl.style.display = 'inline-block';
      htmlEl.style.width = `${exactWidth}px`;
      htmlEl.style.overflow = 'hidden';
      htmlEl.style.whiteSpace = 'nowrap';
      htmlEl.style.verticalAlign = 'bottom'; /* Forces the block down to the natural baseline */
      htmlEl.style.lineHeight = '1';
      htmlEl.style.textOverflow = 'clip';
      htmlEl.style.fontFamily = 'monospace, Courier, sans-serif'; // Monospace keeps character widths identical
      
      htmlEl.dataset.running = "true";

      // 3. Generate noise matching the original character count
      const generateNoise = () => {
	     let content = htmlEl.textContent || "";
        let output = "";
        for (let i = 0; i < length; i++) {
	        if (Math.random() < 0.94) {
		        output += content[i];
		        continue;
	        }
          output += chars[Math.floor(Math.random() * chars.length)];
        }
        return output;
      };

      htmlEl.textContent = generateNoise();
      
      const intervalId = setInterval(() => {
        if (!document.body.contains(htmlEl)) {
          clearInterval(intervalId);
          return;
        }
        htmlEl.textContent = generateNoise();
      }, 30);
    });
  };

  // Run instantly on current page load
  initFixedScrambler();

  // Re-run on Quartz SPA transitions
  if (!window.hasFixedScrambleListener) {
    window.hasFixedScrambleListener = true;
    document.addEventListener("nav", initFixedScrambler);
  }
})();
</script>
