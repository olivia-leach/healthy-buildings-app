import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr('string'),
  cat: DS.attr('string'),
  foundation: DS.attr('string'),
  pase: DS.attr('string'),
  weight: DS.attr('number'),
  measures: DS.hasMany('measure'),
});
