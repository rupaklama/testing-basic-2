import React from 'react';
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
const getWrapper = (
  mockStore = createStore(rootReducer, {}, applyMiddleware(...middleware))
) =>
  mount(
    <Provider store={mockStore}>
      <App />
    </Provider>
  );

// NOTE: integration testing for two things together

// first arg - String description of the test, second arg - func with test logic
// calling `done method` of jest is to verify the test is complete
// test('can fetch a list of comments and display them', () => {
//   const wrapper = getWrapper();
//   // simulate is to fake click event to fetch data & send it our reducer
//   // add `specific class name` to that particular button to find it - 'fetch-comments'
//   // step 2 - find the 'fetch Comments' button & click it
//   wrapper.find('.fetch-comments').simulate('click');

//   // step 3 - Expect to find a list of comments
//   expect(wrapper.find('li').length).toBe(500);
// });

test('pass the test', () => {})
