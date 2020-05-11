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
                        "_disabled": function (data) {
                            var inst = $.jstree.reference(data.reference),
                                node = inst.get_node(data.reference);
                            if (node['a_attr']['dbType'] != 'MathAttribute'){return true}
                            return false
                        },
                        "label": "Добавить атрибут текущему фильтру",
                        "action": function (data) {
                            add_attr_to_task(data)
                        }
                    },
                    "show_tasks_in_filter": {
                        "separator_before": false,
                        "separator_after": false,
                        "_disabled": false,
                        "label": "Показать задачи, удовлетворяющие фильтру",
                        "action": function (data) {
                            show_tasks('1')
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

//Добавить атрибуты задаче
function add_attr_to_task(data){
	let	sel = $('#attr_tree').jstree(true).get_selected();
	if(!sel.length) { return false; }
	sel = sel[0];

	let nod = $('#attr_tree').jstree(true).get_node(sel)
	let newnode = {
		'type': 'MathAttr',
		'text': nod.text,
		'a_attr': { 'dbType': nod['a_attr']['dbType'], 'dbID' : nod['a_attr']['dbID'] }
	}

	$("#filter_tree").jstree().create_node('j3_1', newnode)
}
