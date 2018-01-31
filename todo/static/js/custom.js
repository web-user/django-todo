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

		var data_url = $("#form_project").attr('action');

		console.log(data_calor);

		$.ajax({
			type: "POST",
			url: data_url,
			data: {
				data_color : data_calor
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




    });


















});