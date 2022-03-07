var subject = document.getElementById('subject');
var question = document.getElementById('question');
var submit = document.getElementById('submitBtn');
var datalist = document.getElementById('dataList');
var rightInputContainer = document.getElementById('toggleDisplay');
var takeInput = document.getElementById('newQuestionForm');
//question Details
var respondQue = document.getElementById('respondQue');
var resolveHolder = document.getElementById('resolveHolder');
var resolveQuestion = document.getElementById('resolveQuestion');
var respondAns = document.getElementById('respondAns');
var commentHolder = document.getElementById('commentHolder');
var pickName = document.getElementById('pickName');
var pickComment = document.getElementById('pickComment');
var commentBtn = document.getElementById('commentBtn');
var rightInputFlag = true;

takeInput.addEventListener('click',()=>{
    rightInputFlag == true
    toggleRight();
    console.log('button works')
    }
)
//renders existing questions upon reload
renderQuestions();
function renderQuestions(){
    var data = getFromLocalStorage();
    
    data.forEach(function(data){
        createQuestion(data);
    });
}
//submit question
submit.addEventListener('click',addtoDatalist)
function addtoDatalist (){   
    const container = {
        sub: subject.value,
        ques: question.value
    };
    addtoLocalStorage(container);
    createQuestion(container);
}
//creates a box for individual question
function createQuestion(container){
    var box = document.createElement('div');
        var head = document.createElement('h2');
        var bod = document.createElement('h4');
        head.innerHTML = container.sub;
        bod.innerHTML = container.ques;
        box.setAttribute("id","box");
        box.appendChild(head);
        box.appendChild(bod);
        datalist.appendChild(box);
    box.addEventListener('click',onquesClick(container))
}
function onquesClick(container){
    return function(){       
        rightInputFlag = false;
        toggleRight();
        displayDetails(container);
    }
}
function displayDetails(container){
    var title = document.createElement('div');
    title.innerHTML = container.sub;
    respondQue.appendChild(title);

}
function toggleRight(){
    if(rightInputFlag == true)
    {
        //new question form
        rightInputContainer.style.display = "block";  
        //ques Details
        respondQue.style.display = "none";
        resolveHolder.style.display = "none";
        respondAns.style.display = "none";
        resolveQuestion.style.display = "none";
        commentHolder.style.display = "none";
        commentBtn.style.display = "none";
    }
    else {
        rightInputContainer.style.display = "none";  //hide right container
        
        respondQue.style.display = "block";
        resolveHolder.style.display = "block";
        respondAns.style.display = "block";
        resolveQuestion.style.display = "block";
        commentHolder.style.display = "block";
        commentBtn.style.display = "block";
        
        rightInputFlag = !rightInputFlag
    }
    
}
function addtoLocalStorage(obj){
    
    var data = getFromLocalStorage();
    data.push(obj);
    localStorage.setItem('data',JSON.stringify(data));
    
}
//returns an array,empty or filled with data
function getFromLocalStorage(){
    let data = localStorage.getItem('data');
    // console.log(data);
    if(data){
        data = JSON.parse(data);
    }
    else{
        data = [];
    }
    return data;

}