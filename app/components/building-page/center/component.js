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
    let baseline = this.get('building.baseline');
    let certified = baseline.get('certified');
    console.log(certified);
    if (certified === false) {
      return 0.25;
    } else {
      let days = this.get('building.days').toArray();
      let day = days[0];
      return (day.get('baseline')/42);
    }
  }),

  overall: Ember.computed(function() {
    return Math.round(this.get('content').objectAt(0).get('overall_score')*10)/10
    // return Math.round(((
    //   this.get('content').objectAt(0).get('aer_score')*7 +
    //   this.get('content').objectAt(0).get('humidity_score')*1 +
    //   this.get('content').objectAt(0).get('noise_score')*3 +
    //   this.get('content').objectAt(0).get('tc_score')*7 +
    //   (this.get('baseline'))*42
    // ))*10)/10;
  })

});
