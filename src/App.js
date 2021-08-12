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
      errorMsg : " ",
      searchQuery : " "
    }
  }

  getUserInputHandler=(e)=>{
    this.setState({
      cityName:e.target.value
    })
    console.log(this.state.cityName);
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
        searchQuery :this.state.className

        
         
      })
     
      }) .catch(err=>{
        console.log(err);
        this.setState({
          errorMsg : `${err}`
        })
        
    });

    this.weather();
  }

  weather= async ()=>{
    const city = this.state.cityName;
    console.log(this.state.cityName);
    let url =`http://localhost:4000/weather?cityName=${city}&format=json`;
    

    let wheatherdata = await axios.get(url)
    await this.setState({
      weatherData :wheatherdata.data,
        errMsg : false
      })
  

      
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