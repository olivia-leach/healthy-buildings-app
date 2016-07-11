import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';
import moment from 'moment';

export default Model.extend({
  day: DS.attr('number'),
  date: DS.attr('date'),
  enhanced_iaq: DS.attr('number'),
  tc: DS.attr('number'),
  iaq_perf: DS.attr('number'),
  low_emit_air: DS.attr('number'),
  iaq_assess: DS.attr('number'),
  acoustic: DS.attr('number'),
  low_emit_dirt: DS.attr('number'),
  green_clean: DS.attr('number'),
  ipm: DS.attr('number'),
  int_lighting: DS.attr('number'),
  daylight: DS.attr('number'),
  views: DS.attr('number'),
  mold: DS.attr('number'),
  ets: DS.attr('number'),
  surveys: DS.attr('number'),
  baseline: DS.attr('number'),
  aer_score: DS.attr('number'),
  tc_score: DS.attr('number'),
  humidity_score: DS.attr('number'),
  noise_score: DS.attr('number'),
  rt_score: DS.attr('number'),
  overall_score: DS.attr('number'),
  co2: DS.attr('number'),
  aer: DS.attr('number'),
  temp: DS.attr('number'),
  rh: DS.attr('number'),
  sh: DS.attr('number'),
  noise: DS.attr('number'),
  pmv: DS.attr('number'),
  ppd: DS.attr('number'),
  steps_score: DS.attr('number'),
  sleep_score: DS.attr('number'),
  steps: DS.attr('number'),
  sleep: DS.attr('number'),
  num_sensors: DS.attr('number'),
  building: DS.belongsTo('building')
});
