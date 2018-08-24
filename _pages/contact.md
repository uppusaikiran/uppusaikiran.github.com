---
title: "Contact"
permalink: /contact/
layout: default
---

<form class="form" id="contactform" action="//formspree.io/saikiran@netskope.com" method="POST">
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
 <input class="hidden" type="hidden" name="_subject" value="Message via http://domain.com">
 <fieldset class="field">
 <input class="button submit" type="submit" value="Send">
 </fieldset>
</form>
