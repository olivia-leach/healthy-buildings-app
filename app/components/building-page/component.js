import Ember from 'ember';

export default Ember.Component.extend({
  baselineScore: Ember.computed(function() {
    let measures = this.get('building.measures');
    let baseline = 0;
    let measure;
    let weight;
    let score;
    for (let i = 0; i < measures.get('length'); i++) {
      measure = measures.objectAt(i);
      score = measure.get('score');
      measure.get('framework')
        .then((result) => {
          weight = result.get('weight');
          baseline += score*weight;
        })
        .then(() => {
          return baseline;
        });
    }
  })
});
