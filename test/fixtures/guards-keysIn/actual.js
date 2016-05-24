import { keysIn } from 'lodash';

class Foo {
  constructor() {
    this.a = 1;
  }
}

Foo.prototype.b = 2;

keysIn(new Foo);
