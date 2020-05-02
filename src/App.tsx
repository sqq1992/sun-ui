import React from 'react';

import './style/index.less';

import Button from './components/button/Button';

const App: React.FC = () => {
  return (
      <div className="App">
        <div className="button-box">
            <Button type="default" autoFocus={true}>default</Button>
            <Button type="primary">primary</Button>
            <Button type="danger">danger</Button>
            <Button type="link">link</Button>
            <Button size="large">large</Button>
            <Button size="middle" disabled={true}>default</Button>
            <Button size="small">small</Button>
            <Button size="small" target="_blank" href="https://juejin.im/timeline">掘金</Button>
        </div>
      </div>
  );
};

export default App;
