import Ember from 'ember';
import moment from 'moment';

let color = d3.scale.category20();

export default Ember.Component.extend({

  results: Ember.computed(function() {
    let query = 'temp';
    let results = [];
    let measures = this.get('points').toArray();
    results.push(query);
    for (let i = 0; i < measures.length; i++) {
      results.push(measures[i].get(query));
    };
    return results;
  }),

  dates: Ember.computed(function() {
    let results = [];
    let dates = this.get('points').toArray();
    results.push('x');
    for (let i = 0; i < dates.length; i++) {
      results.push(dates[i].get('datetime'));
    }
    return results;
  }),

  init: function() {
    this._super.apply(this, arguments);
    var self = this;
  },

  data: Ember.computed(function () {
    return (
      { x: 'x',
        columns: [
          this.get('dates'),
          //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
          this.get('results')
          // ['data1', 30, 200, 100, 400, 150, 250],
          // ['data2', 130, 340, 200, 500, 250, 350]
        ]
      })
    }),

  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d'
      }
    }
  }

  // data: Ember.computed(function() {
  //
  //   let query = 'temp';
  //   let result = [];
  //   let measures = this.get('points').toArray();
  //   for (let i = 0; i < measures.length; i++) {
  //     result.push({
  //       'time': d3.time.format('%Y-%m-%d').parse(measures[i].get('datetime')),
  //       'label': query,
  //       'value': measures[i].get(query),
  //       // 'type': number
  //     })
  //   }
  //   return result;
  //   console.log(result);
  // }),
  //
  // timeSeriesBarContent: [
  //   {
  //     time: d3.time.format('%Y-%m-%d').parse("2013-05-15"),
  //     label: "Financial analytics software",
  //     value: 49668,
  //     type: "money"
  //   }, {
  //     time: d3.time.format('%Y-%m-%d').parse("2013-06-15"),
  //     label: "Financial analytics software",
  //     value: 68344,
  //     type: "money"
  //   }, {
  //     time: d3.time.format('%Y-%m-%d').parse("2013-07-16"),
  //     label: "Financial analytics software",
  //     value: 60654,
  //     type: "money"
  //   }, {
  //     time: d3.time.format('%Y-%m-%d').parse("2013-08-16"),
  //     label: "Financial analytics software",
  //     value: 48240,
  //     type: "money"
  //   }, {
  //     time: d3.time.format('%Y-%m-%d').parse("2013-09-16"),
  //     label: "Financial analytics software",
  //     value: 62074,
  //     type: "money"
  //   }
  // ],

  // tagName: 'svg',
  // attributeBindings: 'width height'.w(),
  // content: Ember.computed(function() {
  //   let measures = this.get('points').toArray();
  //   let results = measures;
  //   return results;
  //   // console.log(results);
  // }),
  //
  // transform: function(){
  //   return 'translate(' + this.get('width')/2 + ',' + this.get('height')/2 + ')';
  // },
  //
  // draw: function() {
  //   let content = this.get('timeSeriesBarContent'),
  //       width = this.get('width'),
  //       height = this.get('height'),
  //       radius = Math.min(width, height) / 2;
  //
  //   let arc = d3.svg.arc()
  //       .outerRadius(radius)
  //       .innerRadius(radius-15);
  //
  //   let pie = d3.layout.pie()
  //       .sort(null)
  //       .value(function(d) { return d.get('temp'); });
  //
  //   let svg = d3.select('#'+this.get('elementId')).select('g');
  //
  //   let g = svg.selectAll('.arc')
  //      .data(pie(content)).enter()
  //     .append('g')
  //      .attr('class', 'arc');
  //
  //   g.append('path')
  //     .attr('d', arc)
  //     .attr('transform', "translate(" + this.get('width')/2 + "," + this.get('height')/2 + ")")
  //     .attr("fill", function(d,i){ return color(i); })
  //     .attr('class', function(d, i) { return d.data.get('id'); });
  // }.on('didInsertElement')
});
