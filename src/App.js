import React, { Component } from 'react';
import City from './City';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather';

export class App extends Component {
  constructor(props){
    super(props);

    this.state={
      lat:"",
      lon:"",
      cityName:" " ,
      errorMsg : " "
    }
  }

  getUserInputHandler=(e)=>{
    this.setState({
      cityName:e.target.value
    })
    console.log(this.state.cityName);
  }


  weather=(city)=>{
    let url =`http://localhost:3004/weather?cityName=/${city.split(',')[0]}`

    axios.get(url).then(res=>{
      let data = res.data;
      console.log(data)

      this.setState({
        weatherData :data,
        errMsg : false
      })
    }).catch((error)=>{
      this.setState({
        errMsg : true,
        msg:`the weather not found`,
        weatherData:[]

      })
      
    })
  }
  submitHandler=(e)=>{
  
    e.preventDefault();
    
    let url=`https://eu1.locationiq.com/v1/search.php?key=pk.60346fba30221450f0bd55e67928ff53&q=${this.state.cityName}&format=json`;


   axios.get(url).then(res=>{
      let data= res.data[0]

      this.setState({
        cityName:data.display_name,
        lat:data.lat,
        lon:data.lon ,

        
         
      })
     
      }) .catch(err=>{
        console.log(err);
        this.setState({
          errorMsg : `${err}`
        })
        
    });
  }
  
  render() {
    return (
      <div>
        <h1 className = 'top'>LocationIQ API Demo</h1>
        <h2>{this.state.errorMsg}</h2>
        <form onSubmit={(e)=>this.submitHandler(e)}>
          <input type="text" onChange={(e)=>{this.getUserInputHandler(e)}} placeholder="Search by City name, Street, county..."/>
          <input type="submit" value="Explore!"/>
        </form>
        <City cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon}/>
        <br/>
        <img src ={`https://maps.locationiq.com/v3/staticmap?key=pk.e730c42178a78fe83cdbf3950f14dac3&center=${this.state.lat},${this.state.lon}&zoom=1-18`} alt =""/>
        
        {this.state.weatherData && <> {this.state.weatherData.map((e)=>{
           
           return(
           <Weather cityDate={e.date} description ={e.description}/>)
        })}</>}
      </div>
      
    )
  }
}

export default App;