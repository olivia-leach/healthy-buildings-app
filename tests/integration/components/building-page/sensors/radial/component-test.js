import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-page/sensors/radial', 'Integration | Component | building page/sensors/radial', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{building-page/sensors/radial}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#building-page/sensors/radial}}
      template block text
    {{/building-page/sensors/radial}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
