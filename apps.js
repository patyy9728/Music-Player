let contenido= []
fetch("index.json")
.then(response => response.json())
.then(data=>{
   contenido = data
   mostrar()
 console.log(contenido)
});

let actualSong = null
musicName = document.querySelector("#nameSong")
musicImage = document.querySelector("#area-img")
nameArtist = document.querySelector("#nameArtist")
playSong = document.querySelector(".play")
pauseSong = document.querySelector("#pause")
next = document.querySelector("#next-song")
back = document.querySelector("#back-song")
audio = document.querySelector("#audio")
progressBar = document.querySelector("#progress-bar")
progressArea = document.querySelector("#progress-area")
gif = document.querySelector(".gif")
function mostrar(){
  let table = document.querySelector("tbody")
    contenido.datos_pag.canciones.forEach((lista,index)=>{
      let link = document.createElement("a")
      link.href = "#"
      link.addEventListener(`click`,() => loadSong(index))
      let fila = document.createElement("tr")
      fila.classList.add(`song`)
      link.appendChild(fila)
      let td = document.createElement("td")
      td.innerText = `${lista.numero}`
      td.classList.add(`td`)
      fila.appendChild(td)
      let tdImagen = document.createElement("td")
      let imgPortada =document.createElement("img")
      tdImagen.classList.add(`td`)
      imgPortada.setAttribute(
        `src`,`${lista.portada}`
      )
      imgPortada.classList.add(`portada-cancion`)
      tdImagen.appendChild(imgPortada)
      fila.appendChild(tdImagen)
      let tdName = document.createElement("td")
      tdName.classList.add(`td`)
      tdName.innerText =`${lista.nombre} - ${lista.artista}`
      fila.appendChild(tdName)
      let tdAlbum = document.createElement("td")
      tdAlbum.classList.add(`td`)
      tdAlbum.innerText = `${lista.disco}`
      fila.appendChild(tdAlbum)
      let tdDuration = document.createElement("td")
      tdDuration.classList.add(`td`)
      tdDuration.innerText=`${lista.duración}`
      fila.appendChild(tdDuration)
      table.appendChild(link)
    })

      function loadSong(songIndex){
        if(songIndex != actualSong){
         changeActiveClass(actualSong,songIndex)
        actualSong = songIndex
        audio.src = contenido.datos_pag.canciones[songIndex].cancion
        audio.play()
        playSong.style.visibility="hidden"
        pauseSong.style.visibility="visible"
        gif.style.visibility="visible"
        musicName.innerText = contenido.datos_pag.canciones[songIndex].nombre
        nameArtist.innerText = contenido.datos_pag.canciones[songIndex].artista
        musicImage.src = contenido.datos_pag.canciones[songIndex].portada
        }
      }
      function changeActiveClass(lastIndex, newIndex){
        const links = document.querySelectorAll("a")
        if(lastIndex != null){
          links[lastIndex].classList.remove("active")
        }
        links[newIndex].classList.add("active")
      }
     // Click Play
      playSong.addEventListener(`click`,()=>{
        audio.play()
        playSong.style.visibility="hidden"
        pauseSong.style.visibility="visible"
        gif.style.visibility="visible"
      })
      // Click Pause
      pauseSong.addEventListener(`click`,()=>{
        audio.pause()
        playSong.style.visibility="visible"
        pauseSong.style.visibility="hidden" 
        gif.style.visibility="hidden"
      })

      
next.addEventListener(`click`,()=> nextSong())
back.addEventListener(`click`,()=> backSong())

     // anterior
     function backSong(){
      loadSong(actualSong-1)
     }
     // Siguiente
     function nextSong(){
      loadSong(actualSong+1)
     }
     // Progress Bar
    
    audio.addEventListener(`timeupdate`, updateProgress)
    function updateProgress(evento){
      const {duration, currentTime} = evento.srcElement
      const percent = (currentTime / duration) * 100
      progressBar.style.width = percent + "%"
     
    };
    //Click avance progreso 
    progressArea.addEventListener(`click`, setupProgress)
    function setupProgress(evento){
       const totalWhidth = this.offsetWidth
       const progressWidth = evento.offsetX
       const current = (progressWidth / totalWhidth) * audio.duration
       audio.currentTime = current
       
    }
    
audio.addEventListener(`ended`, () =>nextSong())
    }   
           