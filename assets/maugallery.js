// (function($) {
//   $.fn.mauGallery = function(options) {
//     var options = $.extend($.fn.mauGallery.defaults, options);
//     var tagsCollection = [];
//     return this.each(function() {
//       $.fn.mauGallery.methods.createRowWrapper($(this));
//       if (options.lightBox) {
//         $.fn.mauGallery.methods.createLightBox(
//           $(this),
//           options.lightboxId,
//           options.navigation
//         );
//       }
//       $.fn.mauGallery.listeners(options);

//       $(this)
//         .children(".gallery-item")
//         .each(function(index) {
//           $.fn.mauGallery.methods.responsiveImageItem($(this));
//           $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
//           $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
//           var theTag = $(this).data("gallery-tag");
//           if (
//             options.showTags &&
//             theTag !== undefined &&
//             tagsCollection.indexOf(theTag) === -1
//           ) {
//             tagsCollection.push(theTag);
//           }
//         });

//       if (options.showTags) {
//         $.fn.mauGallery.methods.showItemTags(
//           $(this),
//           options.tagsPosition,
//           tagsCollection
//         );
//       }

//       $(this).fadeIn(500);
//     });
//   };
//   $.fn.mauGallery.defaults = {
//     columns: 3,
//     lightBox: true,
//     lightboxId: null,
//     showTags: true,
//     tagsPosition: "bottom",
//     navigation: true
//   };
//   $.fn.mauGallery.listeners = function(options) {
//     $(".gallery-item").on("click", function() {
//       if (options.lightBox && $(this).prop("tagName") === "IMG") {
//         $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
//       } else {
//         return;
//       }
//     });

//     $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
//     $(".gallery").on("click", ".mg-prev", () =>
//       $.fn.mauGallery.methods.prevImage(options.lightboxId)
//     );
//     $(".gallery").on("click", ".mg-next", () =>
//       $.fn.mauGallery.methods.nextImage(options.lightboxId)
//     );
//   };
//   $.fn.mauGallery.methods = {
//     createRowWrapper(element) {
//       if (
//         !element
//           .children()
//           .first()
//           .hasClass("row")
//       ) {
//         element.append('<div class="gallery-items-row row"></div>');
//       }
//     },
//     wrapItemInColumn(element, columns) {
//       if (columns.constructor === Number) {
//         element.wrap(
//           `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
//         );
//       } else if (columns.constructor === Object) {
//         var columnClasses = "";
//         if (columns.xs) {
//           columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
//         }
//         if (columns.sm) {
//           columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
//         }
//         if (columns.md) {
//           columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
//         }
//         if (columns.lg) {
//           columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
//         }
//         if (columns.xl) {
//           columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
//         }
//         element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
//       } else {
//         console.error(
//           `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
//         );
//       }
//     },
//     moveItemInRowWrapper(element) {
//       element.appendTo(".gallery-items-row");
//     },
//     responsiveImageItem(element) {
//       if (element.prop("tagName") === "IMG") {
//         element.addClass("img-fluid");
//       }
//     },
//     openLightBox(element, lightboxId) {
//       $(`#${lightboxId}`)
//         .find(".lightboxImage")
//         .attr("src", element.attr("src"));
//       $(`#${lightboxId}`).modal("toggle");
//     },
//     prevImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function() {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function() {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function() {
//           if (
//             $(this)
//               .children("img")
//               .data("gallery-tag") === activeTag
//           ) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         prev = null;

//       $(imagesCollection).each(function(i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i ;
//         }
//       });
//       prev = imagesCollection[index-1] || imagesCollection[0];
//       $(".lightboxImage").attr("src", $(prev).attr("src"));
//     },
//     nextImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function() {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function() {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function() {
//           if (
//             $(this)
//               .children("img")
//               .data("gallery-tag") === activeTag
//           ) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         next = null;

