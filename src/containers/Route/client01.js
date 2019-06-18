import React, { Component } from 'react';

class FML extends Component {
    state = {  }
    doPost=()=>{ 
        console.log('doPost')
        let a = new FormData(document.form1)
        fetch('http://18.139.60.49:5000/fml', { 
            method: 'POST', 
            body:a, 
             })
        .then(response=>{ 
            return response.json(); })
        .then(obj=>{document.getElementById('output').innerHTML=( JSON.stringify(obj)) }); 
}

    render() { 
        return ( 
            <>
            <div style={{height:'200px'}}></div>
            <div className="container">
              <form name="form1" method="post">
                <input type="text" name="name" /><br />
                <input type="text" name="age" /><br />
                <button type="button" onClick={this.doPost}>click</button>
              </form>
            </div>
            <div id="output" style={{height:'200px'}}></div>
            </>
             );
    }
}
 
export default FML;

