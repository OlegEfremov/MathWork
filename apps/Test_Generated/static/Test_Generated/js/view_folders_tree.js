var view_folder = [];

$(function () {
	$('#folders_tree_for_test').jstree({
		'plugins': [ 'dnd', 'types', 'state'],
		'core': {
			'data': {
				"url": "get_user_tree",
				"dataType": "json"
			},
			'dblclick_toggle': false,
			'multiple': false,
			'expand_selected_onload': true,
			'check_callback': true,
            'themes':{'dots': false},
		},
		"contextmenu": {
            "items": {
                    "rename": {
                        "separator_before": false,
                        "separator_after": false,
                        "_disabled": function (data) {
                        	let inst = $.jstree.reference(data.reference),
                            node = inst.get_node(data.reference);

                            if (node['a_attr']['system_name']==='ROOT_CATALOG'){return true}

								return false
						},
                        "label": "Rename",
                        "action": function (data) {
                            let inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            inst.edit(obj);
                        }
                    },
                    //delete item from database
                    "remove": {
                        "separator_before": false,
                        "icon": false,
                        "separator_after": false,
                        "_disabled": function (data) {
                        	let inst = $.jstree.reference(data.reference),
                            node = inst.get_node(data.reference);

                            if (node['a_attr']['system_name']==='ROOT_CATALOG'){return true}

								return false
						},
                        "label": "Delete",
                        "action": function (data) {
                            let inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            if (inst.is_selected(obj)) {
                                inst.delete_node(inst.get_selected());
                            }
                            else {
                                inst.delete_node(obj);
                            }
                        }
                    },
                    "cut": {
                        "separator_before": true,
                        "separator_after": false,
                        "label": "Cut",
                        "_disabled": function (data) {
                            let inst = $.jstree.reference(data.reference),
                            node = inst.get_node(data.reference);

                            if (node['a_attr']['system_name']==='ROOT_CATALOG'){return true}

								return false
                        },
                        "action": function (data) {
                            let inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            if (inst.is_selected(obj)) {
                                inst.cut(inst.get_top_selected());
                            }
                            else {
                                inst.cut(obj);
                            }
                        }
                    },
                    "copy": {
                        "separator_before": false,
                        "icon": false,
                        "separator_after": false,
                        "label": "Copy",
						"_disabled": function (data) {
                            let inst = $.jstree.reference(data.reference),
                            node = inst.get_node(data.reference);

                            if (node['a_attr']['system_name']==='ROOT_CATALOG'){return true}

							return false
                        },
                        "action": function (data) {
                            let inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            if (inst.is_selected(obj)) {
                                inst.copy(inst.get_top_selected());
                            }
                            else {
                                inst.copy(obj);
                            }
                        }
                    },
                    "paste": {
                        "separator_before": false,
                        "icon": false,
                        "_disabled": function (data) {
                            return !$.jstree.reference(data.reference).can_paste();
                        },
                        "separator_after": false,
                        "label": "Paste",
                        "action": function (data) {
                            let inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            inst.paste(obj);
                        }
                    }
                }
            },
		"types": {
			"#": {
				"valid_children": [],
			},
			"Folder": {
				"icon": PATH_JSTREE_PIC + "folder.png",
				"valid_children": ['Folder']
			}
		}
	}).bind('select_node.jstree', function (e, data) {
	    let vf_dbID = data['node']['a_attr']['dbID'];
	    let vf_Name = data['node']['text'];
	    view_folder['dbID'] = vf_dbID;
	    view_folder['Name'] = vf_Name;

  	}).bind('copy_node.jstree', function (e, data) {

    }).bind('move_node.jstree', function (e, data) {

  	}).bind('delete_node.jstree', function (e, data) {

  	}).bind('refresh.jstree', function (e, data) {

  	});
});