function collect_folders_and_numbers(){
    var folders_dbID_list = get_array_of_folder_dbid();
    var array_of_inputs_values = get_array_of_inputs_values();
    var folder_and_numbers = "";

    for (var i=0; i<array_of_inputs_values.length; i++){
       folder_and_numbers += folders_dbID_list[i]+","+array_of_inputs_values[i]+"@";
    }
    folder_and_numbers = folder_and_numbers.substr(0,folder_and_numbers.length-1);
    document.getElementById("id_folders_and_numbers").value = folder_and_numbers;

    return true;
}