import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  pid: DS.attr('number'),
  floor: DS.attr('number'),
  building: DS.belongsTo('building'),
  building_id: DS.attr('number'),
  points: DS.hasMany('point')
});
