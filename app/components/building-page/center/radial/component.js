import Ember from 'ember';
import RadialProgressChart from 'npm:radial-progress-chart';
import moment from 'moment';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('sensor', params.id);
  },
});

let color = d3.scale.category20();

let popUpChart;
let day;
let chosenColor;
let sensors;
let sensors_array;

export default Ember.Component.extend({

  keyDown(event) {
    if ($('#detailsModal').is(':visible')) {
      if (event.keyCode === 37 || event.keyCode === 40) {
        $('#leftArrow').trigger('click');
      } else if (event.keyCode === 39 || event.keyCode === 38) {
        $('#rightArrow').trigger('click');
      }
    }
  },

  actions: {
    changed() {
      let details = this.get('details');

      let timeline = $('.slider-value');
      let value = timeline.slider('getValue');

      this.set('chosenDate', value);
      $('.week li:nth-child(' + value + ')').trigger('click');

      let timelineDay = this.get('chosenDate');
      day = parseInt(timelineDay, 10);
      $('.timeline-labels li').removeClass('selected-date');
      $('.timeline-labels li:nth-child(' + value + ')').addClass('selected-date');

      this.drawModalChart(chosenColor, day, details);
    },

    leftArrow() {
      let details = this.get('details');

      let timeline = $('.slider-value');
      let value = timeline.slider('getValue');
      timeline.slider('setValue', value-1, true, true);
      value = timeline.slider('getValue');

      $('.week li:nth-child(' + value + ')').trigger('click');

      $('#leftArrow').removeClass('end-of-line');
      $('#rightArrow').removeClass('end-of-line');

      if (value === 1) {
        $('#leftArrow').addClass('end-of-line');
      }

      this.drawModalChart(chosenColor, value, details);
    },

    rightArrow() {
      let details = this.get('details');

      let timeline = $('.slider-value');
      let value = timeline.slider('getValue');
      timeline.slider('setValue', value+1, true, true);
      value = timeline.slider('getValue');

      $('.week li:nth-child(' + value + ')').trigger('click');
      $('.slider-track div:nth-child(' + (value + 3) + ')').trigger('click');

      $('#leftArrow').removeClass('end-of-line');
      $('#rightArrow').removeClass('end-of-line');

      if (value === 5) {
        $('#rightArrow').addClass('end-of-line');
      }

      this.drawModalChart(chosenColor, value, details);
    },

  },

  details: Ember.computed(function() {
    let details = this.get('building.details').toArray();
    let results = [];
    for (let i = 0; i < details.get('length'); i++) {
      results.push(details[i]);
    }
    return results;
  }),

  sensor_list: Ember.computed(function() {
    return this.get('building.sensors');
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

  chosenDate: Ember.computed(function() {
    let timeline = $('.slider-value');
    return timeline.slider('getValue');
  }),

  drawModalChart: function(chosenColor, day, details) {
    let today = [];
    let dataset = [];
    for (let i=0; i < details.length; i++) {
      if (details[i].get('day') === day) {
        today.push(details[i]);
      }
    }
    if (chosenColor === "rgb(0, 122, 255)") {
      console.log("baseline clicked");
      $('#myModalLabel').text('Baseline Score');
    } else if (chosenColor === "rgb(26, 213, 222)") {
      $('#myModalLabel').text('Humidity');
      let humidity;
      for (let i = 0; i < sensors_array.length; i++) {
        dataset[i] = {};
        dataset[i].labelStart = sensors_array[i].labelStart;
        dataset[i].value = 0;
        for (let j = 0; j < today.length; j++) {
          if (sensors_array[i].labelStart === today[j].get('pid')) {
            if (today[j].get('rh') === 999) {
              humidity = 0;
            } else if (today[j].get('rh') < 60) {
              humidity = 1;
            } else {
              humidity = 0;
            }
            dataset[i].value = humidity*100;
          }
        }
      }
    } else if (chosenColor === "rgb(160, 255, 3)") {
      console.log("thermal comfort clicked");
      $('#myModalLabel').text('Thermal Comfort');
    } else if (chosenColor === "rgb(233, 11, 58)") {
      $('#myModalLabel').text('Noise');
      let noise;
      for (let i = 0; i < sensors_array.length; i++) {
        dataset[i] = {};
        dataset[i].labelStart = sensors_array[i].labelStart;
        dataset[i].value = 0;
        for (let j = 0; j < today.length; j++) {
          if (sensors_array[i].labelStart === today[j].get('pid')) {
            if (today[j].get('noise') === 999) {
              noise = 0;
            } else if (today[j].get('noise') < 45) {
              noise = 1;
            } else {
              noise = 1 - (today[j].get('noise')-45)/20;
              if (noise < 0) {
                noise = 0;
              }
            }
            dataset[i].value = noise*100;
          }
        }
      }
    } else if (chosenColor === "rgb(255, 149, 0)") {
      $('#myModalLabel').text('Air Exchange Rate');
      let aer;
      for (let i = 0; i < sensors_array.length; i++) {
        dataset[i] = {};
        dataset[i].labelStart = sensors_array[i].labelStart;
        dataset[i].value = 0;
        for (let j = 0; j < today.length; j++) {
          if (sensors_array[i].labelStart === today[j].get('pid')) {
            if (today[j].get('aer') === 999) {
              aer = 0;
            } else if (today[j].get('aer') >= 1) {
              aer = 1;
            } else {
              aer = today[j].get('aer');
            }
            dataset[i].value = aer*100;
          }
        }
      }
    } else if (chosenColor === "rgb(26, 150, 42)") {
      console.log("overall clicked");
      $('#myModalLabel').text('Overall Score');
    }

    $('#rightArrow').removeClass('end-of-line');
    $('#leftArrow').removeClass('end-of-line');

    if (day === 5) {
      $('#rightArrow').addClass('end-of-line');
    } else if (day === 1) {
      $('#leftArrow').addClass('end-of-line');
    }

    popUpChart.update(dataset);
  },

  draw: function() {
    sensors = this.get('sensor_list').toArray();
    let drawModalChart = this.drawModalChart;
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
      humidity_score = 0.25;
    }

    if (aer_score === 999) {
      aer_score = 0.25;
    }

    if (noise_score === 999) {
      noise_score = 0.25;
    }

    if (tc_score === 999) {
      tc_score = 0.25;
    }

    if (enhanced_iaq === 999) {
      enhanced_iaq = 0.25;
    }

    if (tc === 999) {
      tc = 0.25;
    }

    if (iaq_perf === 999) {
      iaq_perf = 0.25;
    }

    if (low_emit_air === 999) {
      low_emit_air = 0.25;
    }

    if (iaq_assess === 999) {
      iaq_assess = 0.25;
    }

    if (acoustic === 999) {
      acoustic = 0.25;
    }

    if (low_emit_dirt === 999) {
      low_emit_dirt = 0.25;
    }

    if (green_clean === 999) {
      green_clean = 0.25;
    }

    if (ipm === 999) {
      ipm = 0.25;
    }

    if (int_lighting === 999) {
      int_lighting = 0.25;
    }

    if (daylight === 999) {
      daylight = 0.25;
    }

    if (views === 999) {
      views = 0.25;
    }

    if (mold === 999) {
      mold = 0.25;
    }

    if (ets === 999) {
      ets = 0.25;
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
        chosenColor = this.style.fill;

        // create array with the sensor ids
        sensors_array = [];
        for (let i = 0; i < sensors.length; i++) {
          sensors_array[i] = {};
          sensors_array[i].labelStart = sensors[i].get('pid');
          sensors_array[i].value = 50;
          sensors_array[i].color = chosenColor;
        }

        // set up blank modal radial chart with all of the sensors
        $('#modalContent').empty();
        popUpChart = new RadialProgressChart('#modalContent', {
          diameter: 30,
          animation: {
            // duration: 1,
            delay: 1
          },
          stroke: {
            width: 15,
            gap: 3
          },
          shadow: {
            width: 0
          },
          series: sensors_array
        });

        drawModalChart(chosenColor, day, details);
        $('#detailsModal').modal('show');
      });

    day = 5;
    let startDate = content[4].get('date');

    d3.select('.week').selectAll('li')
      .data(content).enter()
      .append('li').on('click', function(d) {
        // Update active class, date and main chart
        d3.selectAll('.circle').classed('active', false);
        d3.select(this).select('.circle').classed('active', true);
        let thisDate = moment(startDate).add(5-d.get('day'), 'days').format('LL');
        d3.select('#date').text(thisDate);
        d3.select('.overall-score').text((Math.round((d.overall)*10)/10).toFixed(1));
        mainChart.update(d.series);
        ventilation.update(d.ventilation);
        airQuality.update(d.airQuality);
        noise.update(d.noise);
        dirtAndDust.update(d.dirtAndDust);
        // pestControl.update(d.ipm);
        lightingAndViews.update(d.lightingAndViews);
        moisture.update(d.moisture);
        day = 6-d.get('day');
        let position = (day*25) - 25;
        let chosenDate = day.toString();

        let timeline = $('.slider-value');
        let value = timeline.slider('getValue');
        timeline.slider('setValue', day);

        $('#modalDate').text(thisDate);
        $('.timeline-labels li').removeClass('selected-date');
        if (chosenDate === "1") {
          $('#firstDate').toggleClass('selected-date');
        } else if (chosenDate === "2") {
          $('#secondDate').toggleClass('selected-date');
        } else if (chosenDate === "3") {
          $('#thirdDate').toggleClass('selected-date');
        } else if (chosenDate === "4") {
          $('#fourthDate').toggleClass('selected-date');
        } else if (chosenDate === "5") {
          $('#fifthDate').toggleClass('selected-date');
        }

      })
      .append('div').attr('class', 'circle').text(function(d) {
        let label = moment(startDate).add(5-d.get('day'), 'days').format('LL');
        let n = 6-d.get('day');
        $('.timeline-labels li:nth-child(' + n + ')').text(moment(moment(startDate).add(5-d.get('day'), 'days')).format('l'));
        $('#modalDate').text(label);
        return label;
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
          humidity_score = 0.25;
        }

        if (aer_score === 999) {
          aer_score = 0.25;
        }

        if (noise_score === 999) {
          noise_score = 0.25;
        }

        if (tc_score === 999) {
          tc_score = 0.25;
        }

        if (enhanced_iaq === 999) {
          enhanced_iaq = 0.25;
        }

        if (tc === 999) {
          tc = 0.25;
        }

        if (iaq_perf === 999) {
          iaq_perf = 0.25;
        }

        if (low_emit_air === 999) {
          low_emit_air = 0.25;
        }

        if (iaq_assess === 999) {
          iaq_assess = 0.25;
        }

        if (acoustic === 999) {
          acoustic = 0.25;
        }

        if (low_emit_dirt === 999) {
          low_emit_dirt = 0.25;
        }

        if (green_clean === 999) {
          green_clean = 0.25;
        }

        if (ipm === 999) {
          ipm = 0.25;
        }

        if (int_lighting === 999) {
          int_lighting = 0.25;
        }

        if (daylight === 999) {
          daylight = 0.25;
        }

        if (views === 999) {
          views = 0.25;
        }

        if (mold === 999) {
          mold = 0.25;
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

    $('.week').children().last().children().first().addClass('active');

  }.on('didInsertElement')
});
