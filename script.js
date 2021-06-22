var req = new XMLHttpRequest();
req.open("GET", "./json/image_list.json");
req.onreadystatechange = function () {
    if(this.readyState == 4){
        var data = JSON.parse(this.response);
        for (var i = 0; i < data.length; i++){
            var div = document.createElement("div");
            div.setAttribute("class", "image");
            div.onclick = function () {
                this.classList.toggle("image-selected");
                // if(this.getAttribute("class").indexOf("image-selected") == -1) {
                //     this.setAttribute("class", "image image-selected");          
                //   } else {  
                //     this.setAttribute("class", "image"); 
                //   } 

            }

            div.onmouseover = function () {
                var element = this;
                this.timerId = setTimeout(function(){
                    element.classList.add("image-magnified");
                }, 10)
            }
            div.onmouseout = function() {
                clearTimeout(this.timerId);
                this.classList.remove("image-magnified");
            }

            var img = document.createElement("img");
            img.src = data[i];

            div.appendChild(img);

            document.getElementById("log").appendChild(div);

            // document.body.appendChild(div);

        }
    }
}

function selectAll (btn){
    var images = document.getElementsByClassName("image");
    for (var i = 0; i < images.length; i++){
        if(btn.value == "선택 해제"){
            images[i].classList.remove("image-selected");
        } else {
            images[i].classList.add("image-selected");
        }
    }
    if (btn.value == "선택 해제") {
        btn.value = "전체 선택";
      } else {
        btn.value = "선택 해제";
      }

}

function slideShow(btn) {
    var images = document.getElementsByClassName("image");
    var index = 0; 
    images[index].classList.add("image-magnified");
  
    var intervalId = setInterval(function() { 
      images[index].classList.remove("image-magnified");
      index++;
      if (index < images.length) { 
        images[index].classList.add("image-magnified");
      } 
      else {
        clearInterval(intervalId); 
      }
    }, 1000);
  }

req.send();