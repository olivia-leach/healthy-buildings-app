import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';
import moment from 'moment';

export default Model.extend({
  day: DS.attr('number'),
  date: DS.attr('date'),
  // date: function() {
  //   return moment(this.get('id'), 'MMM-YYYY');
  // }.property('model'),
  aer_score: DS.attr('number'),
  tc_score: DS.attr('number'),
  humidity_score: DS.attr('number'),
  noise_score: DS.attr('number'),
  co2: DS.attr('number'),
  aer: DS.attr('number'),
  temp: DS.attr('number'),
  rh: DS.attr('number'),
  sh: DS.attr('number'),
  noise: DS.attr('number'),
  pmv: DS.attr('number'),
  ppd: DS.attr('number'),
  building: DS.belongsTo('building')
});
