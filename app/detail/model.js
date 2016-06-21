import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';
import moment from 'moment';

export default Model.extend({
  pid: DS.attr('number'),
  day: DS.attr('number'),
  date: DS.attr('date'),
  co2: DS.attr('number'),
  aer: DS.attr('number'),
  temp: DS.attr('number'),
  rh: DS.attr('number'),
  sh: DS.attr('number'),
  noise: DS.attr('number'),
  pmv: DS.attr('number'),
  ppd: DS.attr('number'),
  sensor: DS.belongsTo('building')
});
