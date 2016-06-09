import Ember from 'ember';
import RadialProgressChart from 'npm:radial-progress-chart';

let color = d3.scale.category20();

export default Ember.Component.extend({
  content: Ember.computed(function() {
    let measures = this.get('building.measures').toArray();
    let results = [];
    for (let i = 0; i < measures.get('length'); i++) {
      if (measures[i].get('score') !== 999) {
        results.push(measures[i]);
      } else {
        measures[i].set('score', 0);
        results.push(measures[i]);
      }
    }
    return results;
  }),

  transform: function(){
    return 'translate(' + this.get('width')/2 + ',' + this.get('height')/2 + ')';
  },

  draw: function() {
    let content = this.get('content');

    let mainChart = new RadialProgressChart('.baseline-chart', {
      diameter: 40,
      stroke: {
        width: 15,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        labelStart: content[0].get('score.framework.name'),
        value: content[0].get('score')*100
      }]
    });

    let chart_data;

    d3.select('.measures').selectAll('li')
      .data(content).enter()
      .append('div').on('click', function(d) {
        d3.select('.baseline-label').text($('#baseline-info-' + d.get('id')).text());
        mainChart.update(d.series);
      }).attr('class', 'box')
      .each(function(d, i) {
        d.series = [content[i].get('score')*100];
        new RadialProgressChart('#measure-' + d.get('id'), {
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

  }.on('didInsertElement')
});
