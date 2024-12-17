import "./css/driverPage.css";
import { CgTimer, CgNotes } from "react-icons/cg";
import { RiTimer2Line } from "react-icons/ri";
import DriverRideAvailable from "./component/DriverRideAvailable";


const DriverPage = () => {
  

  return (
    <div className="driver">
      <img src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
      <div className="driverWorks">
        <div className="driverDetails">
          <div className="driverImage">
            <img src="https://images4.alphacoders.com/262/262196.jpg" alt="image" />
            <p>
              John Doe
            </p>
          </div>
          <div className="totalEarn">
           <p>₹350</p>
           <small>Earned</small>
          </div>
        </div>
        <div className="totalWorks">
          <div>
            <RiTimer2Line className="icon" />
            <p>13.5</p>
            <small>Hours Online</small>
          </div>
          <div>
            <CgTimer className="icon"  />
            <p>13.5</p>
            <small>Hours Online</small>
          </div>
          <div>
            <CgNotes className="icon"  />
            <p>13.5</p>
            <small>Hours Online</small>
          </div>
        </div>
      </div>
      <>
        <DriverRideAvailable />
      </>
    </div>
  )
}

export default DriverPage;
