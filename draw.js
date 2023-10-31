const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameState === 'selectCharacter') {
    // Save the current context state
    ctx.save();
    // Translate to the emoji's position
    ctx.translate(750, 700);
    // Flip the context horizontally
    ctx.scale(-1, 1);
    // Draw the flipped emoji
    ctx.font = "300px Arial";
    ctx.fillText("⛷️", -150, 0);
    // Restore the context to its original state
    ctx.restore();
    ctx.font = "300px Arial";
    ctx.fillText("or", 1000, 700);
    // Save the current context state
    ctx.save();
    // Translate to the emoji's position
    ctx.translate(1550, 700);
    // Flip the context horizontally
    ctx.scale(-1, 1);
    // Draw the flipped emoji
    ctx.font = "300px Arial";
    ctx.fillText("🏂", -150, 0);
    // Restore the context to its original state
    ctx.restore();
  } else {
  // Set the sky blue background
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw clouds
      clouds.forEach(cloud => {
        const originalAlpha = ctx.globalAlpha; // Store the original alpha value
        ctx.globalAlpha = cloud.opacity; // Set the new alpha value for the cloud
        ctx.font = `${cloud.size}px Arial`;
        ctx.fillText(cloud.emoji, cloud.x - scrollX, cloud.y);
        ctx.globalAlpha = originalAlpha; // Reset the alpha value back to its original state
      });

  // Draw far background mountains
  farBgMountains.forEach(mountain => {
    const originalAlpha = ctx.globalAlpha; // Store the original alpha value
    ctx.globalAlpha = mountain.opacity; // Set the new alpha value for the mountain
    const adjustedSize = mountain.size * 0.8; // Make the mountain 20% smaller
    ctx.font = `${adjustedSize}px Arial`;
    ctx.save();
    ctx.scale(mountain.aspectRatio, 1);
    ctx.fillText(mountain.emoji, (mountain.x - scrollX) / mountain.aspectRatio, adjustedSize - 300); // 300px higher (200 + 100)
    ctx.restore();
    ctx.globalAlpha = originalAlpha; // Reset the alpha value back to its original state
  });

        // Draw background hills with new color
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
        ctx.fillStyle = "#FFFFFF"; // Pure white
        ctx.fill();
        ctx.stroke();

    // Draw background emojis
  bgEmojis.forEach(emoji => {
    ctx.font = "100px Arial";
    ctx.fillText(emoji.symbol, emoji.x - scrollX, emoji.y);
  });

// Draw ground hills with new color and steeper slope
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
        ctx.fillStyle = "#F0F8FF"; // Almost white blue-grey
        ctx.fill();
        ctx.stroke();

    // Draw the player
   ctx.save();
ctx.font = "144px Arial";
// Calculate the center coordinates for the player.
const playerCenterX = player.x + player.width / 2;
const playerCenterY = player.y + player.height / 2;
// Translate the context to the calculated center position.
ctx.translate(playerCenterX - scrollX, playerCenterY);
ctx.fillText(playerEmoji, -player.width / 2, -player.height / 2);
ctx.restore();

    // Draw animals
    animals.forEach(animal => {
      ctx.font = animal.size === 'tiny' ? "50px Arial" : animal.size === 'small' ? "100px Arial" : animal.size === 'big' ? "200px Arial" : animal.size === 'huge' ? "300px Arial" : "450px Arial";
      ctx.fillText(animal.emoji, animal.x - scrollX, animal.y);
    });
  }
};
