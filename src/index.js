//Main display area
const display = document.querySelector('#main');

//1. Composite Pattern

//component class
// interface ListComponent {
//     draw();
//     _parent: ListComponent;
// }

class Item {
    constructor(textContent) {
        this.textContent = textContent;
    }
    draw() {
        this.domNode = document.createElement('li');
        console.log `newly created li element ${this.domNode}`;
        // debugger;
        this.domNode.textContent = this.textContent;
        console.log `the node ${this.domNode}`;
        this._parent.domNode.append(this.domNode);
    }

}

class List {

    draw() {
        console.log `super.draw() was called`;
        this._children.forEach(child => child.draw());
    }
    add(component) {
        this._children.push(component);
        //let the new child know who the parent is
        component._parent = this;
    };
    remove(component) {
        this._children = this._children.filter(child => child != component);
    };
    _children = [];
}

class OrderedList extends List {
    draw() {
        //create the domNode where children can append to in order to draw themselves
        this.domNode = document.createElement('ol');
        //draw children as specified in super class
        super.draw();
    }
}

class UnorderedList extends List {
    draw() {
        this.domNode = document.createElement('ul');
        super.draw();
    }
}

let oList = new OrderedList();
let uList = new UnorderedList();
// let uList2 = new UnorderedList();
let item1 = new Item('Yesso Item 1');
let item2 = new Item('itemi tu');
let item3 = new Item('nke ato');
let item4 = new Item('the fourth');
let item5 = new Item('da 5iveth one');

//compose
oList.add(item3);
oList.add(item4);
uList.add(item1);
uList.add(item2);
uList.add(oList);
uList.add(item5);
// uList2.add(uList);
console.log `uList2 ${uList}`;

//show on screen
uList._parent = display;
uList.draw();
display.append(uList.domNode);