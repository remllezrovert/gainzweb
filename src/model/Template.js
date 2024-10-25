class Template {
    constructor(id) {
        this._id = id;
        this._title = "";
        this._dataType = null; 
        this._summary = "";
        this._clientId = null;
        this._formId = null;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        if (typeof value === 'number') {
            this._id = value;
        } else {
            throw new Error("ID must be a number");
        }
    }

    get title() {
        return this._title;
    }
    set title(value) {
        if (typeof value === 'string') {
            this._title = value;
        } else {
            throw new Error("Title must be a string");
        }
    }

    get dataType() {
        return this._dataType;
    }
    set dataType(value) {
        this._dataType = value; 
    }

    get summary() {
        return this._summary;
    }
    set summary(value) {
        if (typeof value === 'string') {
            this._summary = value;
        } else {
            throw new Error("Summary must be a string");
        }
    }

    get clientId() {
        return this._clientId;
    }
    set clientId(value) {
        if (typeof value === 'number') {
            this._clientId = value;
        } else {
            throw new Error("Client ID must be a number");
        }
    }

    get formId() {
        return this._formId;
    }
    set formId(value) {
        if (typeof value === 'number') {
            this._formId = value;
        } else {
            throw new Error("Form ID must be a number");
        }
    }
}
