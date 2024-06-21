//Target the inputtext class
const inputtext=document.querySelector(".input-text input"),
headings=document.querySelectorAll(".headings span"),
clearAll=document.querySelector(".clear-button"),
taskbbox=document.querySelector(".task-box");

let editId;
let isEditedtask =false;
 //getting localstorage todo list
 let todos=JSON.parse(localStorage.getItem("todo-list"));


 headings.forEach(btn => {
    btn.addEventListener("click",() => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showtodo(btn.id);

    });
 });

 function showtodo(heading) {
    let li="";
   if(todos) {
    todos.forEach((todo , id) =>{
        let iscompleted=todo.status == "completed" ? "checked" : "";
        if(heading == todo.status || heading == "all"){
         li  +=`<li class="task">
        <label for="${id}">
          <input onclick="updatestatus(this)" type="checkbox" id="${id}" ${iscompleted}>
          <p class="${iscompleted}">${todo.name}</p>
        </label>
        <div class="settings">
                 <i onclick="showmenu(this)" class="fa-solid fa-ellipsis"></i>
                 <ul class="task-menu">
                     <li onclick="edittask(${id},'${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                     <li onclick="deletetask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                 </ul>
        </div>
       </li> `;
    }
    });
   }
   //if li is not empty,insert this value inside the task box or insert span
    taskbbox.innerHTML=li || `<span>You don't have any task </span>`;
        
 }
 showtodo("all");


 //function for the icon show and click the window object to hide it
 function showmenu(selectedtask) {
    // getting task menu div
    let taskMenu = selectedtask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",e=>{
        if(e.target.tagName != "I" || e.target != selectedtask) {
            taskMenu.classList.remove("show");
            }
    })
 
}


function edittask(taskid, taskname){
    editId = taskid;
    isEditedtask = true;
    inputtext.value = taskname;
}



//function for deletetask
 function deletetask(deleteid){
    //remove the selected task from todo
    todos.splice(deleteid,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showtodo("all");
}

clearAll.addEventListener("click",()=>{
     //remove all items  from todos
     todos.splice(0,todos.length);
     localStorage.setItem("todo-list",JSON.stringify(todos));
     showtodo("all");
})


 //function for updating the status on datas
 function updatestatus(selectedtask){
    //get the paragraph that contains task name
    let taskname=selectedtask.parentElement.lastElementChild;
    if(selectedtask.checked){
        taskname.classList.add("checked");
        todos[selectedtask.id].status
        = "completed";
    }
    else{
        taskname.classList.remove("checked");
        todos[selectedtask.id].status
        = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
    

 }

inputtext.addEventListener("keyup", e => {
    let usertask=inputtext.value.trim();
    if(e.key == "Enter" && usertask){
        if(!isEditedtask) { //if iseditedtask isn't true
         //todos is not exist,pass an empty array
        if(!todos){
            todos=[];
        }
        let taskinfo= {name: usertask, status: "pending"};
        todos.push(taskinfo);//new task to todos
     } else{
        isEditedtask =false;
        todos[editId].name =  usertask;
     }
       
        inputtext.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showtodo("all");


    }
    
})
