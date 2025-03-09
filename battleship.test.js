const ship = require('./battleship');

test('position', () => {
  expect(ship.setPosition(10,10,10,10)).toBe('not ok');
});