import Menu from './components/split-pane/Menu';
import React from 'react';
import { IonApp, IonSplitPane } from '@ionic/react';
import {IonReactHashRouter} from '@ionic/react-router';

import Content from "./components/split-pane/Content";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/app.scss';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <Content />
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;