const inquirer = require('inquirer');

/**
 * 提示并确认
 */
function com(title, def = true) {
  return inquirer
    .prompt({
      type: 'list',
      name: 'select',
      message: title,
      choices: [
        {
          name: '是',
          value: 'y',
        },
        {
          name: '否',
          value: 'n',
        },
      ],
      default: def ? 'y' : 'n',
    })
    .then(({ select }) => {
      return select == 'y';
    });
}

module.exports = { com };
