function todoCreateClick(){
    console.log("todo-create click");
    const modalCreate = document.getElementById("modal-create");
    modalCreate.style.display = "block";
    modalCreate.querySelector(".modal-create-form").style.display = "block";
}

function todoCreateCancle(){
    const modalCreate = document.getElementById("modal-create");
    modalCreate.style.display = "none";
    modalCreate.querySelector(".modal-create-form").style.display = "none";

}

function todoCreateCreate(){
    const todoList = document.querySelector(".todo-list");
    const title = document.getElementsByName("create-title")[0].value;
    const importanceList = document.getElementsByName("create-importance");
    let importance = "1";
    for(let i=0; i < importanceList.length; i++){
        if(importanceList[i].checked){
            importance = importanceList[i].value
        }
    }
    const dueDate = document.getElementsByName("create-duedate")[0].value;
    const description = document.getElementsByName("create-description")[0].value;
    const todo =    `<div class="todo">\
                        <input type="checkbox" name="todo-check">\
                        <div class="todo-title">${title}</div>\
                        <div name="importance" value=${importance} style="display: none;"></div>\
                        <div class="todo-duedate">due. ${dueDate}</div>\
                        <div name="description" style="display: none;">${description}</div>\
                    </div>`
    todoList.insertAdjacentHTML('beforeend', todo);
    todoCreateCancle()
}

const todoCreate = document.querySelector(".todo-create");
const modalCancle = document.querySelector(".modal-create-form .btn-cancle");
const modalCreate = document.querySelector(".modal-create-form .btn-create");

todoCreate.addEventListener("click", todoCreateClick);
modalCancle.addEventListener("click", todoCreateCancle);
modalCreate.addEventListener("click", todoCreateCreate);
