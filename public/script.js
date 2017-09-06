const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";


window.onload = getTodosAJAX();

var TODO,flag =false;
var xhr,data;
var hide_flag1 = false;
var hide_flag2 = false;

function Hide() {
    var outer = document.getElementById("outer-completed-todos");
    var change = document.getElementById("complete-visibility");
    var temp =document.getElementById("completed-todos");
    if(!hide_flag1){
        change.innerText ="Show Completed Items";
        temp.style.display = "none";
        hide_flag1 = true;
    }
    else {
        change.innerText ="Hide Completed Items";
        temp.style.display = "block";
        hide_flag1 = false;
    }
}

function Hide2() {
    var outer = document.getElementById("outer-deleted-todos");
    var change = document.getElementById("delete-visibility");
    var temp =document.getElementById("deleted-todos");
    if(!hide_flag2){
        change.innerText ="Show Deleted Items";
        temp.style.display = "none";
        hide_flag2 = true;
    }
    else {
        change.innerText ="Hide Deleted Items";
        temp.style.display = "block";
        hide_flag2 = false;
    }
}

function add_todo_elements(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);
    TODO = todos;
    var parent = document.getElementById(id);
    var completed_element = document.getElementById("completed-todos");
    var deleted_element = document.getElementById("deleted-todos");
    parent.innerHTML = "";
    completed_element.innerHTML = "";
    deleted_element.innerHTML = "";
    if (parent){
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key,todos[key]);
                if(todos[key].status == "ACTIVE") {
                    parent.appendChild(todo_element);
                }
                else if(todos[key].status == "COMPLETE"){

                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.setAttribute("style", "float:left;");
                    checkbox.setAttribute("checked","");
                    checkbox.setAttribute("onchange", "activeTodoAJAX(" + key +  ")");
                    checkbox.setAttribute("class", "breathHorizontal");
                    todo_element.appendChild(checkbox);

                    var temp = todo_element.firstChild;
                    temp.setAttribute("class","complete");

                    todo_element.insertBefore(checkbox,todo_element.firstChild);
                    completed_element.appendChild(todo_element);
                }
                else{
                    todo_element.firstChild.setAttribute("class","delete");
                    todo_element.lastChild.setAttribute("class","remove");
                    todo_element.appendChild(document.createElement("br"));

                    deleted_element.appendChild(todo_element);
                }
            }
        )
    }
}

function createTodoElement(id, todo_object) {

    var todo_element = document.createElement("div");
    todo_element.setAttribute("id","delete" +id);
    todo_element.setAttribute("class", "todoStatus" + todo_object.status+ " " + "breathVertical");

    if(todo_object.status =="ACTIVE"){
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("onclick", "completeTodoAJAX(" + id +  ")");
        checkbox.setAttribute("style", "float:left");
        checkbox.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(checkbox);
    }

    var new_element = document.createElement("div");
    new_element.innerText = todo_object.title;

    new_element.setAttribute("style","float : left; margin-left : 10px");
    todo_element.appendChild(new_element);


    if(todo_object.status !="DELETE"){
        var delete_button = document.createElement("i");
        delete_button.setAttribute("class","fa fa-times");
        delete_button.setAttribute("aria-hidden","true");
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
        delete_button.setAttribute("style","color:red; margin-left: 10px");
        todo_element.appendChild(delete_button);
    }


    return todo_element;
}

function getTodosAJAX(){

    xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE){

            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
        }
    }
    xhr.send(data=null);

}

function addTodoAJAX() {

    var title =document.getElementById(NEW_TODO_INPUT_ID);
    var title = title.value;

    xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {

            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);

}

function completeTodoAJAX(id) {
    xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {

            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function deleteTodoAJAX(id) {

    xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    data = "todo_status=DELETE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {

            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}


function activeTodoAJAX(id) {
    xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/active/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    data = "todo_status=ACTIVE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {

            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}