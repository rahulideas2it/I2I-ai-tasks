var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should update normal item quality", function() {
    const gildedRose = new Shop([ new Item("foo", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
    expect(items[0].sellIn).toEqual(4);
  });

});
