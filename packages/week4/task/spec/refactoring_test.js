var {Shop, Item} = require('../src/gilded_rose.js');

describe("Refactored Gilded Rose", function() {
  it("should handle normal items correctly", function() {
    const shop = new Shop([new Item("Normal Item", 5, 10)]);
    const items = shop.updateQuality();
    expect(items[0].quality).toEqual(9);
    expect(items[0].sellIn).toEqual(4);
  });

  it("should handle aged brie correctly", function() {
    const shop = new Shop([new Item("Aged Brie", 5, 10)]);
    const items = shop.updateQuality();
    expect(items[0].quality).toEqual(11);
  });

  it("should handle backstage passes correctly", function() {
    const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)]);
    const items = shop.updateQuality();
    expect(items[0].quality).toEqual(12); // +2 when 6-10 days
  });
});