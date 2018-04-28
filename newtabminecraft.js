var images= document.getElementsByTagName("img")
console.log(images.length)
var number = Math.floor (Math.random() * images.length);
for (var i= 0; i < images.length; i++){
 images [i].classList.add("Hidden")

}
images[number].classList.toggle("Hidden");
