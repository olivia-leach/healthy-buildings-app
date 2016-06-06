import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('buildings-dashboard/new', 'Integration | Component | buildings dashboard/new', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{buildings-dashboard/new}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#buildings-dashboard/new}}
      template block text
    {{/buildings-dashboard/new}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
