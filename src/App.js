import React, { Component } from 'react';
import City from './City';
import axios from 'axios';

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
        <h1>LocationIQ API Demo</h1>
        <h2>{this.state.errorMsg}</h2>
        <form onSubmit={(e)=>this.submitHandler(e)}>
          <input type="text" onChange={(e)=>{this.getUserInputHandler(e)}} placeholder="Search by City name, Street, county..."/>
          <input type="submit" value="Search"/>
        </form>
        <City cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon}/>
        <br/>
        <img src ={`https://maps.locationiq.com/v3/staticmap?key=pk.e730c42178a78fe83cdbf3950f14dac3&center=${this.state.lat},${this.state.lon}&zoom=1-18`} alt =""/>
        
      </div>
    )
  }
}

export default App;