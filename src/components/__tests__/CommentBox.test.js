import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware } from '../../store';
import rootReducer from '../../reducers';

import CommentBox from '../CommentBox';

// Testing functional components that use useDispatch and useSelector hooks
// can be slightly different than regular connected component testing.
// This test setup demonstrates a foolproof way of testing components that works for
// both kinds of components (components that are using these hooks or connected components).

// NOTE: Avoid using 'redux-mock-store'
// Because if your reducers fails, the mock-store method will not catch it.
// Instead use Real Redux Store. Your reducer automatically gets initialized with the correct initial state.

// our component depends on the redux store, we must also wrap it in a Provider HOC,
// exported by react-redux. And since the purpose of this tutorial is testing our component fully,
// including the redux side, we must create a 'mock store' for our redux <Provider /> with
// an initial state that satisfies the structure of our reducer. Once that’s done,
// we can render our component using 'mount'

// 'mount' is Full DOM rendering - Render the parent component & all of its children
// instead of shallow, we will use Full DOM render method here since we are using react-redux hooks
// which renders the component & all of its children components too
// Note: unlike shallow or static rendering, full rendering actually mounts
// the component in the DOM, which means that tests can affect each other
// if they are all using the same DOM. Keep that in mind while writing your tests and,
// if necessary, use .unmount() or something similar as CLEANUP on our virtual DOM
// to `unmount our test component` to prevent issues with other components being created inside of other tests. 
const getWrapper = (
  mockStore = createStore(rootReducer, {}, applyMiddleware(...middleware))
) =>
  mount(
    <Provider store={mockStore}>
      <CommentBox />
    </Provider>
  )

// Execution steps - when Jest starts up, for every single test,
// Jest will execute first - beforeEach func, second - test statement & afterEach func to unmount
// This process goes again & again for every single test/it statement inside this file

// helper function for code reuse/DRY
// runs before each of our tests
let wrapper;
beforeEach(() => {
  wrapper = getWrapper()
});

// helper function to unmount or clean up component in the JSDOM
// after running tests on FULL DOM render method
afterEach(() => {
 wrapper.unmount();
});

test('has a text area and a button', () => {
  // const wrapper = getWrapper();
  // console.log(wrapper.find("textarea").length);
  // console.log(wrapper.find("button").length);
  expect(wrapper.find('textarea').length).toBe(1);
  expect(wrapper.find('button').length).toBe(2);
});

// following Steps of Simulating/Faking Events
// 1. Find the textarea element - wrapper.find('textarea')
// 2. Simulate/fake a 'change' event - .simulate(event,[mock]) method of enzyme
// simulate(event,[mock]) method - first arg is html DOM event & second arg [mock] is fake event object
// 3. Provide html DOM event & mock event object 'e.target.value' in simulate method
// 4. Force the component to re-render -  to avoid
//    default behaviour of react where react does it asynchronously taking some time to re-render,
//    we can use enzyme's 'update()' func to re-render right away after we update component's state
// 5. Expectation - Assert that text areas value has changed

// making sure the text input is working & storing input values
test('has a text area that users can type in', () => {
  // const wrapper = getWrapper();
  // simulate takes first arg -  html name of the DOM event
  // Second arg is the mock event object that will be merged with the event object - (e)
  // & passed to our event handlers - handleChange = e => {}
  wrapper
    .find('textarea')
    // second arg - mock event object 'e.target.value' in simulate method
    .simulate('change', { target: { value: 'new comment' } }); // Creating state object - with mock event & value

  // Forcing the component to re-render when comment state gets updated with our mock event object above
  // to mock default behaviour of react to update state with new data
  wrapper.update();

  // assertion that text area got our new value/state - 'new comment'
  // .prop(key) allows us to access props passed into any element into
  // our react components like value={}, onChange={}, onSubmit={}
  expect(wrapper.find('textarea').prop('value')) // value attribute in <textarea />
    .toBe('new comment');
});

// we need to make sure text area has some text inside of it.
// If we submit a form without a text in it, we are not doing a very good test.
// So, we will add string value of 'new comment' in our text area element
// mocking the form - pretending that the text - 'new comment' is inside of text area element
// to submit a form with a text

// we need to simulate 'submit event' on the form itself
test('when form is submitted, text area gets emptied', () => {
  // const wrapper = getWrapper();
  wrapper
    .find('textarea')
    // mock/fake event object of 'e.target.value' which sets our comment state with value - 'new comment'
    .simulate('change', { target: { value: 'new comment' } });

  // forcing our component to update right away to apply new state of 'new comment'
  wrapper.update();

  expect(wrapper.find('textarea').prop('value')) // value attribute in <textarea />
    .toBe('new comment');

  // now making attempt to Submit the form itself to verify if textarea gets emptied out after submitting
  // When we simulate event, we use normal 'html name' of the event
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  // ADD { preventDefault: () => {},} as a second arg in simulate func to mock e.preventDefault()
  // & to avoid undefined issue with Shallow render
  // type error: cannot read property 'preventdefault' of undefined
  // To mock, e.preventDefault()
  // NOTE - this is an issue only when using shallow enzyme renderer.
  // In case of full DOM renderer mount, the event object contains the preventDefault method, therefore you don't have to mock it.

  // when we submit the form, it will call - handleSubmit func
  // which will change our state value to empty string by calling setComment('') to clear the form values
  // setComment('') is a async operation, so we need to force our component to update
  // in order to change our state value to initial state of '' after submitting form
  // forcing our component to update right away to update comment state to '' - initial state
  wrapper.update();

  // comment state to be empty string - const [comment, setComment] = useState('');
  expect(wrapper.find('textarea').prop('value')).toBe('');
});
