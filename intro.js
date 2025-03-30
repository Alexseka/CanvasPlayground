//intro dots
function animateIntro()
{
    //left
    ctxIntroLeft.clearRect(0, 0, introLeft.width, introLeft.height);
    ctxIntroLeft.fillStyle = "white";

    dotsLeft.forEach(dot =>{
        dot.y += dot.speed;
        if (dot.y > introLeft.height) dot.y = 0;
        ctxIntroLeft.beginPath();
        ctxIntroLeft.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctxIntroLeft.fill();
    });

    //right
    ctxIntroRight.clearRect(0, 0, introRight.width, introRight.height);
    ctxIntroRight.fillStyle = "white";

    dotsRight.forEach(dot =>{
        dot.y += dot.speed;
        if (dot.y > introRight.height) dot.y = 0;
        ctxIntroRight.beginPath();
        ctxIntroRight.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctxIntroRight.fill();
    });

    requestAnimationFrame(animateIntro);
}

animateIntro();