import Ember from 'ember';

export default Ember.Component.extend({
  baseline: Ember.computed(function() {
    let measures = this.get('building.measures').toArray();
    let result = 0;
    for (let i = 0; i < measures.length; i++) {
      let score = measures[i].get('score');
      if (score !== 999) {
        result += measures[i].get('score')*0.03
      }
    }
    result = (result/.45)*100;
    return result;
  }),
});
