const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');

const {width, height} = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

const MOVE_AMOUNT = 20;

ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

function draw({ key }){
    hue = hue+1;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key);
    ctx.beginPath();
    ctx.moveTo(x,y);
    //move the xy values
    // x = x -MOVE_AMOUNT;
    // y = y -MOVE_AMOUNT;

    switch (key){
        case 'ArrowUp':
          y -= MOVE_AMOUNT;
          break;
        case 'ArrowRight':
          x += MOVE_AMOUNT;
          break;
        case 'ArrowDown':
          y += MOVE_AMOUNT;
          break;
        case 'ArrowLeft':
          x -= MOVE_AMOUNT;
          break;
        default:
          break;
      }
    ctx.lineTo(x,y);
    ctx.stroke();
};

function handleKey(e) {
    if (e.key.includes('Arrow')) {
      e.preventDefault();
      draw({ key: e.key });
    }
  };

  
  function clearCanvas() {
      canvas.classList.add('shake');
      ctx.clearRect(0,0,width,height);
      canvas.addEventListener('animationend', function() {
          canvas.classList.remove('shake');
        }), {once : true};
    };
    
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);