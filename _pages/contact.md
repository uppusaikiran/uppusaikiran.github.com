---
title: "Contact"
permalink: /contact/
layout: nofooter
---

<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link rel="stylesheet" type="text/css" href="../assets/css/contact.css">
</head>
<body>

<div class="contact-container">
    <div class="contact-info">
        <h2>Let's Connect</h2>
        <p class="contact-description">Have a question or want to collaborate? I'd love to hear from you. Fill out the form and I'll get back to you as soon as possible.</p>
        
        <div class="contact-methods">
            <div class="contact-method">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <h3>Location</h3>
                    <p>San Jose, California</p>
                </div>
            </div>
            
            <div class="contact-method">
                <i class="fas fa-envelope"></i>
                <div>
                    <h3>Email</h3>
                    <p>Contact via form →</p>
                </div>
            </div>
            
            <div class="contact-method">
                <i class="fas fa-clock"></i>
                <div>
                    <h3>Response Time</h3>
                    <p>Within 24-48 hours</p>
                </div>
            </div>
        </div>

        <div class="social-links">
            <a href="https://github.com/uppusaikiran" target="_blank" class="social-link">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/uppusaikiran" target="_blank" class="social-link">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/uppusaikiran" target="_blank" class="social-link">
                <i class="fab fa-twitter"></i>
            </a>
        </div>
    </div>

    <div class="contact-form">
        <form class="validate-form" action="https://formspree.io/xrnallqx" method="POST">
            <div class="form-group validate-input" data-validate="Name is required">
                <input type="text" name="name" id="name" required>
                <label for="name">Your Name</label>
                <span class="focus-border"></span>
            </div>

            <div class="form-group validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input type="email" name="email" id="_replyto" required>
                <label for="_replyto">Your Email</label>
                <span class="focus-border"></span>
            </div>

            <div class="form-group validate-input" data-validate="Subject is required">
                <input type="text" name="subject" required>
                <label for="subject">Subject</label>
                <span class="focus-border"></span>
            </div>

            <div class="form-group validate-input" data-validate="Message is required">
                <textarea name="message" id="message" required></textarea>
                <label for="message">Your Message</label>
                <span class="focus-border"></span>
            </div>

            <input type="hidden" name="_subject" value="Message via http://uppusaikiran.github.io">
            
            <button type="submit" class="submit-btn">
                Send Message
                <i class="fas fa-paper-plane"></i>
            </button>
        </form>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
(function ($) {
    "use strict";
    
    // Form validation
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');

    $('.validate-form').on('submit', function() {
        var check = true;

        if($(name).val().trim() == '') {
            showValidate(name);
            check = false;
        }

        if($(subject).val().trim() == '') {
            showValidate(subject);
            check = false;
        }

        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check = false;
        }

        if($(message).val().trim() == '') {
            showValidate(message);
            check = false;
        }

        return check;
    });

    $('.validate-form .form-group input, .validate-form .form-group textarea').each(function() {
        $(this).focus(function() {
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

    // Add active class to form groups when they have content
    $('.form-group input, .form-group textarea').on('input', function() {
        if($(this).val()) {
            $(this).parent().addClass('active');
        } else {
            $(this).parent().removeClass('active');
        }
    });
})(jQuery);
</script>

</body>


