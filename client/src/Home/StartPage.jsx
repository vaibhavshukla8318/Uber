import './css/start-page.css'
import {Link} from 'react-router-dom'
const StartPage = () => {
  return (
    <div className='startPage'>
      <div className='startPageImages'>

      </div>
      <div className='linkContainer'>
        <Link className='peoplePageLink' to="/auth/login">Continue People</Link>
        <Link className='driverPageLink' to="/auth/driver/login">Continue Drivers</Link>
      </div>
    </div>
  )
}

export default StartPage