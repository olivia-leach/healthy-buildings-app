import Ember from 'ember';

export default Ember.Component.extend({
  score: Ember.computed(function() {
    if (this.get('measure.score') === 999) {
      return 'N/A';
    } else {
      return (Math.round(this.get('measure.score')*100,0) + '%');
    }
  }),
});
