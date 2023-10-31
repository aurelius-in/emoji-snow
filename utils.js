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
