const zoomerdictionary = {
  // chess openings
  "Sicilian Defense": "Sicilian Counter-Swag 😎",
  "Queen's Gambit": "Pokimane's Gambit 👑",
  "Italian Game": "Spaghetti and Meatballs Game 🍝",
  "Pirc Defense": "Pirc's Sigma Defense 🛡️",
  "Alekhine's Defense": "Alekhine's Madlad Defense 🤯",
  "Slav Defense": "Adidas and Vodka Defense ☭",
  "London System": "Highest Knife Crime Opening 🇬🇧",
  "Ruy Lopez": "Ruy Big Spanish Energy 🇪🇸",
  "French Defense": "French ‘Not Today, Chief’ 🇫🇷",
  "King's Gambit": "King’s ‘YOLO Send It’ 👑",
  "Modern Defense": "Modern Flex Defense ✨",
  "Benoni Defense": "Benoni 'Let it Cook' 🔥",
  "English Opening": "English 'Lowkey Chill' 🇬🇧",

  // general terms
  "good move": "straight fire move, no cap 🔥",
  "weak move": "cringe play, not gonna lie 🕵️",
  "strong move": "absolute chad move 💪",
  "fair move": "chill move 🥱",
  "crushing move": "lit choice 🧊",
  "right move": "big brain play 💡🧠",
  "winning position": "Big Dub energy 💪🔥",
  "losing position": "Major L vibes 😞🖤",
  "worse position": "Down bad 😔🖤",
  "close to even": "Lowkey tied 🤝⚖️",
  "blunder": "oof, that's a major L 😬",
  "mistake": "bruh moment 💀",
  "excellent strategy": "big brain energy fr 💯",
  "brilliant play": "absolute sigma chess move 🤯",
  "stronger": "lit asf",
  "attack": "going beast mode 💥",
  "moves": "yeets",
  "fianchetto": "fiancheeto",
  "discovered": "fossil 🦴",
  "pawn": "juicer",
  "pawns": "juicers",
  "Pawns": "Juicers",

  // syntactic shit
  "Good thinking!": "Chill asf ong.",
  "You missed an opportunity" : "You fumbled the bag 👜💥",
  "This misses an opportunity": "This is a missed shot 🎯🚫",
  "Good job": "Big W 🏆🎉",
  "This is not the right idea.": "This is a whole L 🥴❌",
  "The game was close to balanced": "The game was lowkey a toss-up 🤷‍♂️⚖️",
  "You permitted the opponent": "You let them cook 🍳🔥",
  "This permits the opponent": "This lets them pop off 🚀💥",
  "You overlooked an opportunity": "You slept on that one 💤🤦‍♂️",
  "This overlooks an opportunity": "This is a missed flex 😬💪",
  "was free for the taking.": "was an easy dub 🏅😎",
  "You are threatening": "You’re on that pressure 💯🔥",
  "This is the only good move!": "This is the only vibe ✨💥",
};
  
let originalTexts = new Map();
let isZoomMode = false;

function translateToZoomerSpeak(text) {
  let translatedText = text;
  
  Object.entries(zoomerdictionary).forEach(([original, zoomer]) => {
    const regex = new RegExp(original, 'gi');
    translatedText = translatedText.replace(regex, zoomer);
  });
  
  return translatedText;
}

function replaceGameReviewDialogue() {
  const dialogueElements = document.querySelectorAll('.analysis-type-component span');
  
  dialogueElements.forEach(element => {
    // Store original text if not already stored
    if (!originalTexts.has(element)) {
      originalTexts.set(element, element.textContent);
    }
    
    // Apply translation based on current mode
    if (isZoomMode) {
      const originalText = originalTexts.get(element);
      const zoomerfiedText = translateToZoomerSpeak(originalText);
      element.textContent = zoomerfiedText;
    } else {
      // Revert to original text
      element.textContent = originalTexts.get(element);
    }
  });
}

// Retrieve saved zoom mode on script load
chrome.storage.local.get(['zoomMode'], function(result) {
  isZoomMode = result.zoomMode || false;
  replaceGameReviewDialogue();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleZoomMode") {
    isZoomMode = request.isZoomMode;
    replaceGameReviewDialogue();
  }
});

// Run the translation when page loads and when game review updates
const observer = new MutationObserver(replaceGameReviewDialogue);
observer.observe(document.body, {
  childList: true,
  subtree: true
});
