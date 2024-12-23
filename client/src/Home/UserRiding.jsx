import { useLocation } from 'react-router-dom';
import './css/confirmRide.css';

const UserRiding = () => {
  const { state } = useLocation();
  const { vehicle, rideConfirm } = state || {};


  return (
    <div className="ConfirmRide">
      <img
        className="ConfirmRideImage"
        src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
        alt=""
      />
      <div className="ride-info">
        <div className="vehicleInfo">
          <img
            src={vehicle?.image || 'https://via.placeholder.com/150'}
            alt={vehicle?.name || 'Vehicle'}
            className="vehicle-image"
          />

          <div className="driverInfo">
            <h2>
              {rideConfirm?.driver?.fullname?.firstname +
                ' ' +
                rideConfirm?.driver?.fullname?.lastname}
            </h2>
            <h4>{rideConfirm?.driver?.vehicle?.plate}</h4>
            <p>{vehicle?.name}</p>
          </div>
        </div>

        <div className="destination-info">
          <div className="user-destination">
            🎯
            <div>
              <p>To: {rideConfirm?.destination}</p>
              <small>Drop-off Location</small>
            </div>
          </div>
          <div className="ride-price">
            💳
            <div>
              <p>Price: {rideConfirm?.fare}</p>
              <small>Cash/Online</small>
            </div>
          </div>
        </div>
        <button className="payment-button">Make Payment</button>
      </div>
    </div>
  );
};

export default UserRiding;
