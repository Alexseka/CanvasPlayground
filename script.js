//setup
let introWrap = document.getElementById('introWrap');
let introLeft = document.getElementById('introLeft');
let introRight = document.getElementById('introRight');
let canvas = document.getElementById('canvas');
let ctxIntroLeft = introLeft.getContext('2d');
let ctxIntroRight = introRight.getContext('2d');
let ctx = canvas.getContext('2d');
let startBtn = document.getElementById('startBtn');
let mainPage = document.getElementById('mainPage');
let modeBtns = document.querySelectorAll('.modeBtn');
let resetBtn = document.getElementById('resetBtn');
const ambientSound = new Audio('spaceSounds.mp3');
ambientSound.loop = true;

//setting up canvas'
introLeft.width = introRight.width = window.innerWidth / 2;
introLeft.height = introRight.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//intro dots loop
let dotsLeft = [];
let dotsRight = [];
for (let i=0; i<50; i++)
{
    dotsLeft.push
    ({
        x: Math.random()* introLeft.width,
        y: Math.random()* introLeft.height,
        speed: Math.random()* 2 + 1
    });
    dotsRight.push
    ({
        x: Math.random()* introRight.width,
        y: Math.random()* introRight.height,
        speed: Math.random()* 2 + 1
    });
}

//random colour
function randomColor()
{
    let r= Math.floor(Math.random()* 256);
    let g= Math.floor(Math.random()* 256);
    let b= Math.floor(Math.random()* 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//stroke width number
function randomStroke()
{
    return Math.random()* 4 + 5;
}

//close intro
startBtn.addEventListener('click',() =>{
    introWrap.style.display = 'none'; 
    mainPage.style.display = 'block';
    canvas.style.backgroundColor = 'white';
});

//mode select btn
modeBtns.forEach(btn => {
    btn.addEventListener('click',(e) => {
        let mode = e.target.getAttribute('data-mode');
        startMode(mode);
    });
});

//mode layout setup
function updateModeText(mode) 
{
    const modeText = document.getElementById('modeText');
    switch (mode){
        
        case 'illusion':
            canvas.style.backgroundColor = 'white';
            modeText.textContent = "Don't hurt your eyes!";
            modeText.style.color = "black";
            resetBtn.style.display = 'none';
            if (!ambientSound.paused)
            {
                ambientSound.pause();
            }
            break;

        case 'ripples':
            canvas.style.backgroundColor = 'white';
            modeText.textContent = "Click for ripples, left and right arrows adjust their intensity.";
            modeText.style.color = "black";
            resetBtn.style.display = 'none';
            if (!ambientSound.paused)
            {
                ambientSound.pause();
            }
            break;

        case 'bounce':
            canvas.style.backgroundColor = 'white';
            modeText.textContent = "Click to add balls, left and right arrows adjust speed.";
            modeText.style.color = "black";
            resetBtn.style.display = 'block';
            if (!ambientSound.paused)
            {
                ambientSound.pause();
            }
            break;

        case 'stars':
            canvas.style.backgroundColor = 'black';
            modeText.textContent = "Wow, look at the stars!";
            modeText.style.color = "white";
            resetBtn.style.display = 'none'; 
            if (ambientSound.paused)
            {
                ambientSound.play();
            }
            break;

        default:
            modeText.textContent = "";
            resetBtn.style.display = 'none';
            if (!ambientSound.paused)
            {
                ambientSound.pause();
                ambientSound.currentTime = 0;
            }
            break;
    }
}

//mode select
function startMode(mode){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateModeText(mode);

    switch (mode){

        case 'illusion':
            startIllusion();
            break;
        case 'ripples':
            startRipples();
            break;
        case 'bounce':
            startBounce();
            break;
        case 'stars':
            startStars();
            break;
        default:
            alert('Unknown mode');
            break;
    }
}

//bounce reset btn
resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
});


