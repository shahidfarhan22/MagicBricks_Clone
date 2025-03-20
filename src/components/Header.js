
import logo from '../Images/NOBroker_logo.png'
import '../App.css';

export default function Header(){
    return (
        <div>
        {/* <h1>No Broker</h1> */}
        <p><img src = {logo} alt = "Description" className = "logo"></img></p>
        
        </div>        
    )
}