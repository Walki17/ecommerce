const catAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const catJuguetes = "https://japceibal.github.io/emercado-api/cats_products/102.json";
const idCategoria = localStorage.getItem("catID");

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location.href = "products.html";
}
    if (setCatID(101)){
        alert("auto")
    } else if (setCatID(102)){
        alert("juguetes")
    } 


