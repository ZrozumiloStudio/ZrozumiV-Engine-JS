        // Отримання елементу canvas та його контексту
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Ініціалізація об'єкта гравця
        const player = {
            x: 50,
            y: 50,
            direction: Math.PI / 4, // Початковий напрямок (45 градусів)
            speed: 1,
            rotationSpeed: Math.PI / 120, // Швидкість обертання
        };

        // Ініціалізація карти гри
        var map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        // Довжина променя від гравця для raycasting
        var rayLength = 230;

        // Додавання слухачів подій для обробки натискань клавіш
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Об'єкт для відстеження стану натискань клавіш
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

        // Обробник відпускань клавіш
        function handleKeyUp(event) {
            if (event.key === 'ArrowUp') keys.forward = false;
            if (event.key === 'ArrowDown') keys.backward = false;
            if (event.key === 'ArrowLeft') keys.left = false;
            if (event.key === 'ArrowRight') keys.right = false;
        }

        // Функція для оновлення стану гри
        function update() {
            // Обробка введення та оновлення стану гравця
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

                var lineHeight = (canvas.height / rayDistance) * 70;
                const brightness = 1 - Math.min(1, rayDistance / rayLength); // Простий розрахунок яскравості
                const wallColor = `rgba(0, 0, 0, ${brightness})`; //колір стіни

                ctx.fillStyle = wallColor;
                ctx.fillRect(i, (canvas.height - lineHeight) / 2, 1, lineHeight);
            }

            // Малювання гравця
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
		
		
        // Функція головного циклу гри
        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            update();
            requestAnimationFrame(gameLoop);
        }

        // Запуск головного циклу гри
        gameLoop();