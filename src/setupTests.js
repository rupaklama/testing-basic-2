// Jest will run this test configuration file before running all our tests

// Enzyme configurations
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// set up enzyme's react adapter
// new instance of adapter
Enzyme.configure({ adapter: new Adapter() });
