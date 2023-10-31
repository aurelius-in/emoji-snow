const drawCharacterSelection = (ctx) => {
  // Your character selection code
  ctx.save();
  ctx.translate(750, 700);
  ctx.scale(-1, 1);
  ctx.font = "300px Arial";
  ctx.fillText("⛷️", -150, 0);
  ctx.restore();

  ctx.font = "300px Arial";
  ctx.fillText("or", 1000, 700);

  ctx.save();
  ctx.translate(1550, 700);
  ctx.scale(-1, 1);
  ctx.font = "300px Arial";
  ctx.fillText("🏂", -150, 0);
  ctx.restore();
};

// Function to draw the background without the ground
const drawBackground = (ctx, canvas, clouds, farBgMountains, bgHills, bgEmojis, scrollX) => {
  // Set the sky blue background
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw clouds
  clouds.forEach(cloud => {
    const originalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = cloud.opacity;
    ctx.font = `${cloud.size}px Arial`;
    ctx.fillText(cloud.emoji, cloud.x - scrollX, cloud.y);
    ctx.globalAlpha = originalAlpha;
  });

  // Draw far background mountains
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

  // Draw background hills
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

  // Draw background emojis
  bgEmojis.forEach(emoji => {
    ctx.font = "100px Arial";
    ctx.fillText(emoji.symbol, emoji.x - scrollX, emoji.y);
  });
};

// Function to draw the ground
const drawGround = (ctx, canvas, hills, scrollX) => {
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


const drawInteractiveElements = (ctx, player, animals, scrollX, playerEmoji) => {
  // Draw the player
  ctx.save();
  ctx.font = "144px Arial";
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  ctx.translate(playerCenterX - scrollX, playerCenterY);
  ctx.fillText(playerEmoji, -player.width / 2, -player.height / 2);
  ctx.restore();

  // Draw animals
  animals.forEach(animal => {
    ctx.font = animal.size === 'tiny' ? "50px Arial" : animal.size === 'small' ? "100px Arial" : animal.size === 'big' ? "200px Arial" : animal.size === 'huge' ? "300px Arial" : "450px Arial";
    ctx.fillText(animal.emoji, animal.x - scrollX, animal.y);
  });
};


const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameState === 'selectCharacter') {
    drawCharacterSelection(ctx);
  } else {
  drawBackground(ctx, canvas, clouds, farBgMountains, bgHills, bgEmojis, scrollX);
  drawGround(ctx, canvas, hills, scrollX);
  drawInteractiveElements(ctx, player, animals, scrollX, playerEmoji);
  }
};
