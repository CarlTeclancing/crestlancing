function openMenu(){

    //alert("hello world")
    var main = document.getElementById("nav-s")
    if((main.style.height == "0vh") && (main.style.width == "0%")){
        main.style.height = "100vh"
        main.style.width = "40%"
    } else{

        main.style.height = "0vh"
        main.style.width = "0%"
    }
}