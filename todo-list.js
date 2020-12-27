const btnTodoCreate = document.querySelector(".todo-create");
const btnCreateCancle = document.querySelector(".modal-create-form .btn-cancle");
const btnCreateCreate = document.querySelector(".modal-create-form .btn-create");

const modalContainer = document.querySelector("#modal-detail");
const btnDetailDelete = modalContainer.querySelector(".btn-delete");
const btnDetailCancle = modalContainer.querySelector(".btn-cancle");

const todoListContainer = document.querySelector(".todo-list");
let idList =  JSON.parse(localStorage.getItem("idList"));

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
            importance = importanceList[i].value;
        }
    }
    const dueDate = document.getElementsByName("create-duedate")[0].value;
    const description = document.getElementsByName("create-description")[0].value;
    const now = new Date();
    const id = now.getTime();
    const todo = {
        id,
        importance,
        title,
        dueDate,
        description,
    };
    localStorage.setItem(id, JSON.stringify(todo));
    idList = localStorage.getItem("idList");
    if (idList === null){
        idList = [id];
        localStorage.setItem('idList', JSON.stringify(idList));
        printTodo(idList);
    } else {
        idList = JSON.parse(idList);
        idList.push(id);
        localStorage.setItem('idList', JSON.stringify(idList));
        printTodo([idList[idList.length-1]]);
    }
    console.log("To-Do create");
    cancleTodoCreate();
}

function printTodo(idList){
    idList.forEach(id => {
        const todo = JSON.parse(localStorage.getItem(id));
        const todoHTML = `<div class="todo" id=${todo.id}>\
                    <input type="checkbox" name="todo-check">\
                    <div class="importance" value=${todo.importance} style="display: none;"></div>\
                    <div class="todo-title">${todo.title}</div>\
                    <div class="todo-duedate" value="${todo.dueDate}" >due. ${todo.dueDate}</div>\
                    <div class="description" style="display: none;">${todo.description}</div>\
                    </div>`;
        todoListContainer.insertAdjacentHTML('beforeend', todoHTML);
        document.getElementById(String(id)).addEventListener("click", detailTodo);
    });
}

function detailTodo(event){
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
    let idList = JSON.parse(localStorage.getItem('idList'));
    const i = idList.indexOf(Number(todoId));
    
    todo.parentNode.removeChild(todo);
    localStorage.removeItem(todoId);
    idList = idList.slice(0, i).concat(idList.slice(i+1, idList.length));
    if(idList.length === 0){
        localStorage.removeItem('idList');
    } else{
        localStorage.setItem('idList', JSON.stringify(idList));
    }

    modalContainer.classList.add('hidden');
}

function init(){
    if (idList !== null){
        printTodo(idList);
    } 
    btnTodoCreate.addEventListener("click", clickTodoCreate);
    btnCreateCancle.addEventListener("click", cancleTodoCreate);
    btnCreateCreate.addEventListener("click", createTodo);
    btnDetailDelete.addEventListener("click", deleteTodo);
    btnDetailCancle.addEventListener("click", cancleTodoDetail);
}

init();