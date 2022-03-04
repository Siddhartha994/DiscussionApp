var subject = document.getElementById('subject');
var question = document.getElementById('question');
var submit = document.getElementById('submitBtn');
var datalist = document.getElementById('dataList');

//renders existing questions upon reload
renderQuestions();
function renderQuestions(){
    var data = getFromLocalStorage();
    
    data.forEach(function(data){
        createQuestion(data.sub,data.ques);
    });
}
submit.addEventListener('click',addtoDatalist)

submit.addEventListener('click',addtoDatalist)
function addtoDatalist (){   
    const container = {
        sub: subject.value,
        ques: question.value
    };
    addtoLocalStorage(container);
    createQuestion(container.sub,container.ques);
}
//creates a box for individual question
function createQuestion(sub,ques){
    var box = document.createElement('div');
        var head = document.createElement('h2');
        var bod = document.createElement('h4');
        head.innerHTML = sub;
        bod.innerHTML = ques;
        box.setAttribute("id","box");
        box.appendChild(head);
        box.appendChild(bod);
        datalist.appendChild(box);
    // box.addEventListener('click',openQuesDetails(obj))
}
function openQuesDetails(obj){
    return function(){
        
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