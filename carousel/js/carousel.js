'use strict';

/***********************************************************************************/
/* ********************************* DONNEES CARROUSEL *****************************/
/***********************************************************************************/

// Codes des touches du clavier.
const TOUCHE_GAUCHE = 37;
const TOUCHE_DROITE = 39;
// Constante pour paramétrer la vitesse du carrousel
const DELAI = 3000;

// La liste des slides du carrousel sous forme de tableau d'objets.
const slides =
[
  {
    image: 'img/chat-relax.jpg',
    legend: 'Chat relax'
  },
  {
    image: 'img/chat-maine-coon.jpg',
    legend: 'Le chat Maine Coon'
  },
  {
    image: 'img/chat-noir.jpg',
    legend: 'Le chat noir'
  },
  {
    image: 'img/chat-roux.jpg',
    legend: 'Le chat roux'
  },
  {
    image: 'img/chat-sacre-birmanie.jpg',
    legend: 'Le chat sacré de Birmanie'
  },
  {
    image: 'img/jeune-chat.jpg',
    legend: 'Le chaton'
  }
];
let maxSlides = slides.length;

// Objet contenant l'état du carrousel.
let carousel;

//
// Génération de la navigation sur les slides
//

let nav = document.querySelector('.carousel-nav');
nav.innerHTML = '';
for (let i = 1; i <= maxSlides; i++) {
  let span = document.createElement('span');
  span.setAttribute('class', 'dot');
  span.setAttribute('data-number', i);
  nav.appendChild(span);
}


/***********************************************************************************/
/* ******************************** FONCTIONS CARROUSEL ****************************/
/***********************************************************************************/

function next()
{
    // Passage à la slide suivante.
    console.log('next');
    // Passage à la slide suivante
    carousel.index++;
    // Test fin de la liste
    if (carousel.index >= maxSlides) {
      // Retour au début
      carousel.index = 0;
    }
    // Mise à jour de l'affichage
    refresh();
}

function previous()
{
  // Passage à la slide précédente.
  console.log('previous');
  // Passage à la slide précédente.
  carousel.index--;
  // Est-ce qu'on est revenu au début de la liste des slides ?
  if(carousel.index < 0)
  {
    // On revient à la fin
    carousel.index = maxSlides - 1;
  }
  // Mise à jour de l'affichage.
  refresh();
}

function keyUp(event)
{
  // Intercepter les touches du clavier
  switch(event.keyCode)
  {
    case TOUCHE_DROITE:
      // Slide suivante
      next();
      break;
    case TOUCHE_GAUCHE:
      // Slide précédente
      previous();
      break;
  }
}

function gotoSlide()
{
  console.log(this);
  // Récupérer l'attribut data number de l'élément cliqué
  console.log('dot clicked '+this.dataset.number);
  let index = this.dataset.number - 1;
  // Passage à la slide cliquée
  if (index !== carousel.index) {
    carousel.index = index;
    refresh();
  }
}

function start()
{
  // Démarrage du carrousel
  carousel.timer = window.setInterval(next, DELAI);
}

function stop()
{
  // Arrêt du carrousel
  window.clearInterval(carousel.timer);
  carousel.timer = null;
}

function refresh()
{
  // Affichage du carrousel
  // Sélection des éléments du carousel dans le code html
  let sliderImage = document.querySelector("#carousel img");
  let sliderLegend = document.querySelector("#carousel h2");
  // Modification de la source de l'image
  sliderImage.src = slides[carousel.index].image;
  // Modification du texte du carrousel
  sliderLegend.textContent = slides[carousel.index].legend

  // Ajouter/supprimer la classe active sur la navigation
  let dots = document.querySelectorAll('.carousel-nav .dot');
  for (let i = 0; i < maxSlides; i++) {
    if (i === carousel.index) {
      dots[i].classList.add('active');
    }
    else {
      dots[i].classList.remove('active');
    }
  }
}

//
// CODE PRINCIPAL
//

document.addEventListener('DOMContentLoaded', function()
{
  // Initialisation du carrousel.
  carousel = new Object;
  carousel.index = 0; // On commence à la première slide
  carousel.timer = null; // Initialisation du timer
  // Installation des gestionnaires d'évènement.
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('previous').addEventListener('click', previous);
  document.getElementById('carousel-item').addEventListener('mouseover', stop);
  document.getElementById('carousel-item').addEventListener('mouseleave', start);
  document.addEventListener('keyup', keyUp);
  // Ajouter un écouteur d'événement sur chaque élément de la navigation de slides
  let dots = document.querySelectorAll('.carousel-nav .dot');
  for (let i = 0; i < maxSlides; i++) {
    dots[i].addEventListener('click', gotoSlide);
  }
  // Affichage initial.
  start();
  refresh();
});
