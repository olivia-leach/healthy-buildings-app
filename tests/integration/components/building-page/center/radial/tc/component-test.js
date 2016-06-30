import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-page/center/radial/tc', 'Integration | Component | building page/center/radial/tc', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{building-page/center/radial/tc}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#building-page/center/radial/tc}}
      template block text
    {{/building-page/center/radial/tc}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
