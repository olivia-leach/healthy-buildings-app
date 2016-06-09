import Ember from 'ember';

// $('body').attr('background-image', "url('/images/backsplash.png')")

export default Ember.Route.extend({
  activate: function(){
        $('body').css('background', "url('images/backsplash.png') no-repeat center center fixed");
        $('body').css('background-size', 'cover');
        Ember.$('body').append()
      },
  deactivate: function(){
        $('body').css('background-image', "none");
      }
});
