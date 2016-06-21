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

  details: Ember.computed(function() {
    let details = this.get('building.details').toArray();
    let results = [];
    for (let i = 0; i < details.get('length'); i++) {
      results.push(details[i]);
    }
    console.log(results);
    return results;
  }),

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
    let details = this.get('details');
    let baseline = this.get('baseline')*100;
    let humidity_score = content[0].get('humidity_score');
    let aer_score = content[0].get('aer_score');
    let noise_score = content[0].get('noise_score');
    let tc_score = content[0].get('tc_score');
    let enhanced_iaq = content[0].get('enhanced_iaq');
    let tc = content[0].get('tc');
    let iaq_perf = content[0].get('iaq_perf');
    let low_emit_air = content[0].get('low_emit_air');
    let iaq_assess = content[0].get('iaq_assess');
    let acoustic = content[0].get('acoustic');
    let low_emit_dirt = content[0].get('low_emit_dirt');
    let green_clean = content[0].get('green_clean');
    let ipm = content[0].get('ipm');
    let int_lighting = content[0].get('int_lighting');
    let daylight = content[0].get('daylight');
    let views = content[0].get('views');
    let mold = content[0].get('mold');
    let ets = content[0].get('ets');

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

    if (enhanced_iaq === 999) {
      enhanced_iaq = .25;
    }

    if (tc === 999) {
      tc = .25;
    }

    if (iaq_perf === 999) {
      iaq_perf = .25;
    }

    if (low_emit_air === 999) {
      low_emit_air = .25;
    }

    if (iaq_assess === 999) {
      iaq_assess = .25;
    }

    if (acoustic === 999) {
      acoustic = .25;
    }

    if (low_emit_dirt === 999) {
      low_emit_dirt = .25;
    }

    if (green_clean === 999) {
      green_clean = .25;
    }

    if (ipm === 999) {
      ipm = .25;
    }

    if (int_lighting === 999) {
      int_lighting = .25;
    }

    if (daylight === 999) {
      daylight = .25;
    }

    if (views === 999) {
      views = .25;
    }

    if (mold === 999) {
      mold = .25;
    }

    if (ets === 999) {
      ets = .25;
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

    let tip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    d3.select('svg g').selectAll('g').selectAll('path.bg')
      .on('mouseover', function(d) {
        d3.select(this).style("opacity", 0.4);
        // tip.transition().duration(200).style("opacity", .9);
        // tip.html('test')
        //         .style("left", (d3.event.pageX) + "px")
        //         .style("top", (d3.event.pageY - 28) + "px");
      })
      .on('mouseout', function(d) {
        d3.select(this).style("opacity", 0.2);
        // tip.transition().duration(100).style("opacity", 0);
      })
      .on('click', function(d) {
        console.log(day);
        $('#aerModal').modal('show');
        $('#modalContent').empty();
        let color = this.style.fill;
        if (color === "rgb(0, 122, 255)") {
          console.log("baseline clicked");
        } else if (color === "rgb(26, 213, 222)") {
          console.log("humidity clicked");
        } else if (color === "rgb(160, 255, 3)") {
          console.log("thermal comfort clicked");
        } else if (color === "rgb(233, 11, 58)") {
          console.log("noise clicked");
        } else if (color === "rgb(255, 149, 0)") {
          console.log("aer clicked");
          $('#myModalLabel').text('Air Exchange Rate');
          let aerChart = new RadialProgressChart('#modalContent', {
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
        } else if (color === "rgb(26, 150, 42)") {
          console.log("overall clicked");
        }
    });

    let day = 5;
    let startDate = content[4].get('date');

    d3.select('.week').selectAll('li')
      .data(content).enter()
      .append('li').on('click', function(d) {
        console.log(6-d.get('day'));
        // Update active class, date and main chart
        d3.selectAll('.circle').classed('active', false);
        d3.select(this).select('.circle').classed('active', true);
        let thisDate = moment(startDate).add(5-d.get('day'), 'days').format('LL');
        d3.select('#date').text(thisDate);
        // d3.select('#date').text(getDate(d.get('date')));
        d3.select('.overall-score').text((Math.round((d.overall)*10)/10).toFixed(1));
        mainChart.update(d.series);
        ventilation.update(d.ventilation);
        airQuality.update(d.airQuality);
        noise.update(d.noise);
        dirtAndDust.update(d.dirtAndDust);
        // pestControl.update(d.ipm);
        lightingAndViews.update(d.lightingAndViews);
        moisture.update(d.moisture);
        day = 6-d.day;
      })
      .append('div').attr('class', 'circle').text(function(d) {
        return moment(startDate).add(5-d.get('day'), 'days').format('LL');
        // return moment(d.date).format('LL');
      })
      .each(function(d, i) {
        d.overall = content[4-i].get('overall_score');
        let humidity_score = content[4-i].get('humidity_score');
        let aer_score = content[4-i].get('aer_score');
        let noise_score = content[4-i].get('noise_score');
        let tc_score = content[4-i].get('tc_score');
        let enhanced_iaq = content[4-i].get('enhanced_iaq');
        let tc = content[4-i].get('tc');
        let iaq_perf = content[4-i].get('iaq_perf');
        let low_emit_air = content[4-i].get('low_emit_air');
        let iaq_assess = content[4-i].get('iaq_assess');
        let acoustic = content[4-i].get('acoustic');
        let low_emit_dirt = content[4-i].get('low_emit_dirt');
        let green_clean = content[4-i].get('green_clean');
        let ipm = content[4-i].get('ipm');
        let int_lighting = content[4-i].get('int_lighting');
        let daylight = content[4-i].get('daylight');
        let views = content[4-i].get('views');
        let mold = content[4-i].get('mold');

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

        if (enhanced_iaq === 999) {
          enhanced_iaq = .25;
        }

        if (tc === 999) {
          tc = .25;
        }

        if (iaq_perf === 999) {
          iaq_perf = .25;
        }

        if (low_emit_air === 999) {
          low_emit_air = .25;
        }

        if (iaq_assess === 999) {
          iaq_assess = .25;
        }

        if (acoustic === 999) {
          acoustic = .25;
        }

        if (low_emit_dirt === 999) {
          low_emit_dirt = .25;
        }

        if (green_clean === 999) {
          green_clean = .25;
        }

        if (ipm === 999) {
          ipm = .25;
        }

        if (int_lighting === 999) {
          int_lighting = .25;
        }

        if (daylight === 999) {
          daylight = .25;
        }

        if (views === 999) {
          views = .25;
        }

        if (mold === 999) {
          mold = .25;
        }

        d.series = [{
          // value: content[i].get('humidity_score')*100
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

        d.ventilation = [{
          value: ((enhanced_iaq*3 + tc*3 + aer_score*7 + tc_score*7)/20)*100
        }];

        d.airQuality = [{
          value: ((iaq_perf*3 + low_emit_air*3 + iaq_assess*3)/9)*100
        }];

        d.noise = [{
          value: ((acoustic*3 + noise_score*3)/6)*100
        }];

        d.dirtAndDust = [{
          value: ((low_emit_dirt*1 + green_clean*2)/3)*100
        }];

        d.ipm = [{
          value: ((ipm*3)/3)*100
        }];

        d.lightingAndViews = [{
          value: ((int_lighting*3 + daylight*3 + views*3)/9)*100
        }];

        d.moisture = [{
          value: ((mold*3 + humidity_score*1)/4)*100
        }];

      });

    let foundationDiam = 50;
    let foundationWidth = 10;

    let ventilation = new RadialProgressChart('#ventilation', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 20;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((enhanced_iaq*3 + tc*3 + aer_score*7 + tc_score*7)/20)*100
      }]
    });

    let airQuality = new RadialProgressChart('#airQuality', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 9;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((iaq_perf*3 + low_emit_air*3 + iaq_assess*3)/9)*100
      }]
    });

    let noise = new RadialProgressChart('#noise', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 6;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((acoustic*3 + noise_score*3)/6)*100
      }]
    });

    let dirtAndDust = new RadialProgressChart('#dirtAndDust', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 3;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((low_emit_dirt*1 + green_clean*2)/3)*100
      }]
    });

    let pestControl = new RadialProgressChart('#pestControl', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 3;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((ipm*3)/3)*100
      }]
    });

    let water = new RadialProgressChart('#water', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 10;
        return  'NA';
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: 0
      }]
    });

    let lightingAndViews = new RadialProgressChart('#lightingAndViews', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 9;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((int_lighting*3 + daylight*3 + views*3)/9)*100
      }]
    });

    let moisture = new RadialProgressChart('#moisture', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 4;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((mold*3 + humidity_score*1)/4)*100
      }]
    });

    let smokingPolicy = new RadialProgressChart('#smokingPolicy', {
      diameter: foundationDiam,
      center: function(p) {
        let points = 3;
        return (Math.round((p*points)*10/100)/10) + '/' + points;
      },
      stroke: {
        width: foundationWidth,
        gap: 1
      },
      shadow: {
        width: 0
      },
      series: [{
        value: ((ets*3)/3)*100
      }]
    });

    // Return chronological dates
    function getDate(date) {
      return moment(date).format('LL');
    }

  }.on('didInsertElement')
});
