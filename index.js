  
let currentPage = 1;
let lastPage = 0;
let maxImages = 12;

let apiKey="Ma0h0KtJMBpKTkxJzsSBYEieFHY3hbUrugFsKciovuM"
//   const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=${maxImages}&page=${currentPage}&client_id=${apiKey}`;
  let searchbtn=document.querySelector("#searchbutton")
const countInfoPara = document.getElementById("info");
 async function realsearch(searchvalue)
  {
   const resp = await fetch
   (`https://api.unsplash.com/search/photos?query=${searchvalue}&per_page=${maxImages}
&page=${currentPage}&client_id=${apiKey}`)
if(!resp.ok)
{
    console.log("some error occured");
    return;
}
const json = await resp.json();
return json;
  }
  searchbutton.onclick = () => makesearch();

  async function makesearch(){
    const searchvalue=document.getElementById("inputsearch").value;
   const response= await realsearch(searchvalue);
   let html="";
   response.results.forEach((e)=>{
      const url = e.urls.small;
    const link = e.links.html;
    const photographer = e.user.name;
    const photographerPage = e.user.links.html;
  
   
   html +=
   `<div>
   <a href="${link}" target="_blank">
   <div class="image" style="background-image: url(${url});"></div>
   </a>
   <div class="photographer">
   <a class="photoanch" href="${photographerPage}" target="_blank">Photo by ${photographer}</a>
   </div></div>
   `
  })
  
  document.getElementById("cont").style.backgroundColor= "aliceblue";
  lastPage=response.total_pages;
  const imagecont=document.getElementById("imagedbba");
  imagecont.innerHTML=html;
       const info=document.getElementById("upinfo")
       info.innerHTML=`About ${response.total} results found`


  if(`${response.total}`!=0)
{

  let startPoint = (maxImages * (currentPage - 1))+1;
  let endPoint = (maxImages * currentPage)+1;

  countInfoPara.innerText = `${startPoint} - ${endPoint} of page ${currentPage}`;
  btnstate()

}
else
{
 countInfoPara.innerText="Search with a different word"  
}
       
       
}
const prevpage=document.querySelector("#prevpage");
const nextpage=document.querySelector("#nextpage");
nextpage.addEventListener("click", function(){
    console.log("utbhbk")
    if(currentPage > lastPage)
      {
        return;
      }
      currentPage++;
      makesearch()
})

prevpage.addEventListener("click", function(){
    if(currentPage==1)
      {
        return;
      }
      currentPage--;
      makesearch();
})
function btnstate(){
    nextpage.classList.remove("hidden");
    if(currentPage>=lastPage)
    {
       nextpage.classList.add("hidden");  
    }
     prevpage.classList.remove("hidden");
      if(currentPage==1)
    {
       prevpage.classList.add("hidden");  
    }
}