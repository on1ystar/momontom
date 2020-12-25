function clickTodoCreate(){
    console.log("todo-create click");
    const createModal = document.getElementById("modal-create");
    createModal.classList.remove("hidden");
}

function cancleTodoCreate(){
    const createModal = document.getElementById("modal-create");
    createModal.classList.add("hidden");
}

function createTodoCreate(){
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
                        <div class="importance" value=${importance} style="display: none;"></div>\
                        <div class="todo-title">${title}</div>\
                        <div class="todo-duedate">due. ${dueDate}</div>\
                        <div class="description" style="display: none;">${description}</div>\
                    </div>`
                   
    todoList.insertAdjacentHTML('beforeend', todo);
    cancleTodoCreate()
}

const btnTodoCreate = document.querySelector(".todo-create");
const btnCancleModal = document.querySelector(".modal-create-form .btn-cancle");
const btnCreateModal = document.querySelector(".modal-create-form .btn-create");

btnTodoCreate.addEventListener("click", clickTodoCreate);
btnCancleModal.addEventListener("click", cancleTodoCreate);
btnCreateModal.addEventListener("click", createTodoCreate);
