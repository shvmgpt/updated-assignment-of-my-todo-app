var StatusENUMS = {

    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "Learn Javascript", status: StatusENUMS.ACTIVE},
    2 : {title : "Git Tutorial", status: StatusENUMS.ACTIVE},
    3 : {title : "Interactive Git", status: StatusENUMS.ACTIVE},
}

var next_todo_id = 4;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}

