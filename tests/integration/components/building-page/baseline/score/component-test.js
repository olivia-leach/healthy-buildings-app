import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-page/baseline/score', 'Integration | Component | building page/baseline/score', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{building-page/baseline/score}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#building-page/baseline/score}}
      template block text
    {{/building-page/baseline/score}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
