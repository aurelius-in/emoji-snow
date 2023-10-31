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
