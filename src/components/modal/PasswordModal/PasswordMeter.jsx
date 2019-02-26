import React from "react";

const style = {
  meter: {
    width: "100%",
    display: "flex"
  },
  bar: {
    background: "red",
    width: "100%",
    margin: "1px",
    height: "6px"
  },
  force: {
    weak: { background: "#e74c3c", borderRadius: '5px' },
    medium: { background: "#f1c40f", borderRadius: '5px' },
    strong: { background: "#27ae60", borderRadius: '5px' }
  }
};

export default ({ value }) => {
  const STATUS = {
    WEAK: 0,
    ENOUGH: 1,
    MEDIUM: 2,
    STRONG: 3
  };

  let checkScore = value => {
    const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    const mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    const enoughRegex = new RegExp("(?=.{6,}).*", "g");

    if(strongRegex.test(value) === true) return STATUS.STRONG
    if(mediumRegex.test(value) === true) return STATUS.MEDIUM
    if(enoughRegex.test(value) === true) return STATUS.ENOUGH

    return STATUS.WEAK;
  }

  let checkForce = value => {
    switch(checkScore(value)){
      case STATUS.STRONG:
        return (<div style={{ ...style.bar, ...style.force.strong }} />);
      case STATUS.MEDIUM:
        return (<div style={{ ...style.bar, ...style.force.medium }} />);
      case STATUS.ENOUGH:
        return (<div style={{ ...style.bar, ...style.force.weak }} />);
      case STATUS.WEAK:
        return (<div style={{ ...style.bar, ...style.force.weak }} />);
      default:
        return (<div style={{ ...style.bar, ...style.force.weak }} />);
    }
  };

  return (
    <div style={style.meter}> { checkForce(value) } </div>
  );
};
