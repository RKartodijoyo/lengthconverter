import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const scaleNames = {
  km: "Kilometer",
  m: "Meter",
  mm: "Milimeter"
};

function toKilometer(meter) {
  return meter / 1000;
}
function toKilometer2(milimeter) {
  return milimeter / 1000000;
}
function toMilimeter(meter) {
  return meter * 1000;
}

function toMilimeter2(kilometer) {
  return kilometer * 1000000;
}
function toMeter(kilometer) {
  return kilometer * 1000;
}
function toMeter2(milimeter) {
  return milimeter / 1000;
}
function tryConvert(panjang, convert) {
  const input = parseFloat(panjang);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class PanjangInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onPanjangChange(e.target.value);
  }

  render() {
    const panjang = this.props.panjang;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter panjang in {scaleNames[scale]}:</legend>
        <input value={panjang} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleKilometerChange = this.handleKilometerChange.bind(this);
    this.handleMeterChange = this.handleMeterChange.bind(this);
    this.handleMilimeterChange = this.handleMilimeterChange.bind(this);
    this.state = { panjang: "", scale: "km" };
  }

  handleKilometerChange(panjang) {
    this.setState({ scale: "km", panjang });
  }
  handleMilimeterChange(panjang) {
    this.setState({ scale: "mm", panjang });
  }
  handleMeterChange(panjang) {
    this.setState({ scale: "m", panjang });
  }

  render() {
    const scale = this.state.scale;

    const panjang = this.state.panjang;
    var kilometer, milimeter, meter;

    if (scale === "m") {
      kilometer = tryConvert(panjang, toKilometer);
      milimeter = tryConvert(panjang, toMilimeter);
    } else if (scale === "mm") {
    } else if (scale === "km") {
    } else {
      kilometer = panjang;
      milimeter = panjang;
    }

    if (scale === "km") {
      meter = tryConvert(panjang, toMeter);
      milimeter = tryConvert(panjang, toMilimeter2);
    } else if (scale === "mm") {
    } else if (scale === "m") {
    } else {
      meter = panjang;
      milimeter = panjang;
    }
    if (scale === "mm") {
      kilometer = tryConvert(panjang, toKilometer2);
      meter = tryConvert(panjang, toMeter2);
    } else if (scale === "km") {
    } else if (scale === "m") {
    } else {
      kilometer = panjang;
      meter = panjang;
    }

    return (
      <div>
        <PanjangInput
          scale="km"
          panjang={kilometer}
          onPanjangChange={this.handleKilometerChange}
        />
        <PanjangInput
          scale="mm"
          panjang={milimeter}
          onPanjangChange={this.handleMilimeterChange}
        />
        <PanjangInput
          scale="m"
          panjang={meter}
          onPanjangChange={this.handleMeterChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
export default Calculator;
