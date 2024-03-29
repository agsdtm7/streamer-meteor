import React from 'react';
import { Link } from 'react-router';

import { Accounts } from 'meteor/accounts-base';

import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends React.Component{
  // STATE
  constructor(props){
    super(props);
    this.state = {
      // count: this.props.count || 0
      error: ''
    };
  }

  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if(password.length < 9){
      return this.setState({error: 'Password must be more than 8 characters long'});
    }
    // this is how to create an account user
    this.props.createUser({email, password}, (err) => {
      // when there is error, display what the error is (refer to line #41)
      if(err){
        this.setState({error: err.reason});
      }else{
        this.setState({error: ''});
      }
    });
  }

  render(){
    return(
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Join</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                <input type="email" ref="email" name="email" placeholder="email" />
                <input type="password" ref="password" name="password" placeholder="Password" />
                <button className="button">Create Account</button>
            </form>
            <Link to="/login" >Already have an account?</Link>
            </div>
          </div>
    );
  }
}

Signup.propTypes = {
  createUser: React.PropTypes.func.isRequired
};


export default createContainer(() => {
  return{
    createUser: Accounts.createUser
  };
}, Signup);
