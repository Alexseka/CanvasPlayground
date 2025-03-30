//illusion mode
function startIllusion()
{
    let shapes = []; 
    let shapeCount = 25; 
    let maxSize = 100; 
    let reverse= false; 

    for (let i = 0; i < shapeCount; i++) {
        shapes.push
        ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * maxSize + 10, 
            baseSize: Math.random() * maxSize + 10,
            speed: Math.random() * 2 + 1
        });
    }

    let mouseX = 0, mouseY = 0;
    canvas.addEventListener('mousemove', (e) =>{
        const canvasRect = canvas.getBoundingClientRect();
        if (e.clientY > canvasRect.top && e.clientY < canvasRect.bottom)
        {
            mouseX = e.clientX - canvasRect.left;
            mouseY = e.clientY - canvasRect.top;
        }
    });

    canvas.addEventListener('click', () =>{
        reverse =!reverse;
    });


    function animateIllusion()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape =>{
            let moveX= (mouseX - canvas.width /2) / (canvas.width /2); 
            let moveY= (mouseY - canvas.height /2) / (canvas.height /2); 

            if (reverse)
            {
                moveX =-moveX;
                moveY =-moveY;
            }
            shape.x += moveX* shape.speed;
            shape.y += moveY* shape.speed;
            shape.size = shape.baseSize + (Math.random() * 20 - 10);

            if (shape.x < 0) shape.x=canvas.width;
            if (shape.x > canvas.width) shape.x=0;
            if (shape.y < 0) shape.y=canvas.height;
            if (shape.y > canvas.height) shape.y=0;

            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
        });

        requestAnimationFrame(animateIllusion);
    }

    animateIllusion();
}

//Ripple mode
function startRipples()
{
    let ripples = [];
    let intensity = 1;

    for (let i=0; i<10; i++)
    {
        ripples.push
        ({
            x: Math.random()* canvas.width,
            y: Math.random()* canvas.height,
            radius: 0,
            speed: Math.random()* 2 + 1* intensity,
            color: randomColor()
        });
    }

    canvas.addEventListener('click', (event) =>{
        let newRipple={
            x: event.clientX,
            y: event.clientY,
            radius: 0,
            speed: Math.random()* 2 + 1 * intensity,
            color: randomColor()
        };
        ripples.push(newRipple);
    });

    window.addEventListener('keydown', (event) =>{
        if(event.key === 'ArrowRight')
        {
            intensity += 0.1;
        } 
        else if(event.key === 'ArrowLeft')
        {
            intensity -= 0.1;
            if (intensity < 0.1) intensity = 0.1;
        }

        ripples.forEach(ripple =>{
            ripple.speed = Math.random()* 2 + 1* intensity;
        });
    });

    function animateRipples()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ripples.forEach(ripple =>{
            ripple.radius += ripple.speed;
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI* 2);
            ctx.strokeStyle = ripple.color;
            ctx.lineWidth = randomStroke();
            ctx.stroke();
        });

        requestAnimationFrame(animateRipples);
    }
    animateRipples();
}

//Bounce mode
let balls=
[{ 
        x: canvas.width / 2, 
        y: canvas.height / 2, 
        radius: 30, 
        dx: 4, 
        dy: 4, 
        color: randomColor()
}];
canvas.addEventListener('click', (event) =>{
    let newBall=
    {
        x: event.clientX,
        y: event.clientY,
        radius: 30,
        dx: (Math.random() * 4 + 2) * (Math.random() > 0.5 ? 1 : -1),
        dy: (Math.random() * 4 + 2) * (Math.random() > 0.5 ? 1 : -1),
        color: randomColor()
    };
    balls.push(newBall);
});
function adjustSpeed(increase)
{
    balls.forEach(ball =>{
        let speedFactor= 1.1;
        if (!increase)
        {
            speedFactor = 0.9;
        }
        ball.dx *= speedFactor;
        ball.dy *= speedFactor;
    });
}
function startBounce()
{
    function animateBounce()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(ball =>{
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx = -ball.dx;
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy = -ball.dy;

            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle= ball.color;
            ctx.fill();
        });
        requestAnimationFrame(animateBounce);
    }
    animateBounce();
} 
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        // Increase speed
        adjustSpeed(true);
    } else if (event.key === 'ArrowLeft') {
        // Decrease speed
        adjustSpeed(false);
    }
});

//stars mode
function startStars()
{
    let stars = [];
    let starCount = 100;
    let shootingStar = null;
    let planets = [];
    let planetCount = 2;

    for (let i=0; i<starCount; i++)
    {
        stars.push
        ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.5,
            directionX: (Math.random() - 0.5) * 2,
            directionY: (Math.random() - 0.5) * 2,
        });
    }

    for (let i=0; i<planetCount; i++)
    {
        planets.push
        ({
            x: Math.random()* canvas.width,
            y: Math.random()* canvas.height,
            size: Math.random()* 20 + 10,
            color: randomColor(),
            speed: Math.random()* 0.5 + 0.2,
        });
    }

    canvas.addEventListener('click', (e) =>{
        shootingStar={
            x: e.clientX,
            y: e.clientY,
            speed: 10,
            directionX: (Math.random() - 0.5) * 10,
            directionY: (Math.random() - 0.5) * 10,
        };
    });

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star =>{
            star.x += star.directionX* star.speed;
            star.y += star.directionY* star.speed;
            star.size = Math.max(0.1, star.size - 0.01);

            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height)
            {
                star.x = Math.random()* canvas.width;
                star.y = Math.random()* canvas.height;
                star.size = Math.random()* 2 + 1;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });

        planets.forEach(planet =>{
            planet.x += planet.speed;
            planet.y += planet.speed;

            if (planet.x > canvas.width || planet.y > canvas.height)
            {
                planet.x = Math.random() * canvas.width;
                planet.y = Math.random() * canvas.height;
            }

            ctx.beginPath();
            ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
            ctx.fillStyle = planet.color;
            ctx.fill();
        });

        if (shootingStar)
        {
            shootingStar.x += shootingStar.directionX * shootingStar.speed;
            shootingStar.y += shootingStar.directionY * shootingStar.speed;
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(shootingStar.x - shootingStar.directionX * 10, shootingStar.y - shootingStar.directionY * 10);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.stroke();

            if (shootingStar.x < 0 || shootingStar.x > canvas.width || shootingStar.y < 0 || shootingStar.y > canvas.height)
            {
                shootingStar = null;
            }
        }
        requestAnimationFrame(animateStars);
    }
    animateStars();
}