var subject = document.getElementById('subject');
var question = document.getElementById('question');
var submit = document.getElementById('submitBtn');
var datalist = document.getElementById('dataList');
var rightInputContainer = document.getElementById('toggleDisplay');
var newQuestionForm = document.getElementById('newQuestionForm');
var questionSearch = document.getElementById('questionSearch');
var upv = document.getElementById('upvote');
var dwv = document.getElementById('downvote');

//question Details
var respondQue = document.getElementById('respondQue');
var resolveHolder = document.getElementById('resolveHolder');
var resolveQuestion = document.getElementById('resolveQuestion');
var respondAns = document.getElementById('respondAns');
var outside = document.getElementById('outside');
var commentHolder = document.getElementById('commentHolder');
var pickName = document.getElementById('pickName');
var pickComment = document.getElementById('pickComment');
var commentBtn = document.getElementById('commentBtn');
var rightInputFlag = true;
//newQuestionForm button
newQuestionForm.addEventListener('click',()=>{
    rightInputFlag == true
    toggleRight();
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
        commentBtn.onclick = saveResponse(key);
})
//search
questionSearch.addEventListener("keyup",(event)=>{
    var query = event.target.value;
    var arr = getFromLocalStorage();
    var temparr;
    if(query){
        datalist.innerHTML = ''
        temparr = arr.filter((data)=>{
            return data.sub.includes(query);
        })
        if(temparr.length)
            renderQuestions(temparr);
        else    
            {
                var nmf = document.createElement('h2');
                nmf.innerHTML = 'No Match Found';
                toggleRight();
                datalist.appendChild(nmf);
            }
    }
    else{
        datalist.innerHTML = ''
        renderQuestions();
    }
})
//renders existing questions upon reload
renderQuestions();
function renderQuestions(arr){
    datalist.innerHTML = '';
    var data;
    if(arr)
        data = arr;
    else 
        data = getFromLocalStorage();
    data.sort((a,b) =>{
        return b.upvote - (a.upvote)
    })
    data.forEach(function(data){
        createQuestion(data);
    });

}
//submit question
submit.addEventListener('click',addtoDatalist)
function addtoDatalist (){   
    if(subject.value && question.value){
        const container = {
        sub: subject.value,
        ques: question.value,
        id: new Date().getUTCMilliseconds(),
        responses: [],
        upvote: 0,
        downvote: 0 
    };
    addtoLocalStorage(container);
    createQuestion(container);
    }
    else    
        alert('Insert Subject and Description');
}
//creates a box for individual question
function createQuestion(container){
    var box = document.createElement('div');
        var head = document.createElement('h2');
        var bod = document.createElement('h4');
        var up = document.createElement('button');
        var down = document.createElement('button');
        head.setAttribute('name','text');
        bod.setAttribute('name','text');
        head.innerHTML = container.sub;
        bod.innerHTML = container.ques;
        up.innerHTML = container.upvote;
        down.innerHTML = container.downvote;
        box.setAttribute("id","box");
        up.setAttribute("id","dispupvote");
        down.setAttribute("id","dispdownvote");
        box.appendChild(head);
        box.appendChild(bod);
        box.appendChild(up);
        box.appendChild(down);
        box.setAttribute('key',container.id)
        datalist.appendChild(box);
        box.addEventListener('click',displayDetails(container));
}
function displayDetails(container){
    return ()=>{
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
        upv.onclick = ()=>{
            container.upvote++;
            updateVote(container);
            renderQuestions();
        }
        dwv.onclick = ()=>{
            container.downvote++;
            updateVote(container);
            renderQuestions();
        }
        resolveQuestion.onclick = deleteContainer(container.id);
    }
}
function deleteContainer(id){
    return ()=>{
        var arr = getFromLocalStorage();
        arr = arr.filter((data)=> data.id != id);
    localStorage.setItem('data',JSON.stringify(arr));
    renderQuestions();
    toggleRight();
    }
}
function saveResponse(genId){
    return (event)=>{
        const res = {
            name: pickName.value,
            comment: pickComment.value
        }
        var arr = getFromLocalStorage();
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
        outside.style.display = "none";
        resolveQuestion.style.display = "none";
        commentHolder.style.display = "none";
        commentBtn.style.display = "none";
    }
    else {
        rightInputContainer.style.display = "none";  //hide right container
        
        respondQue.style.display = "block";
        resolveHolder.style.display = "block";
        respondAns.style.display = "block";
        outside.style.display = "block";
        resolveQuestion.style.display = "block";
        commentHolder.style.display = "block";
        commentBtn.style.display = "block";
        
        rightInputFlag = !rightInputFlag
    }
    
}
function updateVote(obj){
    var data = getFromLocalStorage();
    data.forEach((container)=>{
        if(container.id == obj.id){
            container.upvote = obj.upvote;
            container.downvote = obj.downvote
        }
    })
    localStorage.setItem('data',JSON.stringify(data));
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
