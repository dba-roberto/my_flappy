function criaObstaculos() {

    const minHDiv = 15;
    const maxDDiv = 100;
    let tamanho = 0;
    const qtdeObstaculos = 4;

    for (i = 1; i <= qtdeObstaculos; i++) {

        let id = i;

        const AreaJogo = document.querySelector('[wm-flappy]');

        const obstaculo = document.createElement('div');
        obstaculo.setAttribute('id', id);
        obstaculo.classList.add('obstaculoPai');

        const obschild1 = document.createElement('div');
        obschild1.setAttribute('id', 'obschild1-' + id);
        obschild1.classList.add('obstaculo');

        tamanho = Math.random() * (maxDDiv - minHDiv);

        while (tamanho >= 30) {
            tamanho = Math.random() * (maxDDiv - minHDiv);
        };

        obschild1.style.height = `${tamanho}%`;

        const obschild2 = document.createElement('div');
        obschild2.setAttribute('id', 'obschild2-' + id);
        obschild2.classList.add('obstaculo');

        tamanho = maxDDiv - tamanho - minHDiv;

        obschild2.style.height = `${tamanho}%`;

        obstaculo.appendChild(obschild1);
        obstaculo.appendChild(obschild2);
        AreaJogo.appendChild(obstaculo);

    };

};

function removerObstaculos() {

    const qtdeObstaculos = 4;

    for (i = 1; i <= qtdeObstaculos; i++) {

        let id = i;

        const obstaculo = document.getElementById(id);

        if (obstaculo) {
            obstaculo.remove();
        };

    };

};

function colisaoFlappy(pAtuTop, pAtuLeft) {

    let Obstaculo1 = document.getElementById('obschild1-1');
    let Obstaculo2 = document.getElementById('obschild1-2');
    let Obstaculo3 = document.getElementById('obschild1-3');
    let Obstaculo4 = document.getElementById('obschild1-4');
    let Obstaculo5 = document.getElementById('obschild2-1');
    let Obstaculo6 = document.getElementById('obschild2-2');
    let Obstaculo7 = document.getElementById('obschild2-3');
    let Obstaculo8 = document.getElementById('obschild2-4');

    if (Obstaculo1) {

        let coordenada1 = Obstaculo1.getBoundingClientRect();
        let coordenada2 = Obstaculo2.getBoundingClientRect();
        let coordenada3 = Obstaculo3.getBoundingClientRect();
        let coordenada4 = Obstaculo4.getBoundingClientRect();
        let coordenada5 = Obstaculo5.getBoundingClientRect();
        let coordenada6 = Obstaculo6.getBoundingClientRect();
        let coordenada7 = Obstaculo7.getBoundingClientRect();
        let coordenada8 = Obstaculo8.getBoundingClientRect();

        if (pAtuTop <= coordenada1.height && pAtuLeft >= coordenada1.left && pAtuLeft <= coordenada1.right) {

            return true;

        } else if (pAtuTop <= coordenada2.height && pAtuLeft >= coordenada2.left && pAtuLeft <= coordenada2.right) {

            return true;

        } else if (pAtuTop <= coordenada3.height && pAtuLeft >= coordenada3.left && pAtuLeft <= coordenada3.right) {

            return true;

        } else if (pAtuTop <= coordenada4.height && pAtuLeft >= coordenada4.left && pAtuLeft <= coordenada4.right) {

            return true;

        } else if (pAtuTop >= coordenada5.height && pAtuLeft >= coordenada5.left && pAtuLeft <= coordenada5.right) {

            return true;

        } else if (pAtuTop >= coordenada6.height && pAtuLeft >= coordenada6.left && pAtuLeft <= coordenada6.right) {

            return true;

        } else if (pAtuTop >= coordenada7.height && pAtuLeft >= coordenada7.left && pAtuLeft <= coordenada7.right) {

            return true;

        } else if (pAtuTop >= coordenada8.height && pAtuLeft >= coordenada8.left && pAtuLeft <= coordenada8.right) {

            return true;
        }
        else {

            console.log(pAtuTop + ' --> ' + coordenada5.height + ' --> ' + pAtuLeft + ' --> ' + coordenada5.left + ' --> ' + pAtuLeft + ' --> ' + coordenada5.right);
            console.log(pAtuTop + ' --> ' + coordenada6.height + ' --> ' + pAtuLeft + ' --> ' + coordenada6.left + ' --> ' + pAtuLeft + ' --> ' + coordenada6.right);
            console.log(pAtuTop + ' --> ' + coordenada7.height + ' --> ' + pAtuLeft + ' --> ' + coordenada7.left + ' --> ' + pAtuLeft + ' --> ' + coordenada7.right);
            console.log(pAtuTop + ' --> ' + coordenada8.height + ' --> ' + pAtuLeft + ' --> ' + coordenada8.left + ' --> ' + pAtuLeft + ' --> ' + coordenada8.right);

            return false;

        };

    };

};

function jogarFlappy() {

    setInterval(() => {

        const myWidth = comando.clientWidth;
        const myHeight = comando.clientHeight;

        const pAtuLeft = flappy.style.left.replace('px', '');
        const pAtuTop = flappy.style.top.replace('px', '');

        if (pAtuTop > 0 && pAtuLeft <= myWidth && pAtuTop <= myHeight) {

            flappy.style.left = pleft + "px";
            pleft = pleft + pfixed;

            flappy.style.top = pdown + "px";
            pdown = pdown + pfixed;

            const counting = document.getElementById('counting');
            count = count + 1;
            counting.innerText = "Score " + count;

            if (colisaoFlappy(pAtuTop, pAtuLeft) == true) {

                pleft = 10;
                pdown = 80;
                flappy.style.left = pleft + "px";
                flappy.style.top = pdown + "px";

                sFlappy = false;
                count = 0;

                removerObstaculos();


            }

        }
        else {
            pleft = 10;
            pdown = 80;
            flappy.style.left = pleft + "px";
            flappy.style.top = pdown + "px";

            sFlappy = false;

            removerObstaculos();

        }
    }, 100);

};

window.onload = jogarFlappy();

var pfixed = 12;
var pleft = 10;
var pdown = 80;
var sFlappy = false;
var flappy = document.querySelector('img');
var count = 0;

const comando = document.querySelector('body');

comando.addEventListener('keydown', (e) => {
    e.preventDefault()

    if (!sFlappy) {

        sFlappy = true;

        criaObstaculos();

    };

    pdown = flappy.style.top.replace('px', '');
    pdown = pdown - pfixed;
    flappy.style.top = pdown + "px";

});