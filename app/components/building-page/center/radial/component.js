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

  transform: function(){
    return 'translate(' + this.get('width')/2 + ',' + this.get('height')/2 + ')';
  },

  draw: function() {
    let content = this.get('content');

    let mainChart = new RadialProgressChart('.main-donut-chart', {
      diameter: 30,
      stroke: {
        width: 30
      },
      series: [{
        label: 'Humidity',
        value: content[0].get('humidity_score')*100
      }, {
        // labelStart: '\uF101',
        value: content[0].get('tc_score')*100
      }, {
        // labelStart: '\uF101',
        value: content[0].get('noise_score')*100
      }, {
        // labelStart: '\uF105',
        value: content[0].get('aer_score')*100
      }, {
        value: (
          content[0].get('aer_score')*0.07 +
          content[0].get('humidity_score')*0.01 +
          content[0].get('noise_score')*0.03 +
          content[0].get('tc_score')*0.07
        )*100/(18/100)
      }]
    });

    d3.select('.week').selectAll('li')
      .data(content).enter()
      .append('li').on('click', function(d) {
        // Update active class, date and main chart
        d3.selectAll('.circle').classed('active', false);
        d3.select(this).select('.circle').classed('active', true);
        d3.select('.date').text(d.date);
        mainChart.update(d.series);
      })
      .append('div').attr('class', 'circle').text(function(d) {
        console.log(d.get('day'));
        return getDate(d.get('day'));
      })
      .each(function(d, i) {
        d.date = getDate(i);
        d.series = [getRandom(), getRandom(), getRandom()];
        new RadialProgressChart(this.parentNode, {
          diameter: 10,
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

    // Random int between 20-80
    function getRandom() {
      return Math.round(Math.random() * 60) + 20;
    }

    // Select monday by default
    document.querySelector('li').click();

  }.on('didInsertElement')
});
