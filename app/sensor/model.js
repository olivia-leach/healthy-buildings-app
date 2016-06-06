import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  floor: DS.attr('number'),
  belongsTo: DS.belongsTo('building')
});
