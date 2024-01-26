


function writeValue(param){
    var writein = document.getElementById('writein')

    var newValue = writein.value + param
    writein.value = newValue

    //alert(param)
}

function EvaluteA(){
    var writein = document.getElementById('writein')
    var answer = eval(writein.value)
    var answerDisplay = document.getElementById("answerDisplay")
    answerDisplay.value = answer

}

