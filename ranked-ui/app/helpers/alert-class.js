import { helper } from '@ember/component/helper';

const className = (color) => `bg-${color}-100 text-${color}-900`;

export default helper(function alertClass([alert] /*, hash*/) {
  switch (alert.status) {
    case 'error':
      return className('red');
    case 'warning':
      return className('yellow');
    case 'success':
      return className('green');
    default:
      return className('indigo');
  }
});
