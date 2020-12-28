import React, { Component } from 'react';
class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchLocation:''
        };
        const {updateSearch} = this.props;
        this.submitSearch = () =>{
            updateSearch({searchLocation:this.state.searchLocation});
        };
        this.handleOnChange = (e) => {
            //this line of code extracts the value from e.target object so that i won't have
            //to write the e.target.value again
            const {value} = e.target;
            this.setState({searchLocation: value});
            updateSearch({searchLocation : value});
        }
    }
    render() {
        return <div className="container">
            <h1>Search location</h1>
            <form action="" onSubmit={(e)=> {
                e.preventDefault();
                this.submitSearch()
            }}>
                <div className="form-group">
                    <label htmlFor="">Search location</label>
                    <input type="text" className="form-control" name="searchLocation" onChange={this.handleOnChange} />
                </div>
            </form>
        </div>
    }
}
export default Search;