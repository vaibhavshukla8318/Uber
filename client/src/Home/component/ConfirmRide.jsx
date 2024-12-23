import '../css/confirmRide.css';
import { useSocket } from '../../store/SocketContext';
import { useNavigate } from 'react-router-dom';

const ConfirmRide = ({ vehicle, onBack, rideConfirm }) => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  socket.on('ride-started', (ride) => {
    navigate('/user-riding', { state: { vehicle, rideConfirm } });
  });

  return (
    <div className="ConfirmRide">
      <button className="backButton" onClick={onBack}>⬅</button>
      <img
        className="ConfirmRideImage"
        src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
        alt=""
      />
      <div className="ride-info">
        <div className="vehicleInfo">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="vehicle-image"
          />

          <div className="driverInfo">
            <h2>
              {rideConfirm?.driver?.fullname?.firstname +
                ' ' +
                rideConfirm?.driver?.fullname?.lastname}
            </h2>
            <h4>{rideConfirm?.driver?.vehicle?.plate}</h4>
            {vehicle.name} {vehicle.seat}
            <p style={{ color: 'red', fontSize: '1.3rem' }}>{rideConfirm?.otp}</p>
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
      </div>
    </div>
  );
};

export default ConfirmRide;
