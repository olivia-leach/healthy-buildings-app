import Ember from 'ember';

// $('body').attr('background-image', "url('/images/backsplash.png')")

export default Ember.Route.extend({
  activate: function(){
        Ember.$('body').toggleClass("landing");
      },
  deactivate: function(){
        Ember.$('body').toggleClass("landing");
        Ember.$('body').toggleClass("rest");
      }
});
