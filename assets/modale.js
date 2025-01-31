/* fonction générant la modale*/
function modalUp(genmodal) {
    const imgModal = document.getElementById("modalImg");
    imgModal.removeAttribute('aria-hidden');
  
    const boiteTout = document.createElement("div");
  
    const butPrev = document.createElement("button"); /* création bouton-chevron gauche*/
    butPrev.classList.add("fa-solid");
    butPrev.classList.add("fa-chevron-left");
    butPrev.classList.add("butPrev");
    butPrev.setAttribute('aria-hidden',false);
    butPrev.setAttribute('aria-label', "Previous");
    boiteTout.appendChild(butPrev);
  
    const butNext = document.createElement("button");/*création bouton-chevron droite*/
    butNext.classList.add("fa-solid");
    butNext.classList.add("fa-chevron-right");
    butNext.classList.add("butNext");
    butNext.setAttribute('aria-hidden',false);
    butNext.setAttribute('aria-label', "Next");
    boiteTout.appendChild(butNext);
  
    boiteTout.classList.add("boiteTout");
    imgModal.appendChild(boiteTout);
    const imagemodal = document.createElement("img"); /*création de l'affiche de l'img dans la modale*/
    imagemodal.dataset['original'] = genmodal.dataset['original']; /*définit un dataset pour l'img modal*/
    imagemodal.src = genmodal.dataset['original']; /*définit la src de l'img modal comme devant être le dataset défini au-dessus*/
    boiteTout.appendChild(imagemodal);
    imgModal.style.display = "flex";
    const choixFiltree = placeBtnFiltre.querySelector("button[class='active']"); /* variable sélectionnant le bouton filtre choisi*/
  
  /*écoute du clic en dehors de l'img modale pour fermer la boîte modale*/
    document.getElementById("modalImg").addEventListener("click",(event) => {
      if (event.target === document.getElementById("modalImg")){
      const mld = document.querySelector("#modalImg");
      mld.style.display = "none";
      mld.setAttribute('aria-hidden', true);
      imgModal.innerHTML ="";
    }})
  
    /*écoute de l'utilisation de la touche "Echap" pour fermer la modale*/
    window.addEventListener("keydown",(event) => {
      if(event.key === "Escape" || event.key === "Esc"){
      const mld = document.querySelector("#modalImg");
      mld.style.display = "none";
      mld.setAttribute('aria-hidden', true);
      imgModal.innerHTML ="";
      }
    })
  
    let tablImgChoix = [] /*création d'un objet tableau contenant les img du choix filtre*/
    if(choixFiltree.id==="0"){ /*si le bouton choisi est "tous", le tableau contient ttes les img*/
      tablImgChoix = affichagePhoto.querySelectorAll("img");
    }else{
      tablImgChoix = affichagePhoto.querySelectorAll(`img[id=${choixFiltree.id}]`);
    }
  /*écoute des boutons prev et next de la modale, en partant du contenu du tableau ci-dessus*/
    butPrev.addEventListener("click", () =>{
      let index = 0;
      for(let m=0; m<tablImgChoix.length; m++){
        if (tablImgChoix[m].dataset['original'] === imagemodal.dataset['original']){
          index = m;
          break;
        }
      }
      if (index === 0){
        imagemodal.src = tablImgChoix[index].dataset['original'];
        imagemodal.dataset['original'] = tablImgChoix[index].dataset['original'];
      }else{
        imagemodal.src = tablImgChoix[index-1].dataset['original'];
        imagemodal.dataset['original'] = tablImgChoix[index-1].dataset['original'];
      }
  
    })
  
    butNext.addEventListener("click", () =>{
      let index = 0;
      for(let m=0; m<tablImgChoix.length; m++){
        if (tablImgChoix[m].dataset['original'] === imagemodal.dataset['original']){
          index = m;
          break;
        }
      }
      if (index === tablImgChoix.length-1){
        imagemodal.src = tablImgChoix[index].dataset['original'];
        imagemodal.dataset['original'] = tablImgChoix[index].dataset['original'];
      }else{
        imagemodal.src = tablImgChoix[index+1].dataset['original'];
        imagemodal.dataset['original'] = tablImgChoix[index+1].dataset['original'];
      }
  
    })
  
  }
  