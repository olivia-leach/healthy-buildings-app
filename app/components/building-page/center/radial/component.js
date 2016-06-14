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
    let baseline = this.get('baseline')*100;
    let humidity_score = content[0].get('humidity_score');
    let aer_score = content[0].get('aer_score');
    let noise_score = content[0].get('noise_score');
    let tc_score = content[0].get('tc_score');

    if (humidity_score === 999) {
      humidity_score = .25;
    }

    if (aer_score === 999) {
      aer_score = .25;
    }

    if (noise_score === 999) {
      noise_score = .25;
    }

    if (tc_score === 999) {
      tc_score = .25;
    }

    let mainChart = new RadialProgressChart('.main-donut-chart', {
      diameter: 50,
      stroke: {
        width: 25
      },
      shadow: {
        width: 0
      },
      series: [{
        value: humidity_score*100
      }, {
        // labelStart: '\uF101',
        value: tc_score*100
      }, {
        // labelStart: '\uF101',
        value: noise_score*100
      }, {
        // labelStart: '\uF105',
        value: aer_score*100
      },{
        value: baseline
      },{
        // value: overall_start*100
        value: (content[0].get('overall_score')/60)*100,
        // value: (this.get('overall')/60)*100,
        color: ['#1a962a', '#1a962a']
      }]
    });

    d3.select('.week').selectAll('li')
      .data(content).enter()
      .append('li').on('click', function(d) {
        // Update active class, date and main chart
        d3.selectAll('.circle').classed('active', false);
        d3.select(this).select('.circle').classed('active', true);
        d3.select('#date').text(getDate(d.get('day')));
        d3.select('.overall-score').text((Math.round((d.overall)*10)/10).toFixed(1));
        mainChart.update(d.series);
      })
      .append('div').attr('class', 'circle').text(function(d) {
        return getDate(d.get('day'));
      })
      .each(function(d, i) {
        d.date = getDate(i);
        d.overall = content[4-i].get('overall_score');
        let humidity_score = content[4-i].get('humidity_score');
        let aer_score = content[4-i].get('aer_score');
        let noise_score = content[4-i].get('noise_score');
        let tc_score = content[4-i].get('tc_score');

        if (content[4-i].get('humidity_score') === 999) {
          humidity_score = .25;
        }

        if (content[4-i].get('aer_score') === 999) {
          aer_score = .25;
        }

        if (content[4-i].get('noise_score') === 999) {
          noise_score = .25;
        }

        if (content[4-i].get('tc_score') === 999) {
          tc_score = .25;
        }

        d.series = [{
          // value: content[4-i].get('humidity_score')*100
          value: humidity_score*100
        }, {
          value: tc_score*100
        }, {
          value: noise_score*100
        }, {
          value: aer_score*100
        },{
          value: baseline
        }, {
          value: (d.overall/60)*100,
          // value: d.overall,
          color: ['#1a962a', '#1a962a']
        }];
        new RadialProgressChart(this.parentNode, {
          diameter: 10,
          shadow: {
            width: 0
          },
          stroke: {
            width: 5,
            gap: 1
          },
          series: d.series
        });
      });

    // Return chronological dates
    function getDate(i) {
      return moment().subtract(i-1, 'day').format('LL');
    }

  }.on('didInsertElement')
});
