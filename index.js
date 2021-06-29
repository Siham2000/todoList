const textInput= document.querySelector(".add-task  input")
const addBtn =document.querySelector(".add-task .plus")
const tasksContainer = document.querySelector(".tasks-content")
let taskCount =document.querySelector(".tasks-count span")
let taskCompleted =document.querySelector(".tasks-completed span" )


 

window.addEventListener("DOMContentLoaded" , getTodos)


window.addEventListener("load" , ()=>{
    textInput.focus();

    if(localStorage.length !== 0){
        let  noTaskMessageText=document.querySelector(".no-tasks-message")
        noTaskMessageText.remove();    
        
    }else{noTaskMessage()
    }
   
})



addBtn.addEventListener("click" , ()=>{
    if(textInput.value.trim() === ""){
        swal("can't add empty String Pleas tray again");
    
    } else{
       localSaved(textInput.value)
       let  noTaskMessageText=document.querySelector(".no-tasks-message")
        if(document.body.contains(document.querySelector(".no-tasks-message")) || (localStorage.length === 0)){
            noTaskMessageText.remove();    
                      }
        let mainSpan = document.createElement("span")
        mainSpan.classList.add("task-box")
        mainSpan.innerText = textInput.value
        let deleteBn = document.createElement("span")
        deleteBn.classList.add("delete")
        deleteBn.innerText= "Delete"
        textInput.value  = " "
        textInput.focus();
        mainSpan.append(deleteBn)
        tasksContainer.append(mainSpan)
        calculatTsks()

      

    }


    })
 
    


    





document.addEventListener("click" , (e)=>{
if(e.target.className == "delete"){
    remoceLocalTodos(e.target)

    e.target.parentNode.remove()
    if(tasksContainer.childElementCount === 0 ){
        noTaskMessage()
    }
    calculatTsks()

}


if(e.target.classList.contains("task-box")){
    e.target.classList.toggle("finished")
    if(e.target.classList.contains("finished")){
    swal("Good job!", "Nice work");
    }
    calculatTsks()
}



})


function noTaskMessage(){
    let messageSpan = document.createElement("span")
    messageSpan.innerText = "NO  task to show"
    messageSpan.classList.add("no-tasks-message")
    tasksContainer.append(messageSpan)

}


function calculatTsks(){

    taskCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length

    taskCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length


}





function localSaved(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
        
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    
   
    }
todos.push(todo)
localStorage.setItem("todos" , JSON.stringify(todos))


}



function getTodos(){
let todos ;
if(localStorage.getItem("todos") === null){
    todos = [];
    
}else{
    todos = JSON.parse(localStorage.getItem("todos"))
}

todos.forEach(todo =>{
    let mainSpan = document.createElement("span")
    mainSpan.classList.add("task-box")
    mainSpan.innerText = todo
    let deleteBn = document.createElement("span")
    deleteBn.classList.add("delete")
    deleteBn.innerText= "Delete"
     textInput.value= " "
    textInput.focus();
    calculatTsks()
    mainSpan.append(deleteBn)
    tasksContainer.append(mainSpan)

 
});
 return todos
}




function remoceLocalTodos(todo){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
        
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }


    const todoElement = todo.innerHTML;

    todos.splice(todos.indexOf(todoElement) , 1)
    localStorage.setItem("todos" , JSON.stringify(todos))
    
}