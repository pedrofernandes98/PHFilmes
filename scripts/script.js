const API_KEY = "0e22c04258f4b788aa46a78eaffd7e59";
const URL_BASE = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR"
const URL_BASE_IMG = "https://image.tmdb.org/t/p/w500";
var listaGeneros = "";
var lastPage = 0;
// var currentPage = 1;

//SAMPLE REQUEST - https://api.themoviedb.org/3/movie/550?api_key=0e22c04258f4b788aa46a78eaffd7e59
function preencheGeneros(){
    //console.log(this.responseText)
    listaGeneros = JSON.parse(this.responseText);
    listaGeneros = listaGeneros.genres;
    //console.log(listaGeneros)
}

function getGeneros(){
    let xhr = new XMLHttpRequest();
    xhr.onload = preencheGeneros
    xhr.open('GET',`${URL_BASE}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`)
    xhr.send();
}

function renderData(page){
   let conteudo = document.getElementById('renderConteudo');
   let texto = '';
   let fechaRow = 0;

   let dados = JSON.parse (this.responseText);
   //console.log(dados)

    pagination(dados)

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
       //console.log(genres)
       let generos = "";
       for(let i=0; i < genres.length; i++){
           let retorno =  listaGeneros.find( x => x.id === genres[i])
           generos += retorno.name;
           if(i != genres.length - 1){
             generos += ", ";
           }
       }
       
       //console.log(generos)

        
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

function getFilmes(page){
    
    if(page == null || page == ''){
        page = 1;
    }

    getGeneros()
    let xhr = new XMLHttpRequest();
    xhr.onload = renderData
    let request = `${URL_BASE}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
    //console.log(request)
    xhr.open('GET',`${request}`)
    xhr.send();
}

function searchFilme(page){
    //getGeneros()
    let query = document.getElementById('txtPesquisa').value;

    if(page == null || page == ''){
      page = 1;
    }

    let xhr = new XMLHttpRequest();
    xhr.onload = renderData
    let request = `${URL_BASE}/search/movie/?api_key=${API_KEY}&language=${LANGUAGE}&query=${query}&page=${page}`
    console.log(request)
    xhr.open('GET',`${request}`)
    xhr.send();
}



function pagination(dados){
    //getGeneros()
    let componentPagination = document.getElementById('pagination');

    let totalPages = parseInt(dados.total_pages);
    console.log(totalPages)
    lastPage = totalPages;
    console.log(lastPage);
    let currentPage = parseInt(dados.page);
    let texto = "";
    if(totalPages > 5){
        if(currentPage == 1){
            texto += `
            <div class="row" style="padding-top: 35px;">
            <div class="col-md-6 ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <!-- <li class="page-item active"><a class="page-link" href="#">Primeira</a></li> -->
                  <li class="page-item active"><a class="page-link" onclick="getPage(this)" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">2</a></li>
                  <li class="page-item "><a class="page-link" onclick="getPage(this)" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">4</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`
        }
        else if(currentPage == 2){
            texto += `<div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item active"><a onclick="getPage(this)" class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">3</a></li>
                  <li class="page-item  "><a onclick="getPage(this)" class="page-link" href="#">4</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">6</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`
        }
        else if(currentPage == totalPages){
            texto += `
            <div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">${totalPages - 4}</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">${totalPages - 3}</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">${totalPages - 2}</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">${totalPages - 1}</a></li>
                  <li class="page-item active"><a class="page-link" href="#" onclick="getPage(this)">${totalPages}</a></li>
                  <!-- <li class="page-item"><a class="page-link" href="#">Última</a></li> -->
                </ul>
              </nav>
            </div>
          </div>`
        }
        else if(currentPage == (totalPages - 1)){
            texto += `
            <div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${totalPages - 4}</a></li>
                  <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${totalPages - 3}</a></li>
                  <li class="page-item"><a class="page-link" href="#"onclick="getPage(this)">${totalPages - 2}</a></li>
                  <li class="page-item active"><a class="page-link" href="#" onclick="getPage(this)">${totalPages - 1}</a></li>
                  <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${totalPages}</a></li>
                  <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`
        }
        else{
            texto += `
            <div class="row" style="padding-top: 35px;">
              <div class="col-md-6  ">
                
              </div>
              <div class="col-md-6 carregarMais" id="pagination">
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">Primeira</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${currentPage - 2}</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${currentPage - 1}</a></li>
                    <li class="page-item active"><a class="page-link" href="#">${currentPage}</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${currentPage + 1}</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">${currentPage + 2}</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="getPage(this)">Última</a></li>
                  </ul>
                </nav>
              </div>
            </div>
            `
        }
      }
      else{
          switch(totalPages){
            case 1: 

            texto += `
            <div class="row" style="padding-top: 35px;">
            <div class="col-md-6 ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <!-- <li class="page-item active"><a class="page-link" href="#">Primeira</a></li> -->
                  <li class="page-item active"><a class="page-link" onclick="getPage(this)" href="#">1</a></li>
                </ul>
              </nav>
            </div>
          </div>`

            break;
            case 2: 
            
            texto += `<div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item active"><a onclick="getPage(this)" class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">3</a></li>
                  <li class="page-item  "><a onclick="getPage(this)" class="page-link" href="#">4</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`
            

            break;
            case 3: 

            texto += `<div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item"><a onclick="getPage(this)" class="page-link" href="#">1</a></li>
                  <li class="page-item"><a onclick="getPage(this)" class="page-link" href="#">2</a></li>
                  <li class="page-item active"><a class="page-link" onclick="getPage(this)" href="#">3</a></li>
                  <li class="page-item "><a onclick="getPage(this)" class="page-link" href="#">4</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`

            break;
            case 4: 

            texto += `<div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item"><a onclick="getPage(this)" class="page-link" href="#">1</a></li>
                  <li class="page-item"><a onclick="getPage(this)" class="page-link" href="#">2</a></li>
                  <li class="page-item "><a class="page-link" onclick="getPage(this)" href="#">3</a></li>
                  <li class="page-item active"><a onclick="getPage(this)" class="page-link" href="#">4</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">6</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`

            break;
            case 5: 
            texto += `<div class="row" style="padding-top: 35px;">
            <div class="col-md-6  ">
              
            </div>
            <div class="col-md-6 carregarMais" id="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Primeira</a></li>
                  <li class="page-item "><a class="page-link" onclick="getPage(this)" href="#">3</a></li>
                  <li class="page-item"><a onclick="getPage(this)" class="page-link" href="#">4</a></li>
                  <li class="page-item active"><a class="page-link" onclick="getPage(this)" href="#">5</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">6</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">7</a></li>
                  <li class="page-item"><a class="page-link" onclick="getPage(this)" href="#">Última</a></li>
                </ul>
              </nav>
            </div>
          </div>`
            break;
          }
      }
    componentPagination.innerHTML = texto;
    

}

function getPage(e){
    let query = document.getElementById('txtPesquisa').value;
    
    console.log(lastPage)
    
    let newPage = e.textContent;
    console.log(e)
    if(newPage == "Primeira"){
        newPage = 1;
    }
    else if(newPage == "Última"){
        newPage = lastPage;
    }
    console.log(newPage)
    if(query != null && query != ''){
      searchFilme(newPage);
    }
    else{
      getFilmes(newPage);
    }

    
}

window.onload = getFilmes

