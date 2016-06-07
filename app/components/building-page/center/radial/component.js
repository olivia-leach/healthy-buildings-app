import Ember from 'ember';
import RadialProgressChart from 'npm:radial-progress-chart';

let color = d3.scale.category20();

export default Ember.Component.extend({
  // tagName: 'svg',
  // attributeBindings: 'width height'.w(),
  // fontSize: 10,
  content: Ember.computed(function() {
    console.log(this.get('building.measures').toArray());
    let measures = this.get('building.measures').toArray();
    let results = [];
    for (let i = 0; i < measures.get('length'); i++) {
      if (measures[i].get('score') !== 999) {
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
      diameter: 20,
      series: [{
        labelStart: '\uF106',
        value: content[0].get('score')*100
      }, {
        labelStart: '\uF101',
        value: 50
      }, {
        labelStart: '\uF105',
        value: 50
      }]
    });

    d3.select('.week').selectAll('li')
      .data(data).enter()
      .append('li').on('click', function(d) {
        // Update active class, date and main chart
        d3.selectAll('.circle').classed('active', false);
        d3.select(this).select('.circle').classed('active', true);
        d3.select('.date').text(d.date);
        mainChart.update(d.series);
      })
      .append('div').attr('class', 'circle').text(function(d) {
        return d.day;
      })
      .each(function(d, i) {
        d.date = dateFormatter(getDate(i));
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

    // Return some chronological dates
    function getDate(i) {
      var date = new Date('2015-06-16');
      date.setDate(date.getDate() + i);
      return date;
    }

    // Random int between 20-80
    function getRandom() {
      return Math.round(Math.random() * 60) + 20;
    }

    // Select monday by default
    document.querySelector('li').click();

  }.on('didInsertElement')
});
