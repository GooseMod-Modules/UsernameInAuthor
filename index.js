import { username } from '@goosemod/patcher';
import { findByProps } from '@goosemod/webpack';
import { React } from '@goosemod/webpack/common';

const MessageClasses = findByProps('compact', 'repliedMessage', 'username');

let unpatch;

export default {
  goosemodHandlers: {
    onImport: () => {
      unpatch = username.patch(({ message, author }) =>
        React.createElement('span', {
          className: [MessageClasses.username, 'authorUsernameHint'].join(' '),
          style: {
            color: author.colorString,
            filter: 'brightness(0.5)',
            marginLeft: author.nick === message.author.username ? '' : '5px'
          }
        }, author.nick === message.author.username ? '' : `(${message.author.username})`
        )
      );
    },

    onRemove: () => {
      unpatch();
    }
  }
};
