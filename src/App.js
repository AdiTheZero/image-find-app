import React from 'react';
import logo from './logo.svg'
import axios from'axios';
import './App.css';
import Button from '@material-ui/core/Button';
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
            image: null
        }
    }

    searchAction() {
        let formData = new FormData()
        var imagedata = this.state.image;
        formData.append('image', imagedata)

        if (imagedata) {
            this.setState({
                imageList: []
            });
            axios.post(
                `${Config.apiUrl}/predict`,
                formData,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            .then((response) => {
                this.setState({imageList: response.data});
            });
        } else {
            alert('Error No file selected');
        }
    }

    handleChange(event) {
        const file = event.target.files[0];
        console.log(file);
        if(file !== undefined && file !== null) {
            console.log(true);
            this.setState({
                image: URL.createObjectURL(file)
            });
        }
    }

    render () {
        return <div className="App"> 
            <img src={logo} className="App-logo" alt="logo" height='100px' width='100px'/>
            <h1>Image Find</h1>
            <h2>An Image Retrieval System</h2>
            <br/>
            <br/>
            <div className="upload-img-container">
                {this.state.image == null ? null : <img src={this.state.image} alt='object to be searched' />}
            </div>
            <br />
            <div>  
                <input type="file" name="image" id="image"  style={{ display: 'none' }} onChange={(event) => this.handleChange(event)}></input>
                <label htmlFor="image">
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
            </div>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={() => this.searchAction()}>Search</Button>
            <br/>
            <br/>
            <div className='container'>
                {this.state.imageList.map( (image, index) => (
                    <div key={index}>   
                        <img loading="lazy" src={`${Config.apiUrl}/getImage/${image.class}?name=${image.name}`} alt={image.name} height='100px' width='100px'></img>
                    </div>
                ))}
            </div>
        </div>
    }
}

export default App