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
    var key
    var name = event.target.getAttribute('name');
    if(name == 'text')
        key = event.target.parentElement.getAttribute('key');
        
    else 
        key = event.target.getAttribute('key');        
    rightInputFlag = false;
    toggleRight();
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
//vote on response
respondAns.addEventListener('click',(event)=>{
    var key;
    var reskey;
    if( event.target.className == 'dispupvote'){
        key = event.target.parentElement.getAttribute('key');
        var res = {
            name: event.target.previousElementSibling.previousElementSibling.innerHTML,
            comment: event.target.previousElementSibling.innerHTML,
            id: key,
            upvote: parseInt(++event.target.innerHTML),
            downvote: event.target.nextElementSibling.innerHTML
        }
    }
    else if( event.target.className == 'dispdownvote'){
        key = event.target.parentElement.getAttribute('key');
        var res = {
            name: event.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML,
            comment: event.target.previousElementSibling.previousElementSibling.innerHTML,
            id: key,
            upvote: event.target.previousElementSibling.innerHTML,
            downvote: parseInt(++event.target.innerHTML)
        }
    }
    var arr = getFromLocalStorage();
    for(var i = 0; i< arr.length;i++){
        for(var j = 0; j < arr[i].responses.length;j++){
            if(arr[i].responses[j].id == key){
                arr[i].responses[j] = res;
            }
        }
        arr[i].responses.sort((a,b) =>{
            return b.upvote - (parseInt(a.upvote))
        })  
    }
    
    localStorage.setItem('data',JSON.stringify(arr));    
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
    data.sort((a,b) =>{
        return b.favorite - (a.favorite)
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
        id: new Date().getTime(),
        responses: [],
        upvote: 0,
        downvote: 0,
        favorite: false
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
        var fav = document.createElement('input');
        var log = document.createElement('p');
        
        box.setAttribute('key',container.id)
        box.setAttribute("id","box");
        head.setAttribute('name','text');
        bod.setAttribute('name','text');
        fav.setAttribute('type','checkbox');
        up.setAttribute("class","dispupvote");
        down.setAttribute("class","dispdownvote");
        if(container.favorite)
            fav.setAttribute('checked','checked');

        head.innerHTML = container.sub;
        bod.innerHTML = container.ques;
        up.innerHTML = container.upvote;
        down.innerHTML = container.downvote;
        setInterval(()=>{
            log.innerHTML = `Created ${timeLapsed(container.id)} ago `;
        },1000)

        box.appendChild(head);
        box.appendChild(bod);
        box.appendChild(up);
        box.appendChild(down);
        box.appendChild(fav);
        box.appendChild(log);
        datalist.appendChild(box);

        box.addEventListener('click',displayDetails(container));
        fav.addEventListener('click', addtoFav(container));
}
function timeLapsed(creationTime){
    var timeLapsed = Date.now() - new Date(creationTime).getTime();

    var secondsDiff = parseInt(timeLapsed / 1000 );
    var minutesDiff = parseInt(secondsDiff / 60);
    var hourDiff = parseInt(minutesDiff / 60 );

    if(secondsDiff >= 60) {
        secondsDiff %= 60;
        if(minutesDiff >= 60)
            minutesDiff %= 60;
    }
    if(minutesDiff === 0)
        return secondsDiff + " seconds";
    else if (hourDiff === 0)
        return minutesDiff + " minutes";
    else if (hourDiff < 24)
        return hourDiff +" hours";
    else
        return parseInt(hourDiff/24) + " days";
}
function addtoFav(container){
    return ()=>{
        container.favorite = !container.favorite;
        console.log(container.favorite)
        var arr = getFromLocalStorage();
        arr.forEach((data) => {
            if(data.id == container.id){
                data.favorite = container.favorite;
            }
        });
        localStorage.setItem('data',JSON.stringify(arr));
    }
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
    return ()=>{
        var res = {
            name: pickName.value,
            comment: pickComment.value,
            id: new Date().getUTCMilliseconds(),
            upvote: 0,
            downvote: 0
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
                var up = document.createElement('button');
                var down = document.createElement('button');
                r.setAttribute('id','box');
                r.setAttribute('key',coms.id);
                up.setAttribute('class','dispupvote');
                down.setAttribute('class','dispdownvote');
                head.innerHTML = coms.name;
                body.innerHTML = coms.comment;
                up.innerHTML =  coms.upvote ;
                down.innerHTML = coms.downvote ;
                r.appendChild(head)
                r.appendChild(body)
                r.appendChild(up)
                r.appendChild(down)
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
