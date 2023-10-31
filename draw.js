<!DOCTYPE html>
<html>
<head>
  <title>Emoji Platformer</title>
  <style>
    body { margin: 0; padding: 0; }
    canvas { border: 4px solid black; }
  </style>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body>
  <canvas id="gameCanvas" width="3200" height="1440"></canvas>
  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let gameState = 'selectCharacter', playerEmoji = null, scrollX = 0, scrollY = 0;
    let player = { x: 50, y: 960, width: 50, height: 50, vx: 10, vy: 0, gravity: 0.5, jump: -10, grounded: false, jumping: false };
    let hills = [{x: 0, y: 960}, {x: 500, y: 960}];
    let animals = [];
    let touchStartX, touchStartY, touchEndX, touchEndY;
    let bgHills = [{x: 0, y: 960}, {x: 500, y: 960}];
    let bgEmojiList = ["🌲","🌲","🌲","☃️","🎄"];
    let bgEmojis = [];
    const tinyAnimals = ["🧊", "🐇"];
    const smallAnimals = ["🐧"];
    const bigAnimals = ["🦌"];
    const allAnimals = [...tinyAnimals, ...smallAnimals, ...bigAnimals];
    let animalSpawnCounter = 0;
    let bgEmojiSpawnCounter = 0;
    let playerMomentum = 0;
    const momentumDuration = 3000; // 1.5 seconds in milliseconds
    let lastSwipeTime = 0;
    let lastBgEmojiSpawnTime = 0;
    let farBgMountains = [];
    let clouds = [];
    

    
    // Event listeners for touchstart and touchend
    canvas.addEventListener("touchstart", function(e) {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      // Character selection logic
      if (gameState === 'selectCharacter') {
      if (touch.clientX >= 600 && touch.clientX <= 900 && touch.clientY >= 400 && touch.clientY <= 700) {
        playerEmoji = "🏂";
        gameState = 'play';
      } else if (touch.clientX >= 1400 && touch.clientX <= 1700 && touch.clientY >= 400 && touch.clientY <= 700) {
        playerEmoji = "⛷️";
        gameState = 'play';
      }
      }
    });

canvas.addEventListener("touchend", function(e) {
  e.preventDefault();
  const touch = e.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;
  
  // Movement logic
  if (gameState !== 'selectCharacter') {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        playerMomentum = 50;
        lastSwipeTime = new Date().getTime();
        player.x += 50;  // Moved this line inside the if condition
      } else {
        player.x -= 50;
      }
    } else {
      if (deltaY < 0 && player.grounded) {
        player.vy = player.jump;
        player.grounded = false;
        player.jumping = true;
      }
    }
  }
});

const generateCloud = () => {
  const cloudEmoji = "☁️";
  const opacity = Math.random() * 0.45 + 0.5;
  const sizeFactor = Math.random() * 1.5 + 0.5;
  const baseSize = 200;
  const finalSize = baseSize * sizeFactor;
  const y = Math.floor(Math.random() * 201) + 50;
  const x = player.x + canvas.width; // Spawn just outside the right edge of the screen
  clouds.push({ emoji: cloudEmoji, opacity, size: finalSize, x, y });
};

const generateFarBgMountain = () => {
  const mountainEmoji = ["🗻", "🗻", "🏔"][Math.floor(Math.random() * 3)];
  const opacity = Math.random() * 0.1 + 0.8;
  const size = Math.floor(Math.random() * 5000) + 1000;
  const aspectRatio = Math.random() * 3 + 1;
  const x = player.x + canvas.width; // Spawn just outside the right edge of the screen
  farBgMountains.push({emoji: mountainEmoji, opacity, size, aspectRatio, x});
};

const generateAnimal = () => {
  const animalEmoji = allAnimals[Math.floor(Math.random() * allAnimals.length)];
  let animalSize = tinyAnimals.includes(animalEmoji) ? 'tiny' : smallAnimals.includes(animalEmoji) ? 'small' : 'big';
  
  const randomX = player.x + canvas.width; // Spawn just outside the right edge of the screen
  const randomYOffset = animalSize === 'tall' ? Math.floor(Math.random() * 46) + 75 : Math.floor(Math.random() * 51) + 50;
  const newY = player.y + randomYOffset;
  const newAnimal = { emoji: animalEmoji, x: randomX, y: newY, size: animalSize };
  animals.push(newAnimal);
};
    
