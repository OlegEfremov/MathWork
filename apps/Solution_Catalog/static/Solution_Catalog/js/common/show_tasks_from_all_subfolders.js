function show_tasks_from_all_subfolders(){
	    let vf_dbID = action_data['view_folder'];
	    checkbox_values={};
	    // document.getElementById('checkbox_counter').innerHTML = count_checkboxes();
	    checkbox_values = {};
	    show_tasks(vf_dbID, '1', 'show_tasks');
	    //if user change view_folder we need to reset checkbox_values to null because of remove_action
	    // enable_disable_start_massive_action_button()
    }