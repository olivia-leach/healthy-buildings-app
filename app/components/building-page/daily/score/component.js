import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  formattedDate: Ember.computed(function() {
    return moment().subtract(5-this.get('day.day'), 'day').format('LL');
  }),
  score: Ember.computed(function() {
    // let measures = this.get('day.building.measures');
    // let baseline = 0;
    // for (let i = 0; i < this.get('day.building.measures.length'); i++) {
    //   console.log(measures.objectAt(i).get('framework'));
    //   // let measureWeight = measureScore.get('framework.weight');
    //   // console.log(measureWeight);
    //   // console.log(measures.objectAt(i).get('score'));
    //   // baseline += measures.objectAt(i).get('score')*measures.objectAt(i).get('score.framework.weight');
    //   // console.log(baseline);
    // }
      return (
        (this.get('day.aer_score') * 0.07 +
        this.get('day.tc_score') * 0.07 +
        this.get('day.noise_score') * 0.03 +
        this.get('day.humidity_score') * 0.01)/0.18*100
      );
  }),
  scorelabel: Ember.computed(function() {
    return (Math.round(this.get('score')) + '%');
  })
});
