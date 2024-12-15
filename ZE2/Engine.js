        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Player
        const player = {
            x: 50,
            y: 50,
            direction: Math.PI / 4, // Camera direction
            speed: 1,
            rotationSpeed: Math.PI / 120, // Rotation speed
        };

        // Engine map
        var map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
        ];

        var rayLength = 230;

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        const keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };

        // Обробник натискань клавіш
        function handleKeyDown(event) {
            if (event.key === 'ArrowUp') keys.forward = true;
            if (event.key === 'ArrowDown') keys.backward = true;
            if (event.key === 'ArrowLeft') keys.left = true;
            if (event.key === 'ArrowRight') keys.right = true;
        }

        function handleKeyUp(event) {
            if (event.key === 'ArrowUp') keys.forward = false;
            if (event.key === 'ArrowDown') keys.backward = false;
            if (event.key === 'ArrowLeft') keys.left = false;
            if (event.key === 'ArrowRight') keys.right = false;
        }

        function update() {
            if (keys.forward) {
                player.x += player.speed * Math.cos(player.direction);
                player.y += player.speed * Math.sin(player.direction);
            }
            if (keys.backward) {
                player.x -= player.speed * Math.cos(player.direction);
                player.y -= player.speed * Math.sin(player.direction);
            }
            if (keys.left) {
                player.direction -= player.rotationSpeed;
            }
            if (keys.right) {
                player.direction += player.rotationSpeed;
            }

const wallTexture = new Image();
wallTexture.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT04xcGOLFDpHCO-s636hlbP5t7_Ua5k_vfYQ&s';
		
// Raycasting
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

    const lineHeight = (canvas.height / rayDistance) * 60;

    const fogIntensity = 1 - Math.min(1, rayDistance / rayLength);
    ctx.globalAlpha = fogIntensity; 

    const textureX = Math.floor((rayX % 50) / 50 * wallTexture.width); // Вычисляем горизонтальное смещение текстуры
    ctx.drawImage(wallTexture, textureX, 0, 1, wallTexture.height, i, (canvas.height - lineHeight) / 2, 1, lineHeight);

    ctx.globalAlpha = 1.0;

    const shadowIntensity = Math.max(0.3, fogIntensity); // Используем интенсивность тумана для тени
    const shadowLength = lineHeight * 0.5; 

    ctx.fillStyle = `rgba(0, 0, 0, ${shadowIntensity * 0.5})`; 
    ctx.fillRect(i, (canvas.height + lineHeight) / 2, 1, shadowLength); 
}


            // Draw player
            // ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(player.x, player.y, 5, 0, 2 * Math.PI);
            // ctx.fill();
        }
		
		
	function removefog() {
            rayLength+=20;
	    console.log(rayLength)
        }
		
	function addfog() {
            rayLength-=20;
	    console.log(rayLength)
        }
		
        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            update();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
