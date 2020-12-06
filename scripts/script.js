const API_KEY = "0e22c04258f4b788aa46a78eaffd7e59";
const URL_BASE = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR"
const URL_BASE_IMG = "https://image.tmdb.org/t/p/w500";
var listaGeneros = "";

//SAMPLE REQUEST - https://api.themoviedb.org/3/movie/550?api_key=0e22c04258f4b788aa46a78eaffd7e59
function preencheGeneros(){
    console.log(this.responseText)
    listaGeneros = JSON.parse(this.responseText);
    listaGeneros = listaGeneros.genres;
    console.log(listaGeneros)
}

function getGeneros(){
    let xhr = new XMLHttpRequest();
    xhr.onload = preencheGeneros
    xhr.open('GET',`${URL_BASE}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`)
    xhr.send();
}

function renderData(){
   let conteudo = document.getElementById('renderConteudo');
   let texto = '';
   let fechaRow = 0;

   let dados = JSON.parse (this.responseText);
   console.log(dados)
   
   for(let i = 0; i < dados.results.length ; i++){
        if(i % 4 === 0){
            texto += "</div>"
            texto += `<div class="row rowRender">`
            fechaRow = 0
        }
    
       let img = `${URL_BASE_IMG}/${dados.results[i].poster_path}`;
       //console.log(img)

       let description = dados.results[i].overview;
       //console.log(description)

       if(description.length > 87){
           description = description.substring(0,84) + "...";
       }
       else if(description.length == 0){
           description = "Sem descrição disponível..."
       }
       //console.log(description)

       let genres = dados.results[i].genre_ids; 
       console.log(genres)
       let generos = "";
       for(let i=0; i < genres.length; i++){
           let retorno =  listaGeneros.find( x => x.id === genres[i])
           generos += retorno.name;
           if(i != genres.length - 1){
             generos += ", ";
           }
       }
       
       console.log(generos)

        
       texto += `
            <div class="col-md-3">
              <div class="card">
                <div class="card-img-title">
                 <img clase="card-img-top img-fluid img-cartazes" style="width: 100%;" src="${img}">
                </div>
                <div class="card-body">
                  <div class="rating" style="margin-bottom: 5px;">
                    <i class="fas fa-star" style="color:#f5c518"></i> <span class="evaluetion">${dados.results[i].vote_average}</span>
                  </div>
                  <h5 style="" class="titulo">${dados.results[i].title}</h5>
                  <h6 class="genre">Gêneros: ${generos}</h6>
                  
                    <div class="description">
                      ${description}    
                    </div>
                  <button class="btn btn-info vejaMais">+ Veja mais</button>
                </div> 
              </div>
            </div>
       `

   }
   

   conteudo.innerHTML = texto
}

function getFilmes(){
    getGeneros()
    let xhr = new XMLHttpRequest();
    xhr.onload = renderData
    let request = `${URL_BASE}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`
    //console.log(request)
    xhr.open('GET',`${request}`)
    xhr.send();
}

//SThttps://api.themoviedb.org/3/search/movie?api_key=0e22c04258f4b788aa46a78eaffd7e59&language=pt-BR&query=Batman&page=1&include_adult=false

function searcFilme(){
    //getGeneros()
    let query = document.getElementById('txtPesquisa').value;

    let xhr = new XMLHttpRequest();
    xhr.onload = renderData
    let request = `${URL_BASE}/search/movie/?api_key=${API_KEY}&language=${LANGUAGE}&query=${query}`
    //console.log(request)
    xhr.open('GET',`${request}`)
    xhr.send();
}

window.onload = getFilmes

