const { React } = Webpack.common;
const MessageClasses = Webpack.findByProps('compact', 'repliedMessage', 'username');


class UsernameInAuthor extends Plugin {
    onImport() {
      this.enqueueUnpatch(Username.patch(({ message, author }) =>
        React.createElement('span', {
          className: MessageClasses.username,
          style: {
            color: author.colorString,
            filter: 'brightness(0.5)',
            marginLeft: author.nick === message.author.username ? '' : '5px'
          }
        }, author.nick === message.author.username ? '' : `(${message.author.username})`
        )
      ));
    }

    onRemove() {
    }
};

export default new UsernameInAuthor();