//       $(imagesCollection).each(function(i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i;
//         }
//       });
//       next = imagesCollection[index+1] || imagesCollection[imagesCollection.length - 1];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     createLightBox(gallery, lightboxId, navigation) {
//       gallery.append(`<div class="modal fade" id="${
//         lightboxId ? lightboxId : "galleryLightbox"
//       }" tabindex="-1" role="dialog" aria-hidden="true">
//                 <div class="modal-dialog" role="document">
//                     <div class="modal-content">
//                         <div class="modal-body">
//                             ${
//                               navigation
//                                 ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
//                                 : '<span style="display:none;" />'
//                             }
//                             <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
//                             ${
//                               navigation
//                                 ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
//                                 : '<span style="display:none;" />'
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>`);
//     },
//     showItemTags(gallery, position, tags) {
//       var tagItems =
//         '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
//       $.each(tags, function(index, value) {
//         tagItems += `<li class="nav-item active">
//                 <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
//       });
//       var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

//       if (position === "bottom") {
//         gallery.append(tagsRow);
//       } else if (position === "top") {
//         gallery.prepend(tagsRow);
//       } else {
//         console.error(`Unknown tags position: ${position}`);
//       }
//     },
//     filterByTag() {
//       if ($(this).hasClass("active-tag")) {
//         return;
//       }
//       $(".active-tag").css({"background-color": "#ffffff"});
//       $(".active-tag").removeClass("active active-tag");
//       $(this).addClass("active-tag");
//       $(this).css({"background-color": "#ff5733"});


//       var tag = $(this).data("images-toggle");

//       $(".gallery-item").each(function() {
//         $(this)
//           .parents(".item-column")
//           .hide();
//         if (tag === "all") {
//           $(this)
//             .parents(".item-column")
//             .show(300);
//         } else if ($(this).data("gallery-tag") === tag) {

//           $(this)
//             .parents(".item-column")
//             .show(300);
//         }
//       });
//     }
//   };
// })(jQuery);



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

const placeBtnFiltre = document.querySelector(".boutonFiltre");
const affichagePhoto = document.querySelector(".gallery");

genererbtnfiltre(boutonFiltres);
generer(gallery)

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



function modalUp(genmodal) {
  const imgModal = document.getElementById("modalImg");
  imgModal.removeAttribute('aria-hidden');

  const boiteTout = document.createElement("div");

  const butPrev = document.createElement("button");
  butPrev.classList.add("fa-solid");
  butPrev.classList.add("fa-chevron-left");
  butPrev.classList.add("butPrev");
  butPrev.setAttribute('aria-hidden',false);
  butPrev.setAttribute('aria-label', "Previous");
  boiteTout.appendChild(butPrev);

  const butNext = document.createElement("button");
  butNext.classList.add("fa-solid");
  butNext.classList.add("fa-chevron-right");
  butNext.classList.add("butNext");
  butNext.setAttribute('aria-hidden',false);
  butNext.setAttribute('aria-label', "Next");
  boiteTout.appendChild(butNext);

  boiteTout.classList.add("boiteTout");
  imgModal.appendChild(boiteTout);
  const imagemodal = document.createElement("img");
  imagemodal.src = genmodal.dataset['original'];
  imagemodal.dataset['original'] = genmodal.dataset['original'];
  boiteTout.appendChild(imagemodal);
  imgModal.style.display = "flex";
  const choixFiltree = placeBtnFiltre.querySelector("button[class='active']");


  document.getElementById("modalImg").addEventListener("click",(event) => {
    if (event.target === document.getElementById("modalImg")){
    const mld = document.querySelector("#modalImg");
    mld.style.display = "none";
    mld.setAttribute('aria-hidden', true);
    imgModal.innerHTML ="";
  }})

  window.addEventListener("keydown",(event) => {
    if(event.key === "Escape" || event.key === "Esc"){
    const mld = document.querySelector("#modalImg");
    mld.style.display = "none";
    mld.setAttribute('aria-hidden', true);
    imgModal.innerHTML ="";
    }
  })

  let tablImgChoix = []
  if(choixFiltree.id==="0"){
    tablImgChoix = affichagePhoto.querySelectorAll("img");
  }else{
    tablImgChoix = affichagePhoto.querySelectorAll(`img[id=${choixFiltree.id}]`);
  }

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

const Modal = affichagePhoto.querySelectorAll("img");
for (let k=0; k<Modal.length; k++){
  Modal[k].addEventListener("click",() =>{
    modalUp(Modal[k]);

  })
}
