class Item {
  constructor(name, sellIn, quality){
    if (typeof name !== 'string') throw new Error('Item name must be a string');
    if (!Number.isInteger(sellIn)) throw new Error('SellIn must be an integer');
    if (!Number.isInteger(quality) || quality < 0) throw new Error('Quality must be a non-negative integer');
    
    this.name = name;
    this.sellIn = sellIn;
    this.quality = Math.min(quality, 50); // Enforce max quality
  }
}

class Shop {
  constructor(items=[]){
    if (!Array.isArray(items)) throw new Error('Items must be an array');
    this.items = items.filter(item => item instanceof Item); // Only allow Item instances
  }
  
  static get MAX_QUALITY() { return 50; }
  static get MIN_QUALITY() { return 0; }
  static get BACKSTAGE_TIER_1() { return 11; }
  static get BACKSTAGE_TIER_2() { return 6; }
  
  increaseQuality(item, amount = 1) {
    item.quality = Math.min(item.quality + amount, Shop.MAX_QUALITY);
  }
  
  decreaseQuality(item, amount = 1) {
    item.quality = Math.max(item.quality - amount, Shop.MIN_QUALITY);
  }
  
  /**
   * Updates the quality and sellIn values for all items in the shop according to business rules.
   * 
   * Business Rules:
   * - Normal items: quality decreases by 1 each day, by 2 after sell date
   * - Aged Brie: quality increases by 1 each day, by 2 after sell date
   * - Backstage passes: quality increases by 1 (>10 days), by 2 (6-10 days), by 3 (1-5 days), drops to 0 after concert
   * - Sulfuras: legendary item, never changes quality or sellIn
   * - Quality bounds: 0 ≤ quality ≤ 50 (except Sulfuras which is always 80)
   * 
   * @returns {Item[]} Array of updated items
   * 
   * @example
   * const shop = new Shop([
   *   new Item('Normal Item', 10, 20),
   *   new Item('Aged Brie', 5, 30),
   *   new Item('Backstage passes to a TAFKAL80ETC concert', 8, 25)
   * ]);
   * const updatedItems = shop.updateQuality();
   * console.log(updatedItems[0].quality); // 19 (decreased by 1)
   */
  updateNormalItem(item) {
    this.decreaseQuality(item);
    if (item.sellIn < 0) this.decreaseQuality(item);
  }

  updateAgedBrie(item) {
    this.increaseQuality(item);
    if (item.sellIn < 0) this.increaseQuality(item);
  }

  updateBackstagePass(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      this.increaseQuality(item);
      if (item.sellIn < Shop.BACKSTAGE_TIER_1) this.increaseQuality(item);
      if (item.sellIn < Shop.BACKSTAGE_TIER_2) this.increaseQuality(item);
    }
  }

  updateSulfuras(item) {
    // Legendary items never change
  }

  updateQuality() {
    this.items.forEach(item => {
      // Update quality based on item type
      if (item.name === 'Aged Brie') {
        this.updateAgedBrie(item);
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackstagePass(item);
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        this.updateSulfuras(item);
      } else {
        this.updateNormalItem(item);
      }
      
      // Update sellIn for non-legendary items
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
