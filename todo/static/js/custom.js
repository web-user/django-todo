jQuery(document).ready(function($){

    $(document).ready(function() {
        var max_fields      = 10; //maximum input boxes allowed
        var wrapper         = $(".input_fields_wrap"); //Fields wrapper
        var wrapper_project = $(".input_fields_wrap_project"); //Fields wrapper
        var add_button      = $(".add_field_button"); //Add button ID

        var content_project = $(".content-project");

        var add_button_project      = $(".add_field_project_button"); //Add button ID

        var x = 1; //initlal text box count
        $(add_button).click(function(e){ //on add input button click
            e.preventDefault();
            if(x < max_fields){ //max input box allowed
                x++; //text box increment
                $(wrapper).append('<div><input class="field-show" type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
            }
        });

        $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); x--;
        })





        $(add_button_project).click(function(e){ //on add input button click
            e.preventDefault();
            $(this).css('display', 'none');
            $(content_project).show(1000);
        });



        $(wrapper_project).on("click",".close-block", function(e){ //user click on remove text
            e.preventDefault();

            $(content_project).hide( 1000 );
            $(add_button_project).css('display', 'block');
        })

        $(wrapper_project).on("click",".button-add", function(e){ //user click on remove text
            e.preventDefault();

            $(content_project).hide( 1000 );

            $(add_button_project).css('display', 'block');
        })



	$(".button-add").click(function(e){
		e.preventDefault();

		var data_calor = $('#favcolor').val();

		var data_title = $('.project-title').val();

		var data_url = $("#form_project").attr('action');

		console.log(data_calor);

		$.ajax({
			type: "POST",
			url: data_url,
			data: {
				data_color : data_calor,
                data_title: data_title
			},
			success: function(res){
				console.log(res)
			},
			error: function(){
				console.log("Error !!!")
			}
		});

        console.log($(this).text());
	});

	console.log('test script')

















        var data;
/*----------Creating Slug------------|START-------*/
var slug = function(str) {
    var $slug = '';
    var trimmed = $.trim(str);
    $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
    replace(/-+/g, '-').
    replace(/^-|-$/g, '');
    return $slug.toLowerCase();
}
/*----------Creating Slug------------|END-------*/
/*-------Ace Editor----------|START--------*/
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/json");
/*-------Ace Editor----------|END--------*/
function createItem(obj) {
    var $obj = null;
    if (obj.name) {
        $obj = $('<a>').attr('href', obj.functionality).text(obj.name);
        $obj = $('<li>').append($obj);
        if (obj.children) {
            $obj.append(createItem(obj.children));
        }
    } else if (obj.length) {
        $obj = $('<ul>');
        for (var i = 0, l = obj.length; i < l; i++) {
            $obj.append(createItem(obj[i]));
        }
    }
    return $obj;
}
function menu(ul) {
    var li = $(ul).append('<li> <div class="child-wrap"> <div class="drag"><i class="fa fa-bars" aria-hidden="true"></i></div> <div class="toggle"><i class="fa fa-caret-down" aria-hidden="true"></i></div> <div class="input-menu-items"> <input type="text" class="cm-text-data" value="Hello" placeholder="text"> <input type="text" class="cm-text-function" value="Hello" placeholder="functionality"> </div> <div class="clone"><i class="fa fa-clone" aria-hidden="true"></i></div> <div class="delete"><i class="fa fa-trash-o" aria-hidden="true"></i></div> </div><ul class="sub-menu"></ul></li>');
}
var a = $('#sortable');
$(document).on('click', '.add', function() {
    menu(a);
});
$(document).on('click', '.clone', function() {
    var b = $(this).closest('.child-wrap').nextAll('.sub-menu');
    menu(b);
});
$(document).on('click', '.code,.menu-prev', function() {
    function FetchChild() {
        var data = [];
        $("#sortable > li").each(function() {
            data.push(buildJSON($(this)));
        });
        return data;
    }
    function buildJSON($li) {
        var subObj = {
            name: $li.find(".child-wrap .input-menu-items input.cm-text-data").val(),
            functionality: $li.find(".child-wrap .input-menu-items input.cm-text-function").val()
        };
        $li.children("ul").children().each(function() {
                if (!subObj.children) {
                    subObj.children = [];
                }
                subObj.children.push(buildJSON($(this)));
            });
        return subObj;
    }
    var obj = FetchChild();
    //$("[output]").html(JSON.stringify(obj, null, 2));
    editor.setValue(JSON.stringify(obj, null, 2));
    //$('menu').empty();
    data = createItem(obj);
    $('menu').html(data);
});
$(document).ready(function() {
    var drake = dragula($("#sortable").toArray(), {
        mirrorContainer: $("#sortable")[0]
    });
});
$(document).on("click", "#sortable div.toggle", function() {
    $(this).toggleClass("toggle-active");
    $(this).closest(".child-wrap").next("ul").toggle();
});
$(document).on("click", "#sortable div.delete", function() {
    $(this).closest("li").remove();
});
$(document).on("click", ".code", function() {
    $('body').toggleClass('code-view');
});
$(document).on("click", ".editor-wrapper h2 span", function() {
    $('body').removeClass('code-view');
});
$(document).on("click", ".menu-prev", function() {
    $('body').toggleClass('menu-view');
});
$(document).on("click", "close", function() {
    $('body').removeClass('menu-view');
});
$(document).on("click", function(e) {
    $('body').removeClass('code-view');
});
$(document).on("click", ".editor-wrapper,.nav-app-option", function(e) {
    e.stopPropagation();
});
$(".data-file-save").click(function() {
    setTimeout(function() {
        var websiteName = $('[name="website-name"]').val();
        var websiteURL = $('[name="website-url"]').val();
        var websiteHeader = $('[name="website-header"]').val();
        var MenuType = $('[name="menu-type"]').val();
        var websiteNameSlug = slug(websiteName);
        $('.cm-project-list ul').append('<li><a href="#' + websiteNameSlug + '"><i class="fa fa-cube" aria-hidden="true"></i>' + websiteName + '</a></li>');
        $('[href="#' + websiteName + '"]').parent('li').addClass('active-data').siblings().removeClass('active-data');
        $('[href="#' + websiteName + '"]').click(); //POC
    }, 1000);
});
/*---------Flex Modal---------*/
var getModalData;
$("[modal-click]").click(function() {
    getModalData = $(this).attr("modal-click");
    $('[modal-data="' + getModalData + '"]').addClass("modal-open");
    $(".modals-overlay").toggleClass("overlay-open");
    $('.cm-model-wrapper').addClass('model-wrap-open');
});
$(".modals-overlay,.cm-model-wrapper").click(function(e) {
    $('[modal-data="' + getModalData + '"]').removeClass("modal-open");
    $(".modals-overlay").removeClass("overlay-open");
    $('.cm-model-wrapper').removeClass('model-wrap-open');
});
$("[modal-data]").click(function(e) {
    e.stopPropagation();
});
$("[model-close]").click(function() {
    $(this).addClass('loading');
    setTimeout(function() {
        $('[modal-data="' + getModalData + '"]').removeClass("modal-open");
        $(".modals-overlay").removeClass("overlay-open");
        $('.cm-model-wrapper').removeClass('model-wrap-open');
        $('.btn-def').removeClass('loading');
        $('[modal-data] .cm-project-setting-inner-wrapper input, [modal-data] .cm-project-setting-inner-wrapper textarea').val("");
    }, 1000);
});
/*---------END Flex Modal---------*/
$(document).on('click', '.cm-project-list ul li', function() {
    $(this).addClass('active-data').siblings().removeClass('active-data');
});
$(document).ready(function() {
    var urlDecode = location.hash;
    $('[href="' + urlDecode + '"]').parent('li').addClass('active-data');
});
$('.advanced.setting-inner').click(function() {
    $(this).next('.cm-adv-form-wrapper').slideToggle();
    $(this).toggleClass('adv-open')
});
/*------------------Testing-----------------------*/
$('.editor-wrapper h2 span').click(function() {
    var JSONToDOM = JSON.parse(editor.getValue(), null, 2);
    function createDomww(obj) {
        var $obj = null;
        if (obj.name) {
            $obj = $('<li>').append('<div class="child-wrap"> <div class="drag"><i class="fa fa-bars" aria-hidden="true"></i></div> <div class="toggle"><i class="fa fa-caret-down" aria-hidden="true"></i></div> <div class="input-menu-items"> <input type="text" class="cm-text-data" value="' + obj.name + '" placeholder="text"> <input type="text" class="cm-text-function" value="' + obj.functionality + '" placeholder="functionality"> </div> <div class="clone"><i class="fa fa-clone" aria-hidden="true"></i></div> <div class="delete"><i class="fa fa-trash-o" aria-hidden="true"></i></div> </div><ul class="sub-menu"></ul>');
            if (obj.children) {
                $obj.append(createDomww(obj.children));
            }
        } else if (obj.length) {
            $obj = $('<ul class="sub-menu">');

            for (var i = 0, l = obj.length; i < l; i++) {
                $obj.append(createDomww(obj[i]));
            }
        }
        return $obj;
    }
    $('.cm-dynamic-data').empty();
    $('.cm-dynamic-data').append(createDomww(JSONToDOM));
	setTimeout(function(){
    	$('.cm-dynamic-data > ul').attr('id', 'sortable').removeAttr('class');
		 var drake = dragula($("#sortable").toArray(), {
        mirrorContainer: $("#sortable")[0]
    });
	},1);
});

















    });


















});