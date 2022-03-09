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

//newQuestionForm button
takeInput.addEventListener('click',()=>{
    rightInputFlag == true
    toggleRight();
    console.log('button works')
    }
)
//get id of container
datalist.addEventListener('click',(event)=>{
        var name = event.target.getAttribute('name');
        var key
        if(name == 'text')
            key = event.target.parentElement.getAttribute('key');
        else 
            key = event.target.getAttribute('key');        
        rightInputFlag = false;
        toggleRight();
        // displayDetails(container.id);       
        fetchResponses(key);
        commentBtn.addEventListener('click',saveResponse(key))
    
})
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
        ques: question.value,
        id: new Date().getUTCMilliseconds(),
        responses: []
    };
    addtoLocalStorage(container);
    createQuestion(container);
}
//creates a box for individual question
function createQuestion(container){
    var box = document.createElement('div');
        var head = document.createElement('h2');
        var bod = document.createElement('h4');
        head.setAttribute('name','text');
        bod.setAttribute('name','text');
        head.innerHTML = container.sub;
        bod.innerHTML = container.ques;
        box.setAttribute("id","box");
        box.appendChild(head);
        box.appendChild(bod);
        box.setAttribute('key',container.id)
        datalist.appendChild(box);
}
//flag
// function onquesClick(container){
//     return function()
// }
function displayDetails(container){
    respondQue.innerHTML = '';
    var heading = document.createElement('h3');
    heading.innerHTML = 'Question'
    var title = document.createElement('h4');
    title.innerHTML = container.sub;
    var desc = document.createElement('h5')
    desc.innerHTML = container.ques;
    respondQue.appendChild(heading)
    respondQue.appendChild(title);
    respondQue.appendChild(desc);

}
function saveResponse(genId){
    return (event)=>{
        const res = {
            name: pickName.value,
            comment: pickComment.value
        }
        console.log(event.target.parentElement)
        var arr = getFromLocalStorage();
        console.log(genId);
        arr.forEach((data)=>{
            if(data.id == genId){
                data.responses.push(res);
            }
        })
        localStorage.setItem('data',JSON.stringify(arr));
        fetchResponses(genId);
    }
}
function fetchResponses(genid){
    respondAns.innerHTML = '';
    respondAns.innerHTML = 'Responses';
    var arr = getFromLocalStorage();
    arr.forEach((data)=>{
        if(data.id == genid)
        {
            data.responses.forEach((coms)=>{               
                var r = document.createElement('div');
                var head = document.createElement('h4');
                var body = document.createElement('h5');
                r.setAttribute('id','box');
                head.innerHTML = coms.name;
                body.innerHTML = coms.comment;
                r.appendChild(head)
                r.appendChild(body)
                respondAns.appendChild(r);
            })
        }
    })
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