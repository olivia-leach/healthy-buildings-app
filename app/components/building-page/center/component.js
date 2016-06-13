import Ember from 'ember';

export default Ember.Component.extend({
  numsensors: Ember.computed(function() {
      return (this.get('building.sensors.length'));
  }),

  todaysDate: Ember.computed(function() {
    return moment().format('LL');
  }),

  content: Ember.computed(function() {
    let days = this.get('building.days').toArray();
    let results = [];
    for (let i = 0; i < days.get('length'); i++) {
        results.push(days[i]);
    }
    return results;
  }),

  baseline: Ember.computed(function() {
    let measures = this.get('building.measures').toArray();
    console.log(measures);
    let result = 0;
    for (let i = 0; i < measures.length; i++) {
      let score = measures[i].get('score');
      if (score === 999) {
        score = 0.25;
      }
      console.log(score);
      if (i === 6) {
        result += measures[i].get('score')*0.01;
      } else if (i === 7) {
        result += measures[i].get('score')*0.02;
      } else {
        result += measures[i].get('score')*0.03;
      }
    }
    console.log(result);
    result = (result/.42);
    console.log(result);
    return result;
  }),

  overall: Ember.computed(function() {
    return Math.round(((
      this.get('content').objectAt(4).get('aer_score')*7 +
      this.get('content').objectAt(4).get('humidity_score')*1 +
      this.get('content').objectAt(4).get('noise_score')*3 +
      this.get('content').objectAt(4).get('tc_score')*7 +
      (this.get('baseline')/100)*42
    )),2);
  })

});
