const todoInput=document.querySelector(".input");
const todoButton=document.querySelector(".inputButtonPlus");
const todoFilter=document.querySelector(".selectFilter");
const todoUl=document.querySelector(".newWorkUl")
document.addEventListener("DOMContentLoaded",getTodos);

todoButton.addEventListener("click",addTodo);
todoButton.addEventListener("keypress",checkPress);
todoUl.addEventListener("click",deleteCompleteTodo);
todoFilter.addEventListener("click",filterWorks)

function checkPress(event)
{
    if(event.target==='Enter')
    {
        addTodo();
    }
}

function addTodo(event)
{
    event.preventDefault();

    const inputValue=todoInput.value;
    
    const newDiv=document.createElement("div");
    newDiv.classList.add("newWorkDiv");

    const newLi=document.createElement("li");
    newLi.classList.add("newWorkLi");
    newLi.innerText=inputValue;
    saveToLocalStorage(todoInput.value)
    todoInput.value="";
    
    const completeButton=document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML="<i class='fas fa-check'></i>";

    const trashButton=document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML="<i class='fas fa-trash'></i>";

    newDiv.appendChild(newLi);
    newDiv.appendChild(completeButton);
    newDiv.appendChild(trashButton);
    todoUl.appendChild(newDiv);

}

function deleteCompleteTodo(event)
{
    
    const clicked=event.target;
    const workDiv=clicked.parentElement;;
    if(clicked.classList[0]==="complete-btn")
    {
        
        workDiv.classList.toggle("complete");

    }
    else if(clicked.classList[0]==="trash-btn")
    {
        removeFromLocalStorage(workDiv)
        workDiv.remove();

    }

}

function saveToLocalStorage(newWork)
{
    let works;
    if(localStorage.getItem("works")===null)
    {
        works=[];
    }
    else
    {
        works=JSON.parse(localStorage.getItem("works"));
    }
    works.push(newWork);
    localStorage.setItem("works",JSON.stringify(works));

}
function removeFromLocalStorage(work)
{
    let works;
    if(localStorage.getItem("works")===null)
    {
        works=[];
    }
    else
    {
        works=JSON.parse(localStorage.getItem("works"));
    }
    const workIndex=work.classList[0];
    works.splice(works.indexOf(workIndex),1);
    localStorage.setItem("works",JSON.stringify(works));
}

function filterWorks(event)
{
    const filter=event.target.value;
    const works=todoUl.childNodes;
    
    works.forEach(function(todo)
    {
       switch(filter)
       {
           case ("all"):
               todo.style.display="flex"
               break;
            case ("completed"):
                if(todo.classList.contains("complete"))
                {
                    todo.style.display="flex";
                }
                else
                {
                    todo.style.display="none";
                }
                break;
            case "Uncompleted" :
                if(todo.classList.contains("complete"))
                {
                    todo.style.display="none";
                }
                else
                {
                    todo.style.display="flex";
                }
                break;

       }
       

    })
}

function getTodos(event)
{
    let works;
    if(localStorage.getItem("works")===null)
    {
        works=[];
    }
    else
    {
        works=JSON.parse(localStorage.getItem("works"));
    }
    works.forEach(function(todo){
        console.log(todo);
        const newDiv=document.createElement("div");
        newDiv.classList.add("newWorkDiv");

        const newLi=document.createElement("li");
        newLi.classList.add("newWorkLi");
        newLi.innerText=todo;

        const completeButton=document.createElement("button");
        completeButton.classList.add("complete-btn");
        completeButton.innerHTML="<i class='fas fa-check'></i>";

        const trashButton=document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML="<i class='fas fa-trash'></i>";

        newDiv.appendChild(newLi);
        newDiv.appendChild(completeButton);
        newDiv.appendChild(trashButton);

        todoUl.appendChild(newDiv);
    })
}