import React, { useState } from 'react';
import { AppLoading } from 'expo'
import {Asset} from 'expo-asset'
import Navigation from './navigation'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import myReducer from './store/reducers'


const rootReducer = combineReducers({
  myReducer
})

const store = createStore( rootReducer, applyMiddleware(ReduxThunk))

const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const  loadAssetsAsync = async () => {
  const imageAssets = cacheImages([require('./assets/splash.png')]);

  await Promise.all([...imageAssets]);
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => {
          setIsReady(true)
        }}
        onError={console.warn}
      />
    )
  }
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

