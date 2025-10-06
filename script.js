
function frame(){
if(!dragging){
rotY += autoSpeed + velocityX*0.95; // inercia + auto rot
velocityX *= 0.95; velocityY *= 0.95;
}
apply();
requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


// pointer (mouse/touch) events
function onDown(e){
dragging = true; lastX = e.clientX; lastY = e.clientY; velocityX = 0; velocityY = 0; e.preventDefault();
}
function onMove(e){
if(!dragging) return;
const dx = e.clientX - lastX;
const dy = e.clientY - lastY;
rotY += dx * 0.3;
rotX += dy * 0.12;
rotX = Math.max(-60, Math.min(60, rotX));
velocityX = dx * 0.08; velocityY = dy * 0.02;
lastX = e.clientX; lastY = e.clientY;
}
function onUp(e){ dragging = false; }


stage.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);


// zoom con rueda
window.addEventListener('wheel', (ev)=>{
ev.preventDefault();
const diff = -ev.deltaY * 0.0015;
zoom = Math.max(0.6, Math.min(1.6, zoom + diff));
stage.style.width = `calc(var(--size) * ${zoom})`;
stage.style.height = `calc(var(--size) * ${zoom})`;
}, {passive:false});


// doble click para reiniciar
stage.addEventListener('dblclick', ()=>{
rotY = 0; rotX = -12; zoom = 1; stage.style.width = '' ; stage.style.height = '';
});


// disminuye autoSpeed cuando el usuario interactúa
stage.addEventListener('pointerdown', ()=> autoSpeed = 0.0);
stage.addEventListener('pointerup', ()=> autoSpeed = 0.03);




// mueve las nubes en sentido contrario a la rotación del planeta (sutil)
clouds.style.transform = `translateZ(6px) rotateY(${ -rotY * 0.6 }deg) scale(1.02)`;
requestAnimationFrame(syncClouds);

requestAnimationFrame(syncClouds);


// Generar estrellas aleatorias
const numStars = 150;
for (let i = 0; i < numStars; i++) {
const star = document.createElement('div');
star.classList.add('stars');
star.style.top = Math.random() * 100 + 'vh';
star.style.left = Math.random() * 100 + 'vw';
star.style.animationDuration = (1 + Math.random() * 3) + 's';
document.body.appendChild(star);
}


// Frases inspiradoras
const frases = [
'El universo conspira a favor de los que sueñan.',
'Somos polvo de estrellas buscando sentido.',
'Cada estrella guarda un deseo.',
'En la oscuridad también hay belleza.',
'Brilla como si todo el universo te mirara.'
];


const fraseEl = document.getElementById('frase');
let index = 0;


function cambiarFrase() {
fraseEl.textContent = frases[index];
index = (index + 1) % frases.length;
}


cambiarFrase();
setInterval(cambiarFrase, 8000);