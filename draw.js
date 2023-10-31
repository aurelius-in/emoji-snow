// Function to draw character selection screen
const drawCharacterSelection = (ctx) => {
  // Drawing for the skiing emoji
  ctx.save();
  ctx.translate(750, 700);
  ctx.scale(-1, 1);
  ctx.font = "300px Arial";
  ctx.fillText("⛷️", -150, 0);
  ctx.restore();

  // Drawing for 'or'
  ctx.font = "300px Arial";
  ctx.fillText("or", 1000, 700);

  // Drawing for the snowboarding emoji
  ctx.save();
  ctx.translate(1550, 700);
  ctx.scale(-1, 1);
  ctx.font = "300px Arial";
  ctx.fillText("🏂", -150, 0);
  ctx.restore();
};

// Function to draw clouds
const drawClouds = (ctx, clouds, scrollX) => {
  clouds.forEach(cloud => {
    const originalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = cloud.opacity;
    ctx.font = `${cloud.size}px Arial`;
    ctx.fillText(cloud.emoji, cloud.x - scrollX, cloud.y);
    ctx.globalAlpha = originalAlpha;
  });
};

// Function to draw far background mountains
const drawFarBackgroundMountains = (ctx, farBgMountains, scrollX) => {
  farBgMountains.forEach(mountain => {
    const originalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = mountain.opacity;
    const adjustedSize = mountain.size * 0.8;
    ctx.font = `${adjustedSize}px Arial`;
    ctx.save();
    ctx.scale(mountain.aspectRatio, 1);
    ctx.fillText(mountain.emoji, (mountain.x - scrollX) / mountain.aspectRatio, adjustedSize - 300);
    ctx.restore();
    ctx.globalAlpha = originalAlpha;
  });
};

// Function to draw background hills
const drawBackgroundHills = (ctx, bgHills, scrollX) => {
  ctx.beginPath();
  ctx.moveTo(bgHills[0].x - scrollX, bgHills[0].y);
  bgHills.forEach((hill, index) => {
    if (index !== 0) {
      ctx.lineTo(hill.x - scrollX, hill.y);
    }
  });
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.stroke();
};

// Function to draw background emojis
const drawBackgroundEmojis = (ctx, bgEmojis, scrollX) => {
  bgEmojis.forEach(emoji => {
    ctx.font = "100px Arial";
    ctx.fillText(emoji.symbol, emoji.x - scrollX, emoji.y);
  });
};

// Function to draw ground hills
const drawGroundHills = (ctx, hills, scrollX) => {
  ctx.beginPath();
  ctx.moveTo(hills[0].x - scrollX, hills[0].y);
  for (let i = 1; i < hills.length; i++) {
    const prevHill = hills[i - 1];
    const hill = hills[i];
    const midX = (prevHill.x + hill.x) / 2 - scrollX;
    const midY = (prevHill.y + hill.y) / 2;
    ctx.quadraticCurveTo(prevHill.x - scrollX, prevHill.y, midX, midY);
  }
  ctx.lineTo(hills[hills.length - 1].x - scrollX, hills[hills.length - 1].y);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fillStyle = "#F0F8FF";
  ctx.fill();
  ctx.stroke();
};

// Function to draw the player
const drawPlayer = (ctx, player, scrollX, scrollY, playerEmoji) => {
  ctx.save();
  ctx.translate(player.x - scrollX + player.width / 2, player.y + player.height / 2);
  ctx.translate(player.x - scrollX + player.width / 2, player.y - scrollY + player.height / 2);
  ctx.scale(-1, 1);
  ctx.font = "144px Arial";
  ctx.fillText(playerEmoji, -player.width / 2, -player.height / 2);
  ctx.restore();
};

// Function to draw animals
const drawAnimals = (ctx, animals, scrollX) => {
  animals.forEach(animal => {
    ctx.font = animal.size === 'tiny' ? "50px Arial" : animal.size === 'small' ? "100px Arial" : animal.size === 'big' ? "200px Arial" : animal.size === 'huge' ? "300px Arial" : "450px Arial";
    ctx.fillText(animal.emoji, animal.x - scrollX, animal.y);
  });
};

// The main draw function
const draw = (ctx, gameState, clouds, farBgMountains, bgHills, bgEmojis, hills, player, animals, scrollX, scrollY, playerEmoji, canvas) => {
  if (!ctx) {
    console.error("Error: ctx is undefined in draw function.");
    return;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameState === 'selectCharacter') {
    drawCharacterSelection(ctx);
  } else {
    // Set the sky blue background
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawClouds(ctx, clouds, scrollX);
    drawFarBackgroundMountains(ctx, farBgMountains, scrollX);
    drawBackgroundHills(ctx, bgHills, scrollX);
    drawBackgroundEmojis(ctx, bgEmojis, scrollX);
    drawGroundHills(ctx, hills, scrollX);
    drawPlayer(ctx, player, scrollX, scrollY, playerEmoji);
    drawAnimals(ctx, animals, scrollX);
  }
};
