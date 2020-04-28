//Main display area
const display = document.querySelector('#main');

//1. Composite Pattern

//component class
interface ListComponent {
    draw();
    _parent: ListComponent;
}

class Item implements ListComponent {
    constructor(textContent: string) {
        this.textContent = textContent;
    }
    draw() {
        this.domNode = document.createElement('li');
        this.domNode.textContent = this.textContent;
        this._parent.domNode.append(this.domNode);
    }

}

abstract class List implements ListComponent {

    draw() {
        this._children.forEach(child => child.draw());
    }
    add(component: ListComponent) {
        this._children.push(component);
        //let the new child know who the parent is
        component._parent = this;
    };
    remove(component: ListComponent) {
        this._children = this._children.filter(child => child != component);
    };
    _children: ListComponent[];
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
let uList2 = new UnorderedList();
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
uList2.add(uList);

//show on screen
display.append(uList2);