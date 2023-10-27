// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout';

// ** Menu Items Array
//import navigation from '@src/navigation/vertical'

// ** Navbar Import
import Navbar from './components/navbar';
import verticals from '../navigation/vertical';

const VerticalLayout = (props) => {
  const navs = verticals();
  return (
    <Layout navbar={(props) => <Navbar {...props} />} menuData={navs} {...props}>
      {props.children}
    </Layout>
  );
};

export default VerticalLayout;
