import Ember from 'ember';

let color = d3.scale.category20();

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: 'width height'.w(),
  content: Ember.computed(function() {
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
    let content = this.get('content'),
        width = this.get('width'),
        height = this.get('height'),
        radius = Math.min(width, height) / 2;

    let arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius-15);

    let pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.get('score'); });

    let svg = d3.select('#'+this.get('elementId')).select('g');

    let g = svg.selectAll('.arc')
       .data(pie(content)).enter()
      .append('g')
       .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .attr('transform', "translate(" + this.get('width')/2 + "," + this.get('height')/2 + ")")
      .attr("fill", function(d,i){ return color(i); })
      .attr('class', function(d, i) { return d.data.get('id'); });
  }.on('didInsertElement')
});
