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
