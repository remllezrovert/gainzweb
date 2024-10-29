class Distance {
    constructor() {
      this.unit = Unit.BW;  
      this.value = 0.0;
    }
  
    getValue() {
      return this.value;
    }
  
    setValue(value) {
      this.value = value;
    }
  
    getUnit() {
      return this.unit;
    }
  
    setUnit(unit) {
      this.unit = unit;
    }
  
    toString() {
      return this.value.toString() + this.unit.toString();
    }
  }
  
  const Unit = {
    BW: "BW",  
    KM: "KM",
    MILE: "MILE"
  };
  
  const distance = new Distance();
  distance.setValue(5.0);
  distance.setUnit(Unit.KM);
  console.log(distance.toString());  
  