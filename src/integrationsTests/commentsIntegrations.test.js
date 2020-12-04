import React from 'react';
import moxios from 'moxios';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware } from '../store';

import rootReducer from '../reducers';

// App component is the root component which renders all others components
import App from '../components/App';

// our component depends on the redux store, we must also wrap it in a Provider HOC,
// exported by react-redux. And since the purpose of this tutorial is testing our component fully,
// including the redux side, we must create a 'mock store' for our redux <Provider /> with
// an initial state that satisfies the structure of our reducer. Once that’s done,
// we can render our component using 'mount'

// NOTE: steps for integration testings
// Step 1: attempt to render entire app
const getWrapper = (
  mockStore = createStore(rootReducer, {}, applyMiddleware(...middleware))
) =>
  mount(
    <Provider store={mockStore}>
      <App />
    </Provider>
  );

// Execution steps - when Jest starts up, for every single test,
// Jest will execute first - beforeEach func, second - test statement & afterEach func to unmount
// This process goes again & again for every single test/it statement inside this file

// helper function for code reuse/DRY
// runs before each of our tests
let wrapper;
beforeEach(() => {
  wrapper = getWrapper();
  // setting up Moxios in beforeEach statement
  // telling axios to turn off & if there's any request, moxios will handle it
  moxios.install(); // turn off any requests issued by axios
  // telling moxios if it sees any request going to this api, moxios should response to us
  moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
    // customizing how moxios should handle it
    // second arg is moxios response object that will be return to axios &
    // then to action creator
    // passing network response to axios
    status: 200, // to make axios thinking request was successful
    // faking list of comments with name property
    response: [{ comment: 'Fetched #1' }, { comment: 'Fetched #2' }],
  });
});

// helper function to unmount or clean up component in the JSDOM
// after running tests on FULL DOM render method
afterEach(() => {
  wrapper.unmount();
  
  // turn off moxios to stop making same request again
  moxios.uninstall();
});

// NOTE: integration testing for two things together

// NOTE: when we make ajax request from inside of JSDOM - jest test environment to outside API
// the request will fail, we don't have that ability inside jsdom.
// To make this work, we will use a package - Moxios
// Moxios is to mock axios api/fake network request or to trick axios to make it work
// Using moxios, we can test our app without testing backend server &
// without even running backend server.
// NOTE: Action creator calls axios & axios uses moxios instead of real http api request
// to make ajax request.Then the action creator receives moxios response from axios

// first arg - String description of the test, second arg - func with test logic
// calling `done method` of jest is to verify the test is complete
test('can fetch a list of comments and display them', done => {
  // const wrapper = getWrapper();
  // simulate is to fake click event to fetch data & send it our reducer
  // add `specific class name` to that particular button to find it - 'fetch-comments'
  // step 2 - find the 'fetch Comments' button & click it
  wrapper.find('.fetch-comments').simulate('click');

  // step 3 - Expect to find a list of comments
  // introduce a TINY little pause as for moxios to do its thing
  // setTimeout(() => {

  // wait function is for async operation, works same as setTimeout func
  moxios.wait(() => {
    // to tell our app to update itself
    wrapper.update();

    expect(wrapper.find('li').length).toEqual(2);

    // to verify test is complete
    done();

  
  });
});
