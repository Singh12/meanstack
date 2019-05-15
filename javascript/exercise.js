function HtmlElement() {
  this.click = function() {
    console.log('click');
  };
}

HtmlElement.prototype.focus = function() {
  console.log('Focus');
};



// HtmlSelectElement.prototype = Object.create(HtmlElement.prototype);
// HtmlSelectElement.prototype.constructor = HtmlSelectElement;
function HtmlSelectElement(items = []) {
  this.items = items;
  this.addItem = function(num) {
    this.items.push(num);
  };

  this.removeItems = function(num) {
    this.items.splice(this.items.indexOf(item),1);
  };
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;
HtmlSelectElement.prototype.render = function() {
 return `
 <select> ${this.items.map(element => {`
   <option> ${element}</option>`
 })} </select>
 `;
};
const e = new HtmlElement();
const s = new HtmlSelectElement([1,2,3]);

