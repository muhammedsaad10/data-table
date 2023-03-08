import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import Tabledata from "../../components/form/tabel/Tabledata";
import Header from "../../components/Navbar/Header";
// import Dashboard from "../../components/Dashboard/Dashboard";
import "./table.css";
function Table() {
  const [cross, setCross] = useState(false);
  // const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
    console.log("jjjjjjjjjj toggle", toggle);
    // const button = document
    //   .getElementById("dBoard")
    //   .getElementsByTagName("button")[0];
    // console.log("button is", button);
    // .onclick(() => {
    //   console.log("helooworld");
    // });
  };
  // useEffect(() => {
  //   handleClick();
  // const button = document
  //   .getElementById("dBoard")
  //   .getElementsByTagName("button")[0]
  //   .onclick(() => {
  //     console.log("helooworld");
  //   });
  // console.log("button is", button);
  // }, []);
  const elmnt = document.getElementById("dBoard");
  const ref = useRef();
  const [toggle, setToggle] = useState(false);
  // useEffect(() => {
  //   console.log("widrh", elmnt?.offsetWidth, ref?.current?.offsetWidth);
  // }, [toggle]);
  // console.log("widrh", elmnt?.offsetWidth, ref);

  return (
    <div>
      {<Header />}

      <div className="test">{<Tabledata toggle={toggle} />}</div>
      <div className="ddd" id="dBoard" ref={ref}>
        {" "}
        {<Dashboard toggle={toggle} setToggle={setToggle} ref={ref} />}
      </div>
    </div>
  );
}

export default Table;
