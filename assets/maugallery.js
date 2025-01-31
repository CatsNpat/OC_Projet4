const placeBtnFiltre = document.querySelector(".boutonFiltre");
const affichagePhoto = document.querySelector(".gallery");

//PARTIE FILTRE
/*fonction pour créer les boutons filtres de la gallerie img*/
function genererbtnfiltre(affiche) {
  placeBtnFiltre.innerHTML="";
  const btnfilterT = document.createElement("button");
  btnfilterT.innerText = `Tous`;
  btnfilterT.setAttribute('arial-label', "Tous");
  btnfilterT.id = 0;
  btnfilterT.className = "active";
  btnfilterT.style.backgroundColor = "#BEB45A";
  btnfilterT.style.color = "#000000";
  btnfilterT.style.fontSize = "1.1em";
  placeBtnFiltre.appendChild(btnfilterT);

  for (let i = 0; i < affiche.length; i++) {
      const creaElement = document.createElement("button");
      creaElement.id = affiche[i].id;
      creaElement.innerText = affiche[i].title;
      creaElement.setAttribute('aria-label', [affiche[i].id]);
      creaElement.style.fontSize = "1.1em";

      placeBtnFiltre.appendChild(creaElement);
  }
}

genererbtnfiltre(boutonFiltres); /*voir page "tableau", genre de backend en local*/

/*fonction de mise à jour de la couleur et de la class active des boutons filtres*/
function couleurBouton (pressbouton) {
  const boutons = placeBtnFiltre.querySelectorAll("button");
  for (let i=0; i<boutons.length; i++){
      if (boutons[i].innerText === pressbouton.innerText){
          boutons[i].style.backgroundColor = "#BEB45A";
          boutons[i].style.color = "#000000";
          boutons[i].className ="active";
      }else{
          boutons[i].style.backgroundColor = "#FFFFFF";
          boutons[i].style.color = "#000000";
          boutons[i].classList.remove("active");
      }
  }
}

//PARTIE AFFICHAGE IMG GALLERIE
/*fonction pour générer l'affichage des photos de la gallerie de la page d'accueil*/
function generer(affiche) {
  affichagePhoto.innerHTML="";
  for (let i = 0; i < affiche.length; i++) {
      const imageElement = document.createElement("img");
      imageElement.src = affiche[i].url2;
      imageElement.setAttribute ("alt", affiche[i].alt);
      imageElement.setAttribute ("title", affiche[i].title);
      imageElement.dataset['original']= affiche[i].url;
      imageElement.classList.add("gallery-item");
      imageElement.id = affiche[i].id;
  
     affichagePhoto.appendChild(imageElement);
  }
}
generer(gallery)


/*écoute du choix du bouton filtre*/
const choixfiltre = placeBtnFiltre.querySelectorAll("button");
    for (let j=0; j<choixfiltre.length; j++){
        choixfiltre[j].addEventListener("click",() =>{
          if (choixfiltre[j].classList.contains("active")) {
            return;
          }else{
            affichagePhoto.classList.remove("gallery-actif");
            
            const imagesProjet = affichagePhoto.querySelectorAll("img");
            for (let i=0; i<imagesProjet.length; i++){
              const categorid = imagesProjet[i].id;
                if (categorid === choixfiltre[j].id || choixfiltre[j].id === "0"){
                    imagesProjet[i].style.display = "block";
                }else {
                    imagesProjet[i].style.display = "none";
                }
            }

            couleurBouton(choixfiltre[j])
            affichagePhoto.classList.add("gallery-actif");
        }})
    }


//PARTIE MODALE
/*écoute du clic sur une img de la gallerie de la page d'accueil, permet d'ouvrir la modale*/
const Modal = affichagePhoto.querySelectorAll("img");
for (let k=0; k<Modal.length; k++){
  Modal[k].addEventListener("click",() =>{
    modalUp(Modal[k]);

  })
}
