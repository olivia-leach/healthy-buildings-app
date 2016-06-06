import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  day: DS.attr('number'),
  date: DS.attr('date'),
  AER_score: DS.attr('number'),
  TC_score: DS.attr('number'),
  humidity_score: DS.attr('number'),
  noise_score: DS.attr('number'),
  co2: DS.attr('number'),
  AER: DS.attr('number'),
  temp: DS.attr('number'),
  RH: DS.attr('number'),
  SH: DS.attr('number'),
  noise: DS.attr('number'),
  PMV: DS.attr('number'),
  PPD: DS.attr('number'),
  building: DS.belongsTo('building')
});
