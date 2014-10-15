// create namespace
var triangulate = triangulate || {};
triangulate.text = triangulate.text || {};

// bold text
triangulate.text.bold = {

	create:function(){
	
		document.execCommand("Bold", false, null);
		
	}
	
};

// undo text
triangulate.text.undo = {

	create:function(){
	
		document.execCommand("undo", false, null);
		
	}
	
};

// redo text
triangulate.text.redo = {

	create:function(){
	
		document.execCommand("redo", false, null);
		
	}
	
};

// italic text
triangulate.text.italic = {

	// creates bold text
	create:function(){

		document.execCommand("Italic", false, null);
		return false;
		
	}
	
};

// strikethrough text
triangulate.text.strike = {

	// creates bold text
	create:function(){

		document.execCommand("strikeThrough", false, null);
		return false;
		
	}
	
};

// underline text
triangulate.text.underline = {

	// creates bold text
	create:function(){

		document.execCommand("underline", false, null);
		return false;
		
	}
	
};

// subscript text
triangulate.text.subscript = {

	// creates bold text
	create:function(){

		document.execCommand("subscript", false, null);
		return false;
		
	}
	
};

// superscript text
triangulate.text.superscript = {

	// creates bold text
	create:function(){

		document.execCommand("superscript", false, null);
		return false;
		
	}
	
};

// increase font size
triangulate.text.increaseFont = {

	create:function(){
	
		var text = utilities.getSelectedText();
		var html = '<big>'+text+'</big>';
		
		document.execCommand("insertHTML", false, html);
	
		return false;
		
	}
	
};

// decrease font size
triangulate.text.decreaseFont = {

	create:function(){
	
		var text = utilities.getSelectedText();
		var html = '<small>'+text+'</small>';
		
		document.execCommand("insertHTML", false, html);
	
		return false;
		
	}
	
};

// align text left
triangulate.text.alignLeft = {

	// creates bold text
	create:function(){

		// get scope from page
		var scope = angular.element($("section.main")).scope();
		
		scope.$apply(function () {
			var cssClass = scope.node.cssclass;
			
			if(cssClass != undefined){
				cssClass = utilities.replaceAll(cssClass, 'text-center', '');
				cssClass = utilities.replaceAll(cssClass, 'text-left', '');
				cssClass = utilities.replaceAll(cssClass, 'text-right', '');
			}
			else{
				cssClass = '';
			}
		
			cssClass += ' text-left';
		
            scope.node.cssclass = $.trim(cssClass);
        });
        
		return false;
		
	}
	
};

// align text center
triangulate.text.alignCenter = {

	// creates bold text
	create:function(){

		// get scope from page
		var scope = angular.element($("section.main")).scope();
		
		scope.$apply(function () {
			var cssClass = scope.node.cssclass;
			
			if(cssClass != undefined){
				cssClass = utilities.replaceAll(cssClass, 'text-center', '');
				cssClass = utilities.replaceAll(cssClass, 'text-left', '');
				cssClass = utilities.replaceAll(cssClass, 'text-right', '');
			}
			else{
				cssClass = '';
			}
		
			cssClass += ' text-center';
		
            scope.node.cssclass = $.trim(cssClass);
        });
        
		return false;
		
	}
	
};

// align text right
triangulate.text.alignRight = {

	// creates bold text
	create:function(){

		// get scope from page
		var scope = angular.element($("section.main")).scope();
		
		scope.$apply(function () {
			var cssClass = scope.node.cssclass;
			
			if(cssClass != undefined){
				cssClass = utilities.replaceAll(cssClass, 'text-center', '');
				cssClass = utilities.replaceAll(cssClass, 'text-left', '');
				cssClass = utilities.replaceAll(cssClass, 'text-right', '');
			}
			else{
				cssClass = '';
			}
		
			cssClass += ' text-right';
		
            scope.node.cssclass = $.trim(cssClass);
        });
        
		return false;
		
	}
	
};

// adds a link
triangulate.text.link = {

	// saves selection
	selection: null,
	
	// initializes the plugin
	init:function(){
	
		// handle link dialog
		$(document).on('click', '#pageUrl li', function(){ 
			document.getElementById('existing').checked = true; 
			$('#pageUrl li').removeClass('selected');
			$(this).addClass('selected');

			var url = $(this).find('small').text();
			
			linkDialog.url = url;        
		});

		$(document).on('click', '#linkUrl', function(){ 
			document.getElementById('customUrl').checked = true;  
		});

		$(document).on('click', '#addLink', function(){ 
  
			var url = $('#linkUrl').val();
			
			var html = '';
			
			// external links should have http
			if(url.indexOf('http') == -1){
				html += '<a ui-sref="'+url+'" href="/'+url+'"';
			}
			else{
				html += '<a href="'+url+'"';
			}
			
			
			var cssClass = $('#linkCssClass').val().trim();
			var target = $('#linkTarget').val().trim();
			var title = $('#linkTitle').val().trim();
			
			// restore selection
			utilities.restoreSelection(triangulate.text.link.selection);

			// create link
			var text = utilities.getSelectedText();
			
			// insert css class into link
			if(cssClass != ''){
				html += ' class="'+cssClass+'"';
			}
			
			// insert target into link
			if(target != ''){
				html += ' target="'+target+'"';
			}
			
			// insert title into link
			if(title != ''){
				html += ' title="'+title+'"';
			}
			
			html += '>'+text+'</a>';
			
			// insert HTML
			document.execCommand('InsertHTML', false, html);

			$('#linkDialog').modal('hide');
		});
		
	},

	// creates link
	create:function(){

		triangulate.text.link.selection = utilities.saveSelection();

	    $('#linkUrl').val('');
	    $('#linkCssClass').val('');
	    $('#linkTarget').val('');
	    $('#linkTitle').val('');
	    $('#pageUrl li').removeClass('selected');
	    $('#existing').attr('checked','checked');
	    
	    // update pages
    	var scope = angular.element($("section.main")).scope();
		
		scope.retrievePages();
		scope.updateFiles();

		// show modal
		$('#linkDialog').modal('show');
		
		return false;
		
	}
	
};

triangulate.text.link.init();

// adds a code block around selected text
triangulate.text.code = {

	// creates bold text
	create:function(){
		
		var text = utilities.getSelectedText();
		var html = '<code>'+text+'</code>';
		
		document.execCommand("insertHTML", false, html);
	
		return false;
		
	}
	
};

// adds an icon
triangulate.text.icon = {

	// saves selection
	selection: null,
	
	// initializes the plugin
	init:function(){
	
		// select icon click
        $(document).on('click', '#selectIcon li', function(){ 
            $(this).parent().find('li').removeClass('selected');
            $(this).addClass('selected');
        });
        
        // add icon click
        $(document).on('click', '#iconDialog .primary-button', function(){
	        var icon = $('#selectIcon li.selected i').attr('class');
        
	        // restore selection
			utilities.restoreSelection(triangulate.text.icon.selection);
			
			// set icon
			var html = '<i class="'+icon+'">&nbsp;</i>';
		
			document.execCommand("insertHTML", false, html);
	
	        $('#iconDialog').modal('hide'); // show modal
        });
        
        
	},

	// creates the icon
	create:function(){
		
		triangulate.text.icon.selection = utilities.saveSelection();
    
	    $('#iconDialog').modal('show'); // show modal
	    
		return false;
		
	}
	
};

triangulate.text.icon.init();