---
title: "Contact"
permalink: /contact/
layout: single
---

<!--
<form class="form" id="contactform" action="https://formspree.io/xrnallqx" method="POST">
 <fieldset class="field">
 <input class="input" type="text" name="name" placeholder="Name" id="name" required>
 <label class="label" for="name"><span class="label-content">Your name</span></label>
 </fieldset>
 <fieldset class="field">
 <input class="input" type="email" name="_replyto" placeholder="example@domain.com" id="_replyto" required>
 <label class="label" for="_replyto"><span class="label-content">Your email</span></label>
 </fieldset>
 <fieldset class="field">
 <textarea class="input" name="message" rows="1" placeholder="Message" id="message" required></textarea>
 <label class="label" for="message"><span class="label-content">Your message</span></label>
 </fieldset>
 <input class="hidden" type="text" name="_gotcha" style="display:none">
 <input class="hidden" type="hidden" name="_subject" value="Message via http://uppusaikiran.github.io">
 <fieldset class="field">
 <input class="button submit" type="submit" value="Send">
 </fieldset>
</form>
-->

<head>
<link rel="icon" type="image/png" href="../assets/images/favicon.ico"/>
<link rel="stylesheet" type="text/css" href="../assets/js/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../assets/js/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="../assets/js/animate.css">
<link rel="stylesheet" type="text/css" href="../assets/js/hamburgers.min.css">
<link rel="stylesheet" type="text/css" href="../assets/js/select2.min.css">
<link rel="stylesheet" type="text/css" href="../assets/css/util.css">
<link rel="stylesheet" type="text/css" href="../assets/css/contact.css">
</head>
<body>

	<div class="contact1">
		<div class="container-contact1">
			<div class="contact1-pic js-tilt" data-tilt>
				<img src="../assets/images/img-01.png" alt="IMG">
			</div>

			<form class="contact1-form validate-form" action="https://formspree.io/xrnallqx" method="POST">
				<span class="contact1-form-title">
					Get in touch
				</span>

				<div class="wrap-input1 validate-input" data-validate = "Name is required">
					<input class="input1" type="text" name="name" placeholder="Name" id="name" required>
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					<input class="input1" type="text" name="email" placeholder="Email" id="_replyto" required >
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Subject is required">
					<input class="input1" type="text" name="subject" placeholder="Subject">
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Message is required" >
					<textarea class="input1" name="message" placeholder="Message" id="message" required></textarea>
					<span class="shadow-input1"></span>
				</div>
				<input class="hidden" type="hidden" name="_subject" value="Message via http://uppusaikiran.github.io">
				<div class="container-contact1-form-btn">
					<button class="contact1-form-btn">
						<span>
							Send Email
							<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>





<script src="../assets/js/jquery-3.2.1.min.js"></script>

<script src="../assets/js/popper.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>

<script src="../assets/js/select2.min.js"></script>
<script src="../assets/js/tilt.jquery.min.js"></script>
<script >
$('.js-tilt').tilt({
	scale: 1.1
})
</script>

<script>
	(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(subject).val().trim() == ''){
            showValidate(subject);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
</script>

</body>


