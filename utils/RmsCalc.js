export default 
class RmsCalc {
  // Epl = Epley
  // Brz = Brzycki
  // Mcg = McGlothin
  // Lom = Lombardi
  // May = Mayhew et al.
  // Oco = O'Conner et al.
  // Wat = Wathen
  // Avg = Average
  weight
  reps

  constructor(weight, reps) {
    this.weight = weight
    this.reps = reps
  }

  //for all reps > 1 calculate the 1RMs 
  getEplOneRm() {
    return Math.round(this.weight * (1 + (this.reps / 30)));
  }
  getBrzOneRm() {
    return Math.round(this.weight * (36 / (37 - this.reps)));
  }
  getMcgOneRm() {
    return Math.round(this.weight * 100 / (101.3 - 2.67123 * this.reps));
  }
  getLomOneRm() {
    return Math.round(this.weight * Math.pow(this.reps, 0.10));
  }
  getMayOneRm() {
    return Math.round((this.weight * 100) / (52.2 + (41.9 * Math.exp(-1 * (this.reps * 0.055)))));
  }
  getOcoOneRm() {
    return Math.round(this.weight * (1 + this.reps * 0.025));
  }
  getWatOneRm() {
    return Math.round((this.weight * 100) / (48.8 + (53.8 * Math.exp(-1 * (this.reps * 0.075)))));
  }
  getAvgOneRm() {
    return Math.round((
      this.getEplOneRm() + 
      this.getBrzOneRm() + 
      this.getMcgOneRm() + 
      this.getLomOneRm() + 
      this.getMayOneRm() + 
      this.getOcoOneRm() + 
      this.getWatOneRm()
    ) / 7);
  }

  //calculate RMs 2-10 and append it to the table
  getEplRepRm(i) {
    return Math.round(this.getEplOneRm() / ((1 + (i / 30))));
  }
  getBrzRepRm(i) {
    return Math.round((this.getBrzOneRm() * (37 - i)) / 36);
  }
  getMcgRepRm(i) {
    return Math.round(((this.getMcgOneRm() * (101.3 - 2.67123 * i)) / 100));
  }
  getLomRepRm(i) {
    return Math.round(this.getLomOneRm() / (Math.pow(i, 0.1)));
  }
  getMayRepRm(i) {
    return Math.round((this.getMayOneRm() * (52.2 + (41.9 * Math.exp(-1 * (i * 0.055))))) / 100);
  }
  getOcoRepRm(i) {
    return Math.round((this.getOcoOneRm() / (1 + i * 0.025)));
  }
  getWatRepRm(i) {
    return Math.round((this.getWatOneRm() * (48.8 + (53.8 * Math.exp(-1 * (i * 0.075))))) / 100);
  }
  getAvgRepRm(i) {
    return Math.round((
      this.getEplRepRm(i) +
      this.getBrzRepRm(i) +
      this.getMcgRepRm(i) + 
      this.getLomRepRm(i) + 
      this.getMayRepRm(i) + 
      this.getOcoRepRm(i) + 
      this.getWatRepRm(i)
    ) / 7);
  }

  rmCalc() {
    let rms = []
    let reps = 1
    if (this.reps == 1) {
      let oneRms = {
        reps: 1,
        Epl: this.weight,
        Brz: this.weight,
        Mcg: this.weight,
        Lom: this.weight,
        May: this.weight,
        Oco: this.weight,
        Wat: this.weight,
        Avg: this.weight,
      }
      rms.push(oneRms)
    } else {
      let oneRms = {
        reps: 1,
        Epl: this.getEplOneRm(),
        Brz: this.getBrzOneRm(),
        Mcg: this.getMcgOneRm(),
        Lom: this.getLomOneRm(),
        May: this.getMayOneRm(),
        Oco: this.getOcoOneRm(),
        Wat: this.getWatOneRm(),
        Avg: this.getAvgOneRm(),
      }
      rms.push(oneRms)
    }
    reps++
    while (reps != 11) {
      let repRms = {
        reps: reps,
        Epl: this.getEplRepRm(reps),
        Brz: this.getBrzRepRm(reps),
        Mcg: this.getMcgRepRm(reps),
        Lom: this.getLomRepRm(reps),
        May: this.getMayRepRm(reps),
        Oco: this.getOcoRepRm(reps),
        Wat: this.getWatRepRm(reps),
        Avg: this.getAvgRepRm(reps),
      }
      rms.push(repRms)
      reps++
    }
    return rms
  }
}