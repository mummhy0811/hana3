class Stack{
    arr=[];
    push(n){
        return this.arr.unshift(n);
    }
    pop(){
        return this.arr.shift(1);
    }
}

class Queue{
    arr=[];
    enqueue(n){
        return this.arr.push(n);
    }
    dequeue(){
        return this.arr.shift(1);
    }
}

const stack = new Stack(); // or new Stack([1,2]); // (1,2)
stack.push(1);
stack.push(2);
stack.push(3); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기