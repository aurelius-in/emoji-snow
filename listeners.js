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
        player.x += 50;
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

// Event listener for mouse clicks
canvas.addEventListener("mousedown", function(e) {
  e.preventDefault();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Character selection logic
  if (gameState === 'selectCharacter') {
    if (mouseX >= 600 && mouseX <= 900 && mouseY >= 400 && mouseY <= 700) {
      playerEmoji = "🏂";
      gameState = 'play';
    } else if (mouseX >= 1400 && mouseX <= 1700 && mouseY >= 400 && mouseY <= 700) {
      playerEmoji = "⛷️";
      gameState = 'play';
    }
  } else {
    touchStartX = mouseX;
    touchStartY = mouseY;
  }
});

canvas.addEventListener("mouseup", function(e) {
  e.preventDefault();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // In-game movement logic
  if (gameState !== 'selectCharacter') {
    touchEndX = mouseX;
    touchEndY = mouseY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        playerMomentum = 50;
        lastSwipeTime = new Date().getTime();
        player.x += 50;
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

// Event listener for spacebar
window.addEventListener("keydown", function(e) {
  if (e.keyCode === 32) {
    if (gameState !== 'selectCharacter' && player.grounded) {
      player.vy = player.jump;
      player.grounded = false;
      player.jumping = true;
    }
  }
});

// New event listener for arrow keys
window.addEventListener("keydown", function(e) {
  if (gameState !== 'selectCharacter') {
    switch (e.keyCode) {
      case 37:  // left arrow
        player.x -= 50;
        break;
      case 38:  // up arrow
        if (player.grounded) {
          player.vy = player.jump;
          player.grounded = false;
          player.jumping = true;
        }
        break;
      case 39:  // right arrow
        player.x += 50;
        break;
      case 40:  // down arrow
        // Implement the logic to slow down
        player.x -= 20;
        break;
    }
  }
});
