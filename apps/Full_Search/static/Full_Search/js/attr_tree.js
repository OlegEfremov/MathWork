//Добавить атрибуты задаче
function add_attr_to_task(data){

}

// Дерево всех атрибутов для формирования текущего фильтра
$(function () {
	$('#attr_tree').jstree({
		'plugins': ['dnd', 'types', 'contextmenu', "state"],
		'core': {
			'data': {
				"url": "attr_tree",
                'data' : function (node) {return { 'id' : node.id }},
				"dataType": "json"
			},
			'dblclick_toggle': false,
			'multiple': false,
			'expand_selected_onload': false,
			'check_callback': false,
			'themes':{'dots':false},
		},
		"contextmenu": {
            "items": {
                    "add_attr_to_task": {
                        "separator_before": false,
                        "separator_after": false,
                        "_disabled": false,
                        "label": "Добавить атрибут задаче",
                        "action": function (data) {
                            add_attr_to_task(data)
                        }
                    }
                }
            },
		"types": {
			"#": {
				"valid_children": ["AND"]
			},
			"EXCLUDE_leaf": {
				"icon": "jstree-folder",
				"valid_children": []
			},
			"FILTER_leaf": {
				"icon": "jstree-folder",
				"valid_children": []
			},
			"AND": {
				"icon": PATH_JSTREE_PIC + "folder.png",
				"valid_children": ['AND', 'FILTER_leaf']
			},
			"OR": {
				"icon": PATH_JSTREE_PIC + "folder.png",
				"valid_children": ['AND', 'FILTER_leaf']
			},
			"NOT-AND": {
				"icon": PATH_JSTREE_PIC + "folder.png",
				"valid_children": ['AND', 'FILTER_leaf']
			},
			"NOT-OR": {
				"icon": PATH_JSTREE_PIC + "folder.png",
				"valid_children": ['AND', 'FILTER_leaf']
			},
            "MathAttr" : {
				"icon" : PATH_JSTREE_PIC + "mathattr.png",
                // "icon": "jstree-file",
				"valid_children" : []
			},
			"SavedFilter": {
				"icon": PATH_JSTREE_PIC + "savedfilter.png",
				"valid_children": []
			}
		}
	});
});
