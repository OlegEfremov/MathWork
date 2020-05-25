var checkbox_values = {};

$(document).ready(function() {
    init_checkbox_values();
});

function init_checkbox_values(){
    read_checkbox_values();
    write_checkbox_counter();
}

function read_checkbox_values() {
    $.ajax({
        url: '../../read_checkbox_values',
        type: "POST",
        data: {},
        success: function(res) {
            checkbox_values = res
        },
        error: function(ts) {
            console.log(ts)
        }
    });
}

function write_checkbox_values() {
    var sendData = checkbox_values;
    sendData = JSON.stringify(sendData);

    $.ajax({
        url: '../../write_checkbox_values',
        type: "POST",
        data: {'checkbox_values': sendData},
        success: function(res) {
             write_checkbox_counter()
        },
        error: function(ts) {
            console.log(ts)
        }
    });

}

function write_checkbox_counter() {
    $.ajax({
        url: '../../count_checkboxes',
        type: "POST",
        data: {},
        success: function(res) {
            document.getElementById('checkbox_counter').innerHTML = res
        },
        error: function(ts) {
            console.log(ts)
        }
    });
}

function string_to_boolean(s){
    if (s==='false'){return false}
    if (s==='true'){return true}
}

function button_checkbox_sol(node) {
    //change icon on button
    change_node_icon(node);

    let sol_id = node.id.replace('checkbox_sol_','');

    let task_id = node.getAttribute('task');
    let task_node = document.getElementById('checkbox_task_' + task_id);

    //change state value
    if (node.value === 'false') {
        node.value = 'true'
    } else {
        node.value = 'false';
        if (!is_another_sol(sol_id)){set_node_state(task_node, false)}
    }

    if (!is_another_sol(sol_id)) {
        var el = document.getElementById('checkbox_all');
        if (node.value === 'false') {
            el.value = 'false';
            set_node_icon(el, false)
        }

        var el = document.getElementById('checkbox_page');
        if (node.value === 'false') {
            el.value = 'false';
            set_node_icon(el, false)
        }
    }


    //add state value to json
    checkbox_values[node.id] = string_to_boolean(node.value);
    write_checkbox_values();

    // set_task_state_by_solutions(task_id);
    set_task_checkbox_by_sols()
}


// Принять изменения в выбранной задаче (модерация)
function accept_changes_task(node){
    change_node_icon(node);

    let task_id = node.id.replace('accept_task_','');

    //change state value
    if (node.value === 'false'){node.value = 'true'}
    else {node.value = 'false'}

    $.ajax({
        type: 'POST',
        url: 'accept_changes',
        data: {
            'task_id': task_id,
        },
        dataType: 'json',
        success: function(data){
            var el = document.getElementById('accept_responce_'+task_id)
            if (node.value == 'true') {
                el.innerText = "Принято";
            }else{
                el.innerText = "Сброшено";
            }
        },
        error : function(error) {
            var el = document.getElementById('accept_responce_'+task_id)
            if (error.status == 200){
                if (node.value == 'true') {
                    el.innerText = "Принято";
                }else{
                    el.innerText = "Сброшено";
                }
            }else {
                el.innerText = "Ошибка";
                console.log(error)
            }
        }
    });
}




function button_checkbox_task(node) {
    change_node_icon(node);

    let task_id = node.id.replace('checkbox_task_','');

    //change state value
    if (node.value === 'false'){node.value = 'true'}
    else {node.value = 'false'}

    var el = document.getElementById('checkbox_all');
    if (node.value === 'false'){
        el.value = 'false';
        set_node_icon(el,false)

    }

    var el = document.getElementById('checkbox_page');
    if (node.value === 'false'){
        el.value = 'false';
        set_node_icon(el,false)
    }


    //add state value to json
    checkbox_values[node.id] = string_to_boolean(node.value);

    //select or deselect all needed solution checkbox
    page_tasks_needed_sols_json[task_id].forEach(
        function(item, i, arr) {
            var el = document.getElementById('checkbox_sol_'+item)
            el.value = node.value;
            checkbox_values['checkbox_sol_'+item] = string_to_boolean(node.value);
            write_checkbox_values();
            if (node.value === 'true'){
                set_node_icon(el, true)
                }
            else{
                set_node_icon(el, false)
            }
        });
    write_checkbox_values()
}

function button_checkbox_page(node) {
    change_node_icon(node);

    if (node.value === 'false'){node.value = 'true'}
    else {node.value = 'false'}

    //set state to checkbox_all
    let el = document.getElementById('checkbox_all');
    if (node.value === 'false'){
        el.value = 'false';
        set_node_icon(el, false)
    }

    for (let i in page_tasks){
        let task_id = page_tasks[i];
        let task_node = document.getElementById('checkbox_task_' + task_id);
        set_node_state(task_node, string_to_boolean(node.value));

        for (let ind in page_tasks_needed_sols_json[page_tasks[i]]){
            let sol_id = page_tasks_needed_sols_json[page_tasks[i]][ind];
            let sol_node = document.getElementById('checkbox_sol_' + sol_id);
            set_node_state(sol_node, string_to_boolean(node.value));

        }
    }
    write_checkbox_values()
}

function button_checkbox_all(node) {
    change_node_icon(node);

    if (node.value === 'false'){node.value = 'true'}
    else {node.value = 'false'}

    //set state to checkbox_page
    let el = document.getElementById('checkbox_page');
    if (node.value === 'false'){
        el.value = 'false';
        set_node_icon(el, false)
    }
    else {
        el.value = 'true';
        set_node_icon(el, true)
    }

    for (let i in all_tasks){
        let task_id = all_tasks[i];
        checkbox_values['checkbox_task_' + task_id] = string_to_boolean(node.value);
        // write_checkbox_values();

        for (let ind in all_tasks_needed_sols_json[all_tasks[i]]){
            let sol_id = all_tasks_needed_sols_json[all_tasks[i]][ind];
            checkbox_values['checkbox_sol_' + sol_id] = string_to_boolean(node.value);
            // write_checkbox_values();
        }
    }

    for (let i in page_tasks){
        let task_id = page_tasks[i];
        let task_node = document.getElementById('checkbox_task_' + task_id);
        set_node_state(task_node, string_to_boolean(node.value));

        for (let ind in page_tasks_needed_sols_json[page_tasks[i]]){
            let sol_id = page_tasks_needed_sols_json[page_tasks[i]][ind];
            let sol_node = document.getElementById('checkbox_sol_' + sol_id);
            set_node_state(sol_node, string_to_boolean(node.value));

        }
    }
    write_checkbox_values()
}

function change_node_icon(node){
    set_node_icon(node, !string_to_boolean(node.value))
}

function set_node_icon(node, state){
    var old_class='', new_class='';
    if (state){
        old_class='far';
        new_class='fas'

    } else{
        old_class='fas';
        new_class='far'
    }

    if ($(node).find('svg').length === 0){
        $(node).find('i').removeClass(old_class);
        $(node).find('i').addClass(new_class);
    }
    else {
        $(node).find('svg').removeClass(old_class);
        $(node).find('svg').addClass(new_class);
        }
}

function set_node_state(node, state){
    if (state) {
        node.value = 'true';
        set_node_icon(node, true)
        checkbox_values[node.id] = true;
        // write_checkbox_values()
    }
    else{
        node.value = 'false';
        set_node_icon(node, false)
        checkbox_values[node.id] = false;
        // write_checkbox_values()
    }
}

function is_another_sol(sol_id) {
    return another_sols.includes(sol_id)
}