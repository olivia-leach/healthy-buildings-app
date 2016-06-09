import Ember from 'ember';

// $('body').attr('background-image', "url('/images/backsplash.png')")

export default Ember.Route.extend({
  activate: function(){
        // Ember.$('body').toggleClass("landing");
        $('body').css('background', "url('images/backsplash.png') no-repeat center center fixed");
        $('body').css('background-size', 'cover');
        // $('#clip').css('background', "url('images/backsplash.png') no-repeat center center fixed");
        // $('#clip').css('background-size', 'cover');
        // $('#clip').css("background-attachment", "fixed");
        // $('#clip').css("-webkit-text-fill-color", "transparent");
        // $('#clip').css("-webkit-background-clip", "text");
        // $('#clip').css("font-size", "6em");
        // $('#clip').css("font-family", "'Source Sans Pro', sans-serif");
        // $('#clip').css("font-weight", "600");
        // $('#clip').css("text-align", "center");
        // $('#clip').css("padding", "10px 0");
        // $('#clip').css("line-height", "0.9em");
        // $('#clip').css("letter-spacing", "5px");
        Ember.$('body').append()
      },
  deactivate: function(){
        // Ember.$('body').toggleClass("landing");
        $('body').css('background-image', "none");
        Ember.$('body').toggleClass("rest");
      }
});
