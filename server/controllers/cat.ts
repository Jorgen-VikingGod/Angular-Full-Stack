import BaseCtrl from './base';
import { Cat } from 'models/cat';

class CatCtrl extends BaseCtrl {
  model = [
    { id: '1', name: 'Tommy', weight: 20, age: 6 },
    { id: '2', name: 'Jerry', weight: 14, age: 11 },
  ] as Cat[];
}

export default CatCtrl;
