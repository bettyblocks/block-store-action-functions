import { test } from 'vitest';
import liquid from '../../../functions/liquid/1.1';

describe('LiquidJS', () => {
  const name = 'Batman';
  const characters = [
    { name: 'Batman', team: 'Heroes' },
    { name: 'Hulk', team: 'Heroes' },
    { name: 'Iron Man', team: 'Heroes' },
    { name: 'Joker', team: 'Villains' },
    { name: 'Lex Luthor', team: 'Villains' },
    { name: 'Mandarin', team: 'Villains' },
    { name: 'Sandman', team: 'Villains' },
    { name: 'Spider-Man', team: 'Heroes' },
    { name: 'Superman', team: 'Heroes' },
    { name: 'Venom', team: 'Villains' },
  ];

  test('It handles a template with a context', async () => {
    const { as } = await liquid({
      template: 'Hello, {{name}}!',
      context: [{ key: 'name', value: name }],
    });
    expect(as).toEqual('Hello, Batman!');
  });

  test('It provides the standard Liquid tags', async () => {
    const { as } = await liquid({
      template: `
        {% assign foo = "FOO" %}
        {% if foo == "FOO" %}
          Variable \`foo\` equals "FOO"
        {% else %}
          Variable \`foo\` not equals "FOO"
        {% endif %}
      `,
    });
    expect(as.trim()).toEqual('Variable `foo` equals "FOO"');
  });

  test('It provides the standard Liquid filters', async () => {
    const { as } = await liquid({
      template: '{{ name | append: ", welcome to LiquidJS!" | upcase }}',
      context: [{ key: 'name', value: name }],
    });
    expect(as).toEqual('BATMAN, WELCOME TO LIQUIDJS!');
  });

  test('It is able to group an array of objects based on a key', async () => {
    const { as } = await liquid({
      template: `
        {% assign groups = characters | group: "team" %}
        
        {% for group in groups %}
        Team: {{ group[0] }}

        {% assign team = group[1] %}
        
        {% for member in team %}
        - {{ member.name }}
        {% endfor %}

        {% endfor %}
      `,
      context: [{ key: 'characters', value: characters }],
    });
    expect(as.replace(/\s+/g, ' ').trim()).toEqual(
      'Team: Heroes - Batman - Hulk - Iron Man - Spider-Man - Superman Team: Villains - Joker - Lex Luthor - Mandarin - Sandman - Venom',
    );
  });

  test('It handles a template variable with a context', async () => {
    const { as } = await liquid({
      templateVariable: 'Hello, {{name}}!',
      context: [{ key: 'name', value: name }],
    });
    expect(as).toEqual('Hello, Batman!');
  });

  test('It preferes a template variable over template', async () => {
    const { as } = await liquid({
      template: 'Not {{name}}!',
      templateVariable: 'Hello, {{name}}!',
      context: [{ key: 'name', value: name }],
    });
    expect(as).toEqual('Hello, Batman!');
  });
});
