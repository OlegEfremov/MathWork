function get_array_of_folder_dbid(){
    var a=[];
    var all_inputs = $(':input[type="number"]');
    for (var i=0; i<all_inputs.length; i++){
        a.push(all_inputs[i].id.replace('number_of_task_from_folder_',''))
    }
    return a;
}