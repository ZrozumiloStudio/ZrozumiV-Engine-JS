const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 60,
    y: 60,
    direction: Math.PI / 4, 
    speed: 1,
    rotationSpeed: Math.PI / 120,
    verticalAngle: 0, 
    maxVerticalAngle: Math.PI / 4 
};

var map = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
[1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
[1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
[1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
[1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

var rayLength = 230;
var isMouseLocked = false;
var previousMouseX = 0;
var previousMouseY = 0;

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
canvas.addEventListener('click', lockMouse);
document.addEventListener('pointerlockchange', handlePointerLockChange);
document.addEventListener('mousemove', handleMouseMove);

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    lookUp: false,
    lookDown: false
};

function lockMouse() {
    canvas.requestPointerLock = canvas.requestPointerLock || 
                               canvas.mozRequestPointerLock || 
                               canvas.webkitRequestPointerLock;
    canvas.requestPointerLock();
}

function handlePointerLockChange() {
    isMouseLocked = document.pointerLockElement === canvas || 
                    document.mozPointerLockElement === canvas || 
                    document.webkitPointerLockElement === canvas;
}

function handleMouseMove(event) {
    if (!isMouseLocked) return;

    const movementX = event.movementX || 
                     event.mozMovementX || 
                     event.webkitMovementX || 0;
    const movementY = event.movementY || 
                     event.mozMovementY || 
                     event.webkitMovementY || 0;

    player.direction += movementX * 0.001;

    player.verticalAngle = Math.max(-player.maxVerticalAngle, 
                                   Math.min(player.maxVerticalAngle, 
                                           player.verticalAngle - movementY * 0.002));
}

function checkCollision(newX, newY) {
    const playerRadius = 5;
    const checkPoints = [
        {x: newX - playerRadius, y: newY - playerRadius}, 
        {x: newX + playerRadius, y: newY - playerRadius}, 
        {x: newX - playerRadius, y: newY + playerRadius}, 
        {x: newX + playerRadius, y: newY + playerRadius}  
    ];

    const cellSize = 50;

    for (const point of checkPoints) {
        const mapX = Math.floor(point.x / cellSize);
        const mapY = Math.floor(point.y / cellSize);

        if (mapY < 0 || mapY >= map.length || mapX < 0 || mapX >= map[mapY].length) {
            return true; 
        }

        if (map[mapY][mapX] === 1) {
            return true; 
        }
    }

    return false; 
}

function handleKeyDown(event) {
    if (event.key === 'w') keys.forward = true;
    if (event.key === 's') keys.backward = true;
    if (event.key === 'a') keys.left = true;
    if (event.key === 'd') keys.right = true;
    if (event.key === 'ArrowUp') keys.lookUp = true;
    if (event.key === 'ArrowDown') keys.lookDown = true;
}

function handleKeyUp(event) {
    if (event.key === 'w') keys.forward = false;
    if (event.key === 's') keys.backward = false;
    if (event.key === 'a') keys.left = false;
    if (event.key === 'd') keys.right = false;
    if (event.key === 'ArrowUp') keys.lookUp = false;
    if (event.key === 'ArrowDown') keys.lookDown = false;
}

function update() {
    const prevX = player.x;
    const prevY = player.y;

    if (keys.forward) {
        player.x += player.speed * Math.cos(player.direction);
        player.y += player.speed * Math.sin(player.direction);
    }
    if (keys.backward) {
        player.x -= player.speed * Math.cos(player.direction);
        player.y -= player.speed * Math.sin(player.direction);
    }

    if (keys.left) {
        player.x += player.speed * Math.cos(player.direction - Math.PI/2);
        player.y += player.speed * Math.sin(player.direction - Math.PI/2);
    }
    if (keys.right) {
        player.x += player.speed * Math.cos(player.direction + Math.PI/2);
        player.y += player.speed * Math.sin(player.direction + Math.PI/2);
    }

    if (keys.lookUp) {
        player.verticalAngle = Math.min(player.maxVerticalAngle, player.verticalAngle + 0.02);
    }
    if (keys.lookDown) {
        player.verticalAngle = Math.max(-player.maxVerticalAngle, player.verticalAngle - 0.02);
    }

    if (checkCollision(player.x, player.y)) {
        player.x = prevX;
        player.y = prevY;
    }

    const wallTexture = new Image();
    wallTexture.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT04xcGOLFDpHCO-s636hlbP5t7_Ua5k_vfYQ&s';

    for (let i = 0; i < canvas.width; i++) {
        const angle = player.direction - Math.PI / 6 + (i / canvas.width) * (Math.PI / 3);
        let rayX = player.x;
        let rayY = player.y;
        let rayDistance = 0;

        while (rayDistance < rayLength) {
            rayX += Math.cos(angle);
            rayY += Math.sin(angle);

            if (map[Math.floor(rayY / 50)][Math.floor(rayX / 50)] === 1) {
                break; 
            }
            rayDistance += 1;
        }

        let lineHeight = (canvas.height / rayDistance) * 60;

        const verticalOffset = Math.tan(player.verticalAngle) * canvas.height / 2;
        const drawY = (canvas.height - lineHeight) / 2 + verticalOffset;

        const fogIntensity = 1 - Math.min(1, rayDistance / rayLength);
        ctx.globalAlpha = fogIntensity; 

        const textureX = Math.floor((rayX % 50) / 50 * wallTexture.width);
        ctx.drawImage(wallTexture, textureX, 0, 1, wallTexture.height, i, drawY, 1, lineHeight);

        ctx.globalAlpha = 1.0;

        const shadowIntensity = Math.max(0.3, fogIntensity);
        const shadowLength = lineHeight * 0.5; 

        ctx.fillStyle = `rgba(0, 0, 0, ${shadowIntensity * 0.5})`; 
        ctx.fillRect(i, drawY + lineHeight, 1, shadowLength); 
    }
}

function removefog() {
    rayLength += 20;
    console.log(rayLength);
}

function addfog() {
    rayLength -= 20;
    console.log(rayLength);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
