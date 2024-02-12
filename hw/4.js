const assert = require('assert');

class Collection {
  #arr;
  constructor(...args) {
    this.#arr = Array.isArray(args[0]) ? args[0] : args;
  }
  get _arr() {
    return this.#arr;
  }
  push(value) {
    this.#arr.push(value);
    return this;
  }
  // 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 (요소 삭제 없음!)
  get peek() {
    if (this.constructor.name == 'Stack') {
      return this.#arr.at(-1);
    }
    return this.#arr.at(0);
  }
  // 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 & 삭제
  get poll() {
    if (this.constructor.name == 'Stack') {
      return this.#arr.pop();
    }
    return this.#arr.shift();
  }
  // 모든 원소 지우기
  clear() {
    this.#arr.length = 0;
  }
  // array 타입 반환
  toArray() {
    return [...this.#arr];
  }
  // 가장 (Stack:나중, Queue:먼저) 들어간 요소 삭제(skip)
  remove() {
    if (this.constructor.name == 'Stack') this.#arr.pop();
    else this.#arr.shift();
  }
  // 원소가 하나도 없으면 true
  get isEmpty() {
    return this.#arr.length == 0;
  }
  // 현재 원소의 개수
  get size() {
    return this.#arr?.length;
  }
}

class Stack extends Collection {
  pop() {
    return this._arr.pop();
  }
}

class Queue extends Collection {
  enqueue(value) {
    this.push(value);
    return this;
  }
  dequeue() {
    return this._arr.shift();
  }
}

// 아래 코드가 통과되도록 Collection 클래스의 method를 작성하시오!
const stack = new Stack();
stack.push(1).push(2).push(3).push(5);
assert.deepStrictEqual(stack.toArray(), [1, 2, 3, 5]);

stack.pop();
assert.strictEqual(stack.peek, 3);

stack.remove();
assert.strictEqual(stack.poll, 2);
assert.deepStrictEqual(stack.toArray(), [1]);


const queue = new Queue();
queue.enqueue(1).enqueue(3).enqueue(5);
queue.dequeue();

assert.deepStrictEqual(queue.toArray(), [3, 5]);
assert.strictEqual(queue.poll, 3);
assert.deepStrictEqual(queue.toArray(), [5]);

if (!stack.isEmpty) stack.clear();
if (queue.size) queue.clear();

assert.deepStrictEqual(stack.toArray(), []);
assert.deepStrictEqual(queue.toArray(), []);
