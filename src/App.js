import React from 'react';
import logo from './logo.svg'
import axios from'axios'
import './App.css'
import BlankImage from './Blank.png'
import Button from '@material-ui/core/Button'
import Config from './config';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageList: [
                // {
                //     name:'',
                //     accuracy: ''
                // }
            ],
            image: BlankImage
        }
    }


    searchAction() {
        
        let formData = new FormData()
        var imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('image', imagedata)

        if (imagedata) {
            // this.setState({image: URL.createObjectURL(imagedata)});
            // alert('h')
            this.setState({
                imageList: []
            });
            axios.post(`${Config.apiUrl}/queryImage`, formData, {headers:{'Content-Type': 'multipart/form-data'}}).then(
            (resp) => {
                //   alert("success")
                axios.get(`${Config.apiUrl}/getResults`).then(
                (response) => {
                        this.setState({imageList: response.data});
                }
                );
            }
            );
        } else {
            alert('Error No file selected')
        }
    }

    handleChange(event) {
        if(event.target.files[0]) {
            this.setState({
            image: URL.createObjectURL(event.target.files[0])
            })
        } else {
            this.setState({
                image: {BlankImage}
            });
        }
    }


    render () {

        return <div className="App"> 
            <img src={logo} className="App-logo" alt="logo" height='100px' width='100px'/>
            <h1>Image Retrieval System</h1>
            {/* <br/>
            <br/>
            <ImageUpload/> */}
            <br/>
            <br/>
            <div>

                <div>
                    <img src={this.state.image} alt='hey' height='200px' width='200px'/>
                    {/* <img src={BlankImage}/> */}
                </div>
                <br/>
                <div>  
                <input type="file" name="image" id="image"  style={{ display: 'none' }} onChange={this.handleChange.bind(this)}></input>
                <label htmlFor="image">
                    <Button variant="raised" component="span">
                        Upload
                    </Button>
                </label> 
                {/* <label for="image">Select image...</label> */}
                </div>
            
            </div>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={this.searchAction.bind(this)}>Search</Button>
            <br/>
            <br/>
            <div className='container'>
                {this.state.imageList.map( (image, index) => (
                    <div key={index}>   
                        <img src={`${Config.apiUrl}/getImage/${image.class}?name=${image.name}`} alt={image.name} height='100px' width='100px'></img>
                    </div>
                ))}
            </div>
        </div>
    }
}

export default App