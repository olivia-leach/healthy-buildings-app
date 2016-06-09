import Ember from 'ember';
import moment from 'moment';

let color = d3.scale.category20();

export default Ember.Component.extend({

  results: Ember.computed(function() {
    // let query = this.get('query');
    let results = [];
    let measures = this.get('points').toArray();
    results.push(this.get('query'));
    for (let i = measures.length-100; i < measures.length; i++) {
      results.push(measures[i].get(this.get('query')));
    };
    return results;
  }),

  dates: Ember.computed(function() {
    let results = [];
    let dates = this.get('points').toArray();
    results.push('x');
    for (let i = dates.length-100; i < dates.length; i++) {
      results.push(dates[i].get('datetime'));
    }
    return results;
  }),

  init: function() {
    this._super.apply(this, arguments);
    var self = this;
    // console.log('test');
    // console.log($('#drop-down option:selected').text());

    Ember.run.later(function() {
      self.get('data.columns').push(
        ['data3', 400, 500, 450, 700, 600, 500]
      );
      self.notifyPropertyChange('data');
    }, 1000);

  },

  updateChart: function() {
    // console.log('testing');
    let results = Ember.computed(function() {
      let query = this.get('query');
      let results = [];
      let measures = this.get('points').toArray();
      results.push(query);
      for (let i = measure.length-50; i < measures.length; i++) {
        results.push(measures[i].get(query));
      };
      return results;
    });
    console.log(results);
    this.set('data', Ember.computed(function () {
      return (
        { x: 'x',
          columns: [
            this.get('dates'),
            results
          ],
          // type: 'scatter'
        })
      }));
    console.log(this.get('data'))
  },

  data: Ember.computed(function () {
    return (
      { x: 'x',
        columns: [
          this.get('dates'),
          this.get('results')
        ],
        color: this.get('color'),
        type: 'spline'
      })
    }),

  axis: Ember.computed(function () {
    let label = this.get('label');
    return (
      {
        x: {
          type: 'timeseries',
          tick: {
            fit: false
            // format: '%YYYY-%m-%dd'
          }
        },
        y: {
                label: label
            }
    }
  )}),

  measures: ['temp', 'humidity', 'co2'],

  actions: {
    selectVehicle(query) {
      console.log(query);
      this.set('query', query);
      this.updateChart();
    }
  }

});
