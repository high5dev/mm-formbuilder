// ** React Imports
import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

// ** Redux Imports
import { Provider } from 'react-redux';
import { store } from './redux/store';

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability';
import { ToastContainer } from 'react-toastify';
import { AbilityContext } from './utility/context/Can';
import { ThemeContext } from './utility/context/ThemeColors';

// ** i18n
import './configs/i18n';

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner';

// ** Ripple Button
import './@core/components/ripple-button';

// ** Fake Database
import './@fake-db';

// ** PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx.min';

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss';

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css';
import './assets/fonts/signatureFonts/signaturefonts.css';
import './@core/scss/core.scss';
import './assets/scss/style.scss';
import './assets/styles/extra-colors.scss';

// ** Service Worker
import * as serviceWorker from './serviceWorker';
// ** Axios Provider
import { AxiosProvider } from './lib/AxiosProvider';
import { DocumentProvider } from './utility/context/Document';
import { TemplateProvider } from './utility/context/Template';


// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <>

  <AxiosProvider>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <TemplateProvider>
              <DocumentProvider>
                <LazyApp />
                <ToastContainer newestOnTop />
              </DocumentProvider>
            </TemplateProvider>
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </AxiosProvider>
  </>,
  document.getElementById('root')
);
//

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
