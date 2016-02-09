function resizeItems() {
    resizeJumbotron();
    resizeTitle();
}


//function gets callback at startup (document.ready) and on window resize
function resizeJumbotron() {
    
    var minHeight = 650;
    var winHeight = $(window).height();
    
    //bound the min height of the jumbotron
    if(winHeight < minHeight) winHeight = minHeight;
    
    $('.jumbotron').css('height', winHeight);
    
    //init the marginTop variable with default value
    var marginTop =  240;
    
    //define custom breakpoints to handle margin-top
    if(winHeight < 660) {
        marginTop *= 0.3;
    } else if (winHeight < 850) {
        marginTop *= 0.7;
    }
    
    $('#picture').css('margin-top', marginTop);

    
}

function resizeTitle() {
    
    var winWidth = $(window).width();
    var breakpoint = 380;
    
    if(winWidth < breakpoint) {
    
        $('#myName').css('fontSize', "2.4em");
    }
    
    else $('#myName').css('fontSize', "3em");
    
}

//load JSON file and wraps <a> tags with href links
function loadJSON() {
    
    //GET JSON file
    $.getJSON( "scr/links.json", function(result) {

        var json = result;

        $('#SupaeroMap').wrap('<a ' + json.SupaeroMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Supaero').wrap('<a ' + json.Supaero +  ' target="_blank"' + ' class="margin-left-10"> </a>');
        $('#ConcordiaMap').wrap('<a ' + json.ConcordiaMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Concordia').wrap('<a ' + json.Concordia +  ' target="_blank"' + ' class="margin-left-10"> </a>');
        $('#UnipaMap').wrap('<a ' + json.UnipaMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Unipa').wrap('<a ' + json.Unipa +  ' target="_blank"' + ' class="margin-left-10"> </a>');
        $('#AeroconseilMap').wrap('<a ' + json.AeroconseilMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Aeroconseil').wrap('<a ' + json.Aeroconseil +  ' target="_blank"' + ' class="margin-left-10"> </a>');
        $('#AssystemMap').wrap('<a ' + json.AssystemMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Assystem').wrap('<a ' + json.Assystem +  ' target="_blank"' + ' class="margin-left-10"> </a>');
        $('#EnscoMap').wrap('<a ' + json.EnscoMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Ensco').wrap('<a ' + json.Ensco +  ' target="_blank"' + ' class="margin-left-10"> </a>');
        $('#MechtronixMap').wrap('<a ' + json.MechtronixMap +  ' target="_blank"' + ' class="pull-left margin-fix-map"> </a>');
        $('#Mechtronix').wrap('<a ' + json.Mechtronix +  ' target="_blank"' + ' class="margin-left-10"> </a>');
    });
    
}

//wrap the map icons with <a> tag with hrefs to map urls
$(document).ready(function(){
   
    //loads the weblinks from a JSON file
    loadJSON();
    
    //the jumbotron height will fill the entire window height
    resizeItems();
    $(window).on('resize', resizeItems);    

    
  
});

//function loads glyph and displays the solid and greyed images based on rating 
//list is used to identify the selected list
//textItem is appended in the list
//"li" nodes are created and appended in the list 
function rating(list, texItem, rating) {
    
    //create img array
    var img;
    //create list and nodes variables
    var list = document.getElementById(list);
    var node = document.createElement("li");
    var textNode = document.createTextNode(texItem);
    
    node.appendChild(textNode);
        
    //append the opaque (greyed) glyphs first (from the right) then the solid
    for(var i=0; i < 5; i++) {
        img = document.createElement("img");
        img.src = "img/glyphicons_343_thumbs_up.png";

        if(i < (5-rating)) img.style.opacity = 0.2;
        
        node.appendChild(img);

    }
    
    list.appendChild(node);
  

}

//ajax PHP success callback
function formResult(msg, results) {
    
    if(results === undefined) {
        PHPerror = false;
        PHPmsg = "";
    }
    else {
        PHPerror = results.error;
        PHPmsg   = results.msg;
    }
                   
   
    if(PHPerror || msg) {
        
        $("#myModalLabel").addClass("alert").addClass("alert-danger");
        
    } else {
        $("#myModalLabel").removeClass("alert-danger");
        $("#myModalLabel").addClass("alert").addClass("alert-success");
    }
    
    if(msg) {
        $("#myModalLabel").html(msg);
    } else {
        $("#myModalLabel").html(PHPmsg);
    }
}

//clear the form status top message
function clearFormStatus() {
    
    if($("#myModalLabel").hasClass("alert")) {
        
        $("#myModalLabel").removeClass("alert");
        
        if($("#myModalLabel").hasClass("alert-danger")) {
            $("#myModalLabel").removeClass("alert-danger");
        }
        else if($("#myModalLabel").hasClass("alert-success")) {
            $("#myModalLabel").removeClass("alert-success");
        }
    }
       
      
    $("#myModalLabel").html("Let's get in touch!");
}

//clear all the form fields
function clearFormFields(form) {
  $(form).find('input[type="text"],input[type="email"],textarea').val('');
};

//just a shortcut to clear both Form field and status bar message
function clearAll(form) {
    clearFormStatus();
    clearFormFields(form);
}

//loading status while the server side does his thing
function loadingStatus() {

    //get rid of previous messages
    clearFormStatus();
    
    //add the message with a pulsing spinner, thanks font awesome!
    $("#myModalLabel").html('Sending ' + '<i class="fa fa-spinner fa-pulse fa-lg"></i>');
}

//contact form submission with ajax call to process.php script to send email
$(document).ready(function () {

    //will get called on form submit
    $('#contact-form').submit(function(event) {
        var formData = {
            'name'              : $('input[id=name]').val(),
            'email'             : $('input[id=email]').val(),
            'message'           : $('textarea[id=message]').val()
        };
        
        //define the Form message in case of incomplete form status
        var incompleteFormMsg = "";
        
        if(!formData.name) {
            incompleteFormMsg ="Please enter your name";
            //errorJS = true;
        }
        if(!formData.email) {
            if(!formData.name){
                incompleteFormMsg +="<br />Please enter your email";
            } else {
                incompleteFormMsg +="Please enter your email";
            }
            //errorJS = true;
        }
        if(!formData.message) {
            if(formData.name && formData.email) {
                incompleteFormMsg +="Please enter your message";
            } else {
                incompleteFormMsg +="<br />Please enter your message";
            }
            //errorJS = true;
        }
        
        //if the form is incomplete
        if(incompleteFormMsg) {
            formResult(incompleteFormMsg);
        } else { //else we are processing PHP mail() on server side 
            loadingStatus();            
        }
        
        event.preventDefault();
        $.ajax({
            type: "post",
            url: "php/process.php?", 
            data: formData,
            dataType: "json",
            success: function(results){

                formResult(incompleteFormMsg, results);
                
            },
            error: function(){
                //alert("form post failed");
            }   
        });
    });
    
    //will get called on modal hide 
    $('#messageModal').on('hide.bs.modal', function () {
    
        //clear everything when the modal form gets hidden
        clearAll(this);
    
    });

    
 });

    
        
        