import '../css/confirmRide.css';

const ConfirmRide = ({ vehicle, onBack }) => {
  return (
    <div className="ConfirmRide">
      <button className="backButton" onClick={onBack}>⬅</button>
      <img className='ConfirmRideImage' src='https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif' alt='' />
      <div className="ride-info">
        <div className='vehicleInfo'>
           <img src={vehicle.image} alt={vehicle.name} className='vehicle-image'/>
        
          <div className='driverInfo'>
            <h2>John Doe</h2>
            <h4>ABC-1234</h4>
            <p>{vehicle.name}</p>
          </div>
        </div>

        <div className="destination-info">
          <div className="user-destination">
            🎯
            <div>
              <p>To: Times Square</p>
              <small>Drop-off Location</small>
            </div>
          </div>
          <div className="ride-price">
            💳
            <div>
              <p>Price: {vehicle.price}</p>
              <small>Cash/Online</small>
            </div>
          </div>
        </div>

        <button className="payment-button">Make Payment</button>
      </div>
    </div>
  );
};

export default ConfirmRide;
