import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  datetime: DS.attr('date'),
  temp: DS.attr('number'),
  humidity: DS.attr('number'),
  co2: DS.attr('number'),
  noise: DS.attr('number'),
  pressure: DS.attr('number'),
  ppd: DS.attr('number'),
  humidity_score: DS.attr('number'),
  noise_score: DS.attr('number'),
  co2_score: DS.attr('number'),
  tc_score: DS.attr('number'),
  sensor: DS.belongsTo('sensor')
});
