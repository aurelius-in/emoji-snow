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
    scrollY = player.y - canvas.height / 2;  // Now centered vertically
  }
};
