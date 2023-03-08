// import React from "react";
import "./dashboard.css";
import menu from "../../assets/icons/dashboard.svg";
import overView from "../../assets/icons/overview.svg";
import inventory from "../../assets/icons/inventory.svg";
// import { useState } from "react";
// import { render } from "react-dom";
// import SlidingPane from "react-sliding-pane";
// import "react-sliding-pane/dist/react-sliding-pane.css";

// function Dashboard() {
// const [state, setState] = useState({
//   isPaneOpen: false,
//   isPaneOpenLeft: false,
// });
// return (
//   <div className="dashboard">
//     <div className="midDash">
//       <img src={menu} />
//       <p className="para">Dashboard</p>
//     </div>
//     <div className="midDash">
//       <img src={overView} />
//       <p className="para">overView</p>
//     </div>
//     <div className="midDash">
//       <img src={inventory} />
//       <p className="para">Inventory</p>
//     </div>
//   </div>

// <div>
//   <div style={{ marginTop: "32px" }}>
//     <button onClick={() => setState({ isPaneOpenLeft: true })}>
//       Click me
//     </button>
//   </div>

//   <SlidingPane
//     // closeIcon={<div>Some div containing custom close icon.</div>}
//     isOpen={state.isPaneOpenLeft}
//     // title="Hey, it is optional pane title.  I can be React component too."
//     from="left"
//     width="300px"
//     onRequestClose={() => setState({ isPaneOpenLeft: false })}
//   >
//     <div className="midDash">
//       <img src={menu} />
//       <p className="para">Dashboard</p>
//     </div>
//     <div className="midDash">
//       <img src={overView} />
//       <p className="para">overView</p>
//     </div>
//     <div className="midDash">
//       <img src={inventory} />
//       <p className="para">Inventory</p>
//     </div>
//   </SlidingPane>
// </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

export const Dashboard = ({ toggle, setToggle, ref }) => {
  // console.log("onClickkkk", onClick);

  // console.log("ddddddddddd", toggle);

  return (
    <div className="bb">
      <SideNav className="Bar" expanded={toggle}>
        <SideNav.Toggle
          className="tog"
          onClick={() => {
            setToggle(!toggle);
          }}
          // onClick={onClick}
        />

        <SideNav.Nav defaultSelected="home" ref={ref}>
          <NavItem eventKey="home">
            <NavIcon>
              <img src={menu} />
            </NavIcon>
            <NavText className="nText">Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="placed orders">
            <NavIcon>
              <img src={overView} />
            </NavIcon>
            <NavText>overView</NavText>
          </NavItem>
          <NavItem eventKey="placed orders">
            <NavIcon>
              <img src={inventory} />
            </NavIcon>
            <NavText>Inventory</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

// class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isVisible: true,
//     };
//     console.log("thisssss", this.state);
//   }

// export default Dashboard;
