const btnTodoCreate = document.querySelector(".todo-create");
const btnCreateCancle = document.querySelector(".modal-create-form .btn-cancle");
const btnCreateCreate = document.querySelector(".modal-create-form .btn-create");

const modalContainer = document.querySelector("#modal-detail");
const btnDetailDelete = modalContainer.querySelector(".btn-delete");
const btnDetailCancle = modalContainer.querySelector(".btn-cancle");

const todoListContainer = document.querySelector(".todo-list");

function clickTodoCreate(){
    console.log("todo-create click");
    const createModal = document.getElementById("modal-create");
    createModal.classList.remove("hidden");
}

function cancleTodoCreate(){
    const createModal = document.getElementById("modal-create");
    createModal.classList.add("hidden");
}

function createTodo(){
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
    const id = new Date()
    const todo = `<div class="todo" id=${id.getTime()}>\
                    <input type="checkbox" name="todo-check">\
                    <div class="importance" value=${importance} style="display: none;"></div>\
                    <div class="todo-title">${title}</div>\
                    <div class="todo-duedate" value="${dueDate}" >due. ${dueDate}</div>\
                    <div class="description" style="display: none;">${description}</div>\
                </div>`
                   
    todoListContainer.insertAdjacentHTML('beforeend', todo);
    document.getElementById(String(id.getTime())).addEventListener("click", printTodo);
    console.log("To-Do create");
    cancleTodoCreate();
}

function printTodo(event){
    const todo = event.currentTarget;
    console.log(todo);
    const title = todo.querySelector(".todo-title").textContent;
    const importance = todo.querySelector(".importance").getAttribute('value');
    const duedate = todo.querySelector(".todo-duedate").getAttribute('value');
    const description = todo.querySelector(".description").textContent;
    modalContainer.querySelector("form").id = todo.id;
    modalContainer.querySelector("input[name='detail-title']").value = title;
    modalContainer.querySelectorAll("input[name='detail-importance']")[3-importance].checked = true;
    modalContainer.querySelector("input[name='detail-duedate']").value = duedate;
    modalContainer.querySelector("input[name='detail-description']").value = description;
    modalContainer.classList.remove('hidden');
}

function cancleTodoDetail(){
    const detailModal = document.getElementById("modal-detail");
    detailModal.classList.add("hidden");
}

function deleteTodo(){
    const todoId = document.querySelector(".modal-detail-form").id;
    const todo = document.getElementById(todoId);
    todo.parentNode.removeChild(todo);
    modalContainer.classList.add('hidden');
}

function init(){
    btnTodoCreate.addEventListener("click", clickTodoCreate);
    btnCreateCancle.addEventListener("click", cancleTodoCreate);
    btnCreateCreate.addEventListener("click", createTodo);
    btnDetailDelete.addEventListener("click", deleteTodo);
    btnDetailCancle.addEventListener("click", cancleTodoDetail);
}

init();