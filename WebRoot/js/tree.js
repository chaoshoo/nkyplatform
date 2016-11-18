function getChildren(id) {
	var node = $('#' + id).tree('getSelected');
	if (node) {
		var children = $('#' + id).tree('getChildren', node.target);
	} else {
		var children = $('#' + id).tree('getChildren');
	}
	var s = '';
	for ( var i = 0; i < children.length; i++) {
		s += children[i].text + ',';
	}
	alert(s);
}

function getChecked(id) {
	var nodes = $('#' + id).tree('getChecked');
	var s = '';
	for ( var i = 0; i < nodes.length; i++) {
		if (s != '')
			s += ',';
		s += nodes[i].text;
	}
	alert(s);
}

function getSelected(id) {
	var node = $('#' + id).tree('getSelected');
	alert(node.text);
}

function collapse(id) {
	var node = $('#' + id).tree('getSelected');
	$('#' + id).tree('collapse', node.target);
}

function expand(id) {
	var node = $('#' + id).tree('getSelected');
	$('#' + id).tree('expand', node.target);
}

function collapseAll(id) {
	var node = $('#' + id).tree('getSelected');
	if (node) {
		$('#' + id).tree('collapseAll', node.target);
	} else {
		$('#' + id).tree('collapseAll');
	}
}

function expandAll(id) {
	var node = $('#' + id).tree('getSelected');
	if (node) {
		$('#' + id).tree('expandAll', node.target);
	} else {
		$('#' + id).tree('expandAll');
	}
}

function append(id) {
	var node = $('#' + id).tree('getSelected');
	$('#' + id).tree('append', {
		parent : (node ? node.target : null),
		data : [ {
			text : 'new1',
			checked : true
		}, {
			text : 'new2',
			state : 'closed',
			children : [ {
				text : 'subnew1'
			}, {
				text : 'subnew2'
			} ]
		} ]
	});
}

function remove(id) {
	var node = $('#' + id).tree('getSelected');
	$('#' + id).tree('remove', node.target);
}

function update(id) {
	var node = $('#' + id).tree('getSelected');
	if (node) {
		node.text = '<span style="font-weight:bold">new text<\/span>';
		node.iconCls = 'icon-save';
		$('#' + id).tree('update', node);
	}
}

function isLeaf(id) {
	var node = $('#' + id).tree('getSelected');
	return $('#' + id).tree('isLeaf', node.target);
}

function GetNode(type) {
	var node = $('#' + id).tree('getChecked');
	var chilenodes = '';
	var parantsnodes = '';
	var prevNode = '';
	for ( var i = 0; i < node.length; i++) {
		if ($('#' + id).tree('isLeaf', node[i].target)) {
			chilenodes += node[i].text + ',';
			var pnode = $('#' + id).tree('getParent', node[i].target);
			if (prevNode != pnode.text) {
				parantsnodes += pnode.text + ',';
				prevNode = pnode.text;
			}
		}
	}
	chilenodes = chilenodes.substring(0, chilenodes.length - 1);
	parantsnodes = parantsnodes.substring(0, parantsnodes.length - 1);
	if (type == 'child') {
		return chilenodes;
	} else {
		return parantsnodes;
	}
}

function getNodes() {
	alert(GetNode('fnode') + "," + GetNode('child'));
}

function doNode() {
	var c = "";
	var p = "";
	$(".tree-checkbox1").parent().children('.tree-title').each(function() {
		c += $(this).parent().attr('node-id') + ",";
	});
	$(".tree-checkbox2").parent().children('.tree-title').each(function() {
		p += $(this).parent().attr('node-id') + ",";
	});
	var str = (c + p);
	str = str.substring(0, str.length - 1);
	alert(str);
}