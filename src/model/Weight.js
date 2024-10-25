import Unit from './Unit.js';

class Weight {
    constructor() {
        this._unit = Unit.BW; 
        this._value = 0; 
    }

    get value() {
        return this._value;
    }

    set value(val) {
        if (Number.isInteger(val) && val >= 0 && val <= 32767) { //bounds appropriately to Short
            this._value = val;
        } else {
            throw new Error("Value must be a short integer (0 to 32767)");
        }
    }

    get unit() {
        return this._unit;
    }

    set unit(val) {
        if (Object.values(Unit).includes(val)) {
            this._unit = val;
        } else {
            throw new Error("Invalid unit");
        }
    }

    toString() {
        return `${this._value}${this._unit}`;
    }
}

export default Weight;
