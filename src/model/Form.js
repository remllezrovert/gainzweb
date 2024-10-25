class Form {
    constructor(id, content) {
        this._id = id;
        this._content = content; 
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

    get content() {
        return this._content;
    }

    set content(value) {
        if (typeof value === 'string') { 
            this._content = value;
        } else {
            throw new Error("Content must be a base64 encoded string"); //may need to revisit in testing
        }
    }

    //convert content to a byte array (if necessary)
    getContentAsByteArray() {
        return Uint8Array.from(atob(this._content), c => c.charCodeAt(0));
    }

    setContentFromByteArray(byteArray) {
        this._content = btoa(String.fromCharCode.apply(null, byteArray));
    }
}
