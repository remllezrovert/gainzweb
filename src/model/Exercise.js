
class Exercise {
    constructor(id = null) {
      this.dataMap = new Map();
      this.id = id || 0;
      this.clientId = 0;
      this.templateId = 0;
      this.date = null;
    }
  
    getId() {
      return this.id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getClientId() {
      return this.clientId;
    }
  
    setClientId(clientId) {
      this.clientId = clientId;
    }
  
    getTemplateId() {
      return this.templateId;
    }
  
    setTemplateId(templateId) {
      this.templateId = templateId;
    }
  
    getData(label) {
      return this.dataMap.get(label);
    }
  
    getAllData() {
      return this.dataMap;
    }
  
    setData(label, data) {
      try {
        this.dataMap.set(label, data);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  
    getDate() {
      return this.date;
    }
  
    setDate(date) {
      this.date = date;
    }
  }
  
  export default Exercise;
