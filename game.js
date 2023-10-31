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
