import { MAX_SIZE } from "../../constants";

export interface IBufferOptions {
    maxSize: number;
    overwrite: boolean;
}

export class RingBuffer<T> {
    #bufferItems: Array<T>;
    #head: number;
    #tail: number;
    #bufferOptions: IBufferOptions
    
    constructor(bufferOptions?: IBufferOptions) {
        this.#head = 0;
        this.#tail = 0;
        this.#bufferOptions = this.#validateBufferOptions(bufferOptions);
        this.#bufferItems = new Array<T>(this.#bufferOptions.maxSize);
    }

    #validateBufferOptions(userOptions?: IBufferOptions): IBufferOptions {
        const bufferOptions: IBufferOptions = {
            maxSize: MAX_SIZE,
            overwrite: false
        }

        if (userOptions?.maxSize) {
            if (userOptions.maxSize >= MAX_SIZE) {
                bufferOptions.maxSize = MAX_SIZE;
            } else {
                bufferOptions.maxSize = userOptions.maxSize;
            }
        }

        if (userOptions && 'overwrite' in userOptions && typeof userOptions.overwrite === 'boolean') {
            bufferOptions.overwrite = userOptions.overwrite || false;
        }
        
        return bufferOptions;
    }

    #getMaxSize(): number {
        return this.#bufferOptions.maxSize;
    }
    
    put(val: T): void {
        
        // Reserved Slot semantic, the reserved slot is a sentinel slot that is used to differentiate between when the buffer is full vs when it's empty.
        // If empty, head === tail.
        // If full, tail + 1 === head (the tail + 1 logic, gurantees the reserved slot semantic.)
        if ((this.#tail + 1) % this.#getMaxSize() === this.#head) {
            if (this.#bufferOptions.overwrite === false) {
                throw new Error('Overflow!');
            }
            this.#head = (this.#head + 1) % this.#getMaxSize();
        }

        this.#bufferItems[this.#tail] = val;

        this.#tail = (this.#tail + 1) % this.#getMaxSize();
    }

    get(): T | undefined {
        
        if (this.#head === this.#tail) {
            throw new Error('Underflow!');
        }

        const valueToBeRead = this.#bufferItems[this.#head];

        this.#head = (this.#head + 1) % this.#getMaxSize();
        
        return valueToBeRead;
    }
}