import Ember from 'ember';
import RadialProgressChart from 'npm:radial-progress-chart';
import moment from 'moment';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('sensor', params.id);
  },
});

let color = d3.scale.category20();

export default Ember.Component.extend({

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
    let result = 0;
    for (let i = 0; i < measures.length; i++) {
      let score = measures[i].get('score');
      if (score !== 999) {
        result += measures[i].get('score')*0.03
      }
    }
    return result;
  }),

  transform: function(){
    return 'translate(' + this.get('width')/2 + ',' + this.get('height')/2 + ')';
  },

  draw: function() {
    let content = this.get('content');
    let baseline = this.get('baseline');

    let mainChart = new RadialProgressChart('.main-donut-chart', {
      diameter: 30,
      stroke: {
        width: 30
      },
      shadow: {
        width: 0
      },
      series: [{
        label: 'Humidity',
        value: content[4].get('humidity_score')*100
      }, {
        // labelStart: '\uF101',
        value: content[4].get('tc_score')*100
      }, {
        // labelStart: '\uF101',
        value: content[4].get('noise_score')*100
      }, {
        // labelStart: '\uF105',
        value: content[4].get('aer_score')*100
      }, {
        value: (
          content[4].get('aer_score')*0.07 +
          content[4].get('humidity_score')*0.01 +
          content[4].get('noise_score')*0.03 +
          content[4].get('tc_score')*0.07
        )*100/(18/100)
      }]
    });

    d3.select('.week').selectAll('li')
      .data(content).enter()
      .append('li').on('click', function(d) {
        // Update active class, date and main chart
        d3.selectAll('.circle').classed('active', false);
        d3.select(this).select('.circle').classed('active', true);
        d3.select('#date').text(getDate(d.get('day')));
        d3.select('.overall-score').text(Math.round(d.overall,2) + '%');
        mainChart.update(d.series);
      })
      .append('div').attr('class', 'circle').text(function(d) {
        console.log(d.get('day'));
        return getDate(d.get('day'));
      })
      .each(function(d, i) {
        d.date = getDate(i);
        d.overall = ((
          content[i].get('aer_score')*7 +
          content[i].get('humidity_score')*1 +
          content[i].get('noise_score')*3 +
          content[i].get('tc_score')*7 +
          baseline*45
        )/63)*100;
        console.log(baseline);
        // d.series = [getRandom(), getRandom(), getRandom()];
        d.series = [{
          value: content[i].get('humidity_score')*100
        }, {
          value: content[i].get('tc_score')*100
        }, {
          value: content[i].get('noise_score')*100
        }, {
          value: content[i].get('aer_score')*100
        }, {
          value: d.overall
        }];
        new RadialProgressChart(this.parentNode, {
          diameter: 10,
          shadow: {
            width: 0
          },
          stroke: {
            width: 6,
            gap: 1
          },
          series: d.series
        });
      });

    // Return chronological dates
    function getDate(i) {
      return moment().subtract(5-i, 'day').format('LL');
    }

  }.on('didInsertElement')
});
