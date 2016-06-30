import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  cat: DS.attr('number'),
  group: DS.attr('number'),
  temp: DS.attr('number'),
  hum: DS.attr('number'),
  building: DS.belongsTo('building')
});
