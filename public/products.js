


$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (response) {
  productList=response

  producta(productList)
})

function producta(productList){

var menandwomen = document.querySelector("#clothing-head")
var headingofbox = document.createElement("h2");
headingofbox.innerText = "Clothing for Men and Women";
menandwomen.appendChild(headingofbox);
headingofbox.classList.add("jscloth_header");



// box data
var menclothingbox = document.querySelector(".clothingbox2")

var menaccbox = document.querySelector(".accessoriesbox2")


for (var i = 0; i < productList.length; i++) {


    if(productList[i].isAccessory === false) {
            menclothingbox.innerHTML += ` 
     <div id="abox${i}"    onclick="makethisinclick(abox${[
            i,
        ]})"    class="minibox">

        <img src="${productList[i].preview}" class="mainimage" alt=""> 
        <div class="dataodcard">
  
          <p class="text1">${productList[i].name}   </p>
          <p class="text2">  ${productList[i].brand} </p>
          <p class="text3"> Rs ${productList[i].price} </p>
        </div>
     
     </div>   `
    }
    else{

        menaccbox.innerHTML += ` 
        <div id="abox${i}"  onclick="makethisinclick(abox${[
               i,
           ]})" class="minibox">
   
           
           <img src="${productList[i].preview}" class="mainimage" alt=""> 
           <div class="dataodcard">
     
             <p class="text1">${productList[i].name}   </p>
             <p class="text2">  ${productList[i].brand} </p>
             <p class="text3"> Rs ${productList[i].price} </p>
           </div>
        
        </div>   `

    }


}
}


var hideadd= document.getElementById("addtocart")
hideadd.style.display = "none";


function makethisinclick(res) {
  hideadd.style.display = "block";

  document.getElementById("anothermain").innerHTML="";
  
  var resId = res.id;
  var cardNUmber = resId.charAt(resId.length - 1);
  cardNUmber = parseInt(cardNUmber) + 1;
  
  $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${cardNUmber}`, function abc(response) {
    var productData = response

    dataofproduct(productData)

    var clickedaddcart=document.getElementById("addtocart")
    clickedaddcart.addEventListener("click",function(){
      location.reload
      addtocardclicked(productData)
    })

    // passing argument for local storage product
    // storinginlocal(productData)

})
}

  function dataofproduct(productData){




    var preview = productData.preview
    var productname = productData.name
    var price = productData.price
    var brand = productData.brand
    var description = productData.description
    var photos = productData.photos

    var productimage = document.getElementById("image-div")
    var productdetails = document.getElementById("details-div")

    // creating element for main image
    var mainpreviewimage = document.createElement("img")
    mainpreviewimage.className = "main-image-wrapper";

    mainpreviewimage.src = preview
    var paragraph1 = document.createElement("h1")
    paragraph1.className = "para1"
    paragraph1.innerText = productname

    var paragraph2 = document.createElement("h3")
    paragraph2.className = "para2"
    paragraph2.innerText = brand

    var paragraph3 = document.createElement("h4")
    paragraph3.className = "para3"
    var spanforprice = document.createElement("span")
    spanforprice.className = "spanpara"
    spanforprice.innerText = "Price: Rs "
    var spanforpricedata = document.createElement("span")
    spanforpricedata.className = "spanpara2"
    spanforpricedata.innerText = price


    var paragraph4 = document.createElement("h3")
    paragraph4.className = "para4"
    paragraph4.innerText = "description"

    var paragraph5 = document.createElement("h4")
    paragraph5.className = "para5"
    paragraph5.innerText = description

    var paragraph6 = document.createElement("h3")
    paragraph6.className = "para6"
    paragraph6.innerText = "Product Preview"


    // function for preview image
    function productpage() {
      // getting element from html

      productimage.appendChild(mainpreviewimage);


      // creating element for details
      // appending
      paragraph3.appendChild(spanforprice)
      paragraph3.appendChild(spanforpricedata)

      productdetails.append(paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, paragraph6)

    }
    // calling function for big image
    productpage()



    // creating img div for small images
    var smallimagesmaindiv = document.createElement("div")
    smallimagesmaindiv.className = "smallimages-wrapper"



    // selecting the details div in which the details data is available
    var productdetails = document.getElementById("details-div")

    //  creating a function for small photos dynamically
    function productimg2(photos) {
      var smallpreview = document.createElement("div")
      smallpreview.className = "smallimages"
      // putting small images in small image div
      var smallimg = document.createElement("img")
      smallimg.className = "smallphotos "
      smallimg.src = photos;
      if (i == 0) {
        smallimg.classList.add('active');
      }


      // appending elements
      smallpreview.appendChild(smallimg)
      smallimagesmaindiv.appendChild(smallpreview)
      productdetails.appendChild(smallimagesmaindiv)

      // adding event listner on click

      smallimg.addEventListener("click", function () {
        mainpreviewimage.src = smallimg.src
        let getActiveElem = document.querySelector('.active');
        getActiveElem.classList.remove('active');
        smallimg.classList.add('active');


      })

    }
  

    for (var i = 0; i < productData.photos.length; i++) {
      productimg2(photos[i])

    }
  }
  

var addtocartpageloader = document.getElementById("addtocardid")
addtocartpageloader.onclick = function () {
  addtocarthasclicked()
}

function addtocarthasclicked() {
  location.href = "./addtocart.html"
}

// var count=0
function addtocardclicked(productData){
 
  
var listofp=[]

  if(localStorage.getItem("listofproduct")==null){
 

    listofp.push(productData)
    
    localStorage.setItem("listofproduct", JSON.stringify(listofp))


    


  }
  else{
    var localdata=JSON.parse(localStorage.getItem("listofproduct"))
    localdata.push(productData)
    localStorage.setItem("listofproduct", JSON.stringify(localdata))
   
    
    
    
  }
  var addtocarticoncount = document.getElementById("cart-count")
  var localdata2=JSON.parse(localStorage.getItem("listofproduct"))
  if(localdata2!=null){
    addtocarticoncount.innerHTML=localdata2.length
    
  }

}
var addtocarticoncount = document.getElementById("cart-count")
var localdata2=JSON.parse(localStorage.getItem("listofproduct"))
if(localdata2!=null){
  addtocarticoncount.innerHTML=localdata2.length
  
}