const generateHill = () => {
      const lastHill = hills[hills.length - 1];
      const steepnessFactor = Math.random() < 0.8 ? 1 : -1; // 80% chance for downhill, 20% for uphill
      const newY = lastHill.y + Math.floor(Math.random() * 400 + 400) * steepnessFactor; // Adjust this line
      const newHill = {
        x: lastHill.x + Math.floor(Math.random() * 800) + 1000,
        y: Math.min(canvas.height - 400, Math.max(400, newY))
      };
      hills.push(newHill);
      generateAnimal(hills[hills.length - 1]);  // Generate animal for the new hill
    };

const generateBgHill = () => {
  const lastBgHill = bgHills[bgHills.length - 1];
  
  // Generate newY based on player's y position
  let newY = player.y - (Math.floor(Math.random() * 101) + 100); // Random value between 100 and 200 above player's y
  
  const newBgHill = {
    x: lastBgHill.x + Math.floor(Math.random() * 800) + 1000,
    y: newY
  };
  bgHills.push(newBgHill);
};

const update = () => {
  if (gameState !== 'selectCharacter') {
    player.y += player.vy;
    player.vy += player.gravity;
    player.grounded = false;

    let prevHill = hills[0];
    let slope = 0;
    
    // Generate clouds
      if (clouds.length === 0 || player.x - clouds[clouds.length - 1].x > 1000) {
        generateCloud();
      }
  
    // Generate far background mountains
  if (farBgMountains.length === 0 || player.x - farBgMountains[farBgMountains.length - 1].x > 10000) {
    generateFarBgMountain();
  }
    // Apply momentum
    const currentTime = new Date().getTime();
    if (currentTime - lastSwipeTime <= momentumDuration) {
      const timePassed = currentTime - lastSwipeTime;
      const momentumFactor = 1 - (timePassed / momentumDuration);
      player.x += playerMomentum * momentumFactor;
    }

    // Collision detection with hills
    let hillFound = false;
    for (let index = 1; index < hills.length; index++) {
      const hill = hills[index];
      slope = (hill.y - prevHill.y) / (hill.x - prevHill.x);
      if (player.x >= prevHill.x && player.x <= hill.x) {
        hillFound = true;
        const expectedY = slope * (player.x - prevHill.x) + prevHill.y;
        if (player.y >= expectedY) {
          player.y = expectedY;
          player.vy = 0;
          player.grounded = true;
          player.jumping = false;

          // Apply enhanced gravity based on slope
          if (slope > 0) {
            player.x += slope * 8;
          } else {
            player.x += slope * 4;
          }
        }
      }
      prevHill = hill;
    }

    if (!hillFound) {
      player.x = hills[hills.length - 1].x;
    }

    // Animal Generation
      if (animals.length === 0 || player.x - animals[animals.length - 1].x > Math.floor(Math.random() * 401) + 100) {
        generateAnimal();
      }
    
    // Background Emoji Generation
    if (bgEmojis.length === 0 || player.x - bgEmojis[bgEmojis.length - 1].x > 900) {
      const lastBgHill = bgHills[bgHills.length - 1];
      const emojiSymbol = bgEmojiList[Math.floor(Math.random() * bgEmojiList.length)];
      const newY = Math.floor(Math.random() * (hills[hills.length - 1].y - lastBgHill.y) + lastBgHill.y);
      bgEmojis.push({ symbol: emojiSymbol, x: lastBgHill.x, y: newY });
    }

    // Momentum
    if (currentTime - lastSwipeTime > momentumDuration) {
      playerMomentum = 0;
    }

    if (player.x > bgHills[bgHills.length - 2].x) {
      generateBgHill();
    }
    if (player.x > hills[hills.length - 2].x) {
      generateHill();
    }

    scrollX = player.x - canvas.width / 2;
    scrollY = player.y - canvas.height / 2;

  }
};
    // Initialize hills and background hills
    for (let i = 0; i < 5; i++) {
      generateHill();
      generateBgHill();
      generateFarBgMountain();
      generateCloud(); // Initialize clouds
    }
    
    const gameLoop = () => {
  update();
  draw();
  requestAnimationFrame(gameLoop);
};
    
    gameLoop();
  </script>
</body>
</html>
