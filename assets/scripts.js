
    // Déclare la constante pour la durée de chaque slide
    const slideTimeout = 5000;

    // Récupère les boutons de navigation
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');

    // Récupère tous les éléments de type "slide"
    const $slides = document.querySelectorAll('.slide');

    // Initialisation de la variable pour les "dots"
    let $dots;

    // Initialisation de la variable pour l'intervalle d'affichage des slides
    let intervalId;

    // Initialisation du slide courant à 1
    let currentSlide = 0;

    // Fonction pour afficher un slide spécifique en utilisant un index
    function slideTo(index) {
        // Vérifie si l'index est valide (compris entre 0 et le nombre de slides - 1)
        // currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        if (index < 0) {
            currentSlide = $slides.length -1;
        }else{
            if (index >= $slides.length) {
                currentSlide = 0;
            }else{
                currentSlide = index;
            }
        }


        // Boucle sur tous les éléments de type "slide" pour les déplacer
        // $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        for(let k=0; k<$slides.length; k++)
            $slides[k].style.transform = `translateX(-${currentSlide * 100}%)`;

        // Boucle sur tous les "dots" pour mettre à jour la couleur par la classe "active" ou "inactive"
        // $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active': 'inactive'}`);
        for(let p=0; p<$dots.length; p++) {
            // $dots[p].classList = `dot ${p === currentSlide ? 'active': 'inactive'}`;
            if (p === currentSlide){
                $dots[p].classList = "dot active";

            }else{
                $dots[p].classList = "dot inactive";
            }
        }
    }

    // Fonction pour afficher le prochain slide
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }

    // Boucle pour créer les "dots" en fonction du nombre de slides
    for (let i = 0; i < $slides.length; i++) {
        let dotClass ;
        if (i === currentSlide){
            dotClass = "active";
        }else{
            dotClass = "inactive";
        }
        let carouselPoints = document.querySelector('.carousel-dots');
        carouselPoints.innerHTML += `<span class="dot ${dotClass}"></span>`;
        // let $dot = `<span class="dot ${dotClass}"></span>`;
        // document.querySelector('.carousel-dots').innerHTML += $dot;
    }

    // Récupère tous les "dots"
    $dots = document.querySelectorAll('.dot');

    // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
    // $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    for (let g =0; g<$dots.length; g++ ){
        $dots[g].addEventListener("click",() => {
            slideTo(g);
        })
    }


    // Ajout d'un écouteur d'événement "click" sur le bouton "prev" pour afficher le slide précédent
    prev.addEventListener('click', () => slideTo(--currentSlide))

    // Ajout d'un écouteur d'événement "click" sur le bouton "next" pour afficher le slide suivant
    next.addEventListener('click', () => slideTo(++currentSlide))

    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
        let stopDef = document.querySelector(".carousel");
        stopDef.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        });
        stopDef.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        });