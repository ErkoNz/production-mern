import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [state, setState] = useState({
    title: '',
    body: '',
    posts: []
  })

  useEffect(() => {
    getBlogPost()
  }, []);

  const getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        setState(prevState => {
          return { ...prevState, posts: data }
        })
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value }
    })
  };


  const submit = (event) => {
    event.preventDefault();

    const payload = {
      title: state.title,
      body: state.body
    };

    axios({
      url: '/api/save',
      // url: 'http://localhost:8080/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        resetUserInputs();
        getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  const resetUserInputs = () => {
    setState({
      title: '',
      body: ''
    });
  };

  const displayBlogPost = () => {
    if (!state.posts.length) return null;
    return state.posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  };



  return (
    <div className="app">
      {state.posts ?
        <>
          {console.log("render")}
          <h2>Welcome to the best app ever</h2>
          <form
            onSubmit={submit}
          >
            <div className="form-input">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={state.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <textarea
                placeholder="body"
                name="body"
                cols="30"
                rows="10"
                value={state.body}
                onChange={handleChange}
              >
              </textarea>
            </div>

            <button>Submit</button>
          </form>
          <div className="blog-">
            {displayBlogPost()}
          </div>
        </> : null}
    </div>
  );
}

export default App;
