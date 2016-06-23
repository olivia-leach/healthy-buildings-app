import { ActiveModelSerializer } from 'active-model-adapter';
import DS from 'ember-data';

export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin,{
  attrs: {
    points: {embedded: 'always'},
    building: {embedded: 'always'},
    pid: 'PID'
  },
});
