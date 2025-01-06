
const placeImgCarousel = document.querySelector(".carousel-inner");
function affichageImgCarousel(affiche) {
    placeImgCarousel.innerHTML="";
    for (let i = 0; i < affiche.length; i++) {
        const photoCarousel = document.createElement("img");
        photoCarousel.src = affiche[i].url;
        photoCarousel.setAttribute ("alt", affiche[i].alt);
        photoCarousel.setAttribute ("title", affiche[i].title);
        photoCarousel.classList.add("slide");
        
    
       placeImgCarousel.appendChild(photoCarousel);
    }
  }

  affichageImgCarousel(imgCarousel);

    const boutonCarousel = document.getElementById("carousel-control");
    const buttonPrev = document.createElement("button");
    buttonPrev.classList.add("fa-solid");
    buttonPrev.classList.add("fa-chevron-left");
    buttonPrev.id = "prev";
    buttonPrev.setAttribute('aria-hidden', false);
    buttonPrev.setAttribute('aria-label', "Previous");

    boutonCarousel.appendChild(buttonPrev);

    const buttonNext = document.createElement("button");
    buttonNext.classList.add("fa-solid");
    buttonNext.classList.add("fa-chevron-right");
    buttonNext.id = "next";
    buttonNext.setAttribute('aria-hidden', false);
    buttonNext.setAttribute('aria-label', "Next");

    boutonCarousel.appendChild(buttonNext);

    // Déclare la constante pour la durée de chaque slide
    const slideTimeout = 5000;

    // Récupère les boutons de navigation
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    // Récupère tous les éléments de type "slide"
    const TtesImgCarousel = document.querySelectorAll('.slide');

    // Initialisation de la variable pour les "dots"
    let pointsCarousel;

    // Initialisation de la variable pour l'intervalle d'affichage des slides
    let intervalId;

    // Initialisation du slide courant à 1
    let imgActive = 0;

    // Fonction pour afficher un slide spécifique en utilisant un index
    function imgChoisie(index) {
        if (index < 0) {
            imgActive = TtesImgCarousel.length -1;
        }else{
            if (index >= TtesImgCarousel.length) {
                imgActive = 0;
            }else{
                imgActive = index;
            }
        }
        // Boucle sur tous les éléments de type "slide" pour les déplacer
        for(let k=0; k<TtesImgCarousel.length; k++)
            TtesImgCarousel[k].style.transform = `translateX(-${imgActive * 100}%)`;

        // Boucle sur tous les "dots" pour mettre à jour la couleur par la classe "active" ou "inactive"
        for(let p=0; p<pointsCarousel.length; p++) {
            if (p === imgActive){
                pointsCarousel[p].classList = "dot active";
            }else{
                pointsCarousel[p].classList = "dot inactive";
            }
        }
    }

    // Fonction pour afficher le prochain slide
    function showSlide() {
        imgChoisie(imgActive);
        imgActive++;
    }

    // Boucle pour créer les "dots" en fonction du nombre de slides
    for (let i = 0; i < TtesImgCarousel.length; i++) {
        let dotClass ;
        if (i === imgActive){
            dotClass = "active";
        }else{
            dotClass = "inactive";
        }
        let carouselPoints = document.querySelector('.carousel-dots');
        carouselPoints.innerHTML += `<span class="dot ${dotClass}"></span>`;
    }

    // Récupère tous les "dots"
    pointsCarousel = document.querySelectorAll('.dot');

    for (let i =0; i<pointsCarousel.length; i++ ){
       pointsCarousel[i].addEventListener("click",() => {
            imgChoisie(i);
        })
    }

    // Ajout d'un écouteur d'événement "click" sur le bouton "prev" pour afficher le slide précédent
    prev.addEventListener('click', () => imgChoisie(--imgActive))

    // Ajout d'un écouteur d'événement "click" sur le bouton "next" pour afficher le slide suivant
    next.addEventListener('click', () => imgChoisie(++imgActive))

    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
        let stopDef = document.querySelector(".carousel");
        stopDef.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        });
        stopDef.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        });