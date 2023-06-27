import React from "react";
import { connect } from "react-redux";
import { httpRequest } from "../actions/actions";
//import PropTypes from 'prop-types'

function Button({ getCredential, token }) {
  return (
    <>
      <button onClick={() => getCredential("eve.holt@reqres.in", "1234")}>
        Obtain token
      </button>
      <p>{token && token}</p>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCredential: (email, pass) => {
      const data = {
        email,
        password: pass,
      };

      const url = "https://reqres.in/api/login";

      dispatch(httpRequest("post", url, data));
    },
  };
};

Button = connect(mapStateToProps, mapDispatchToProps)(Button);

export default Button;
