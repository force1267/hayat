/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';

import LeftMenuLink from '../LeftMenuLink';

import Wrapper from './Wrapper';

import messages from './messages.json';
defineMessages(messages);

function LeftMenuFooter({ version, ...rest }) {
  const staticLinks = [];

  return (
    <Wrapper>
      <ul className="list">
        {staticLinks.map(link => (
          <LeftMenuLink
            {...rest}
            {...link}
            label={messages[link.label].id}
            key={link.label}
          />
        ))}
      </ul>
    </Wrapper>
  );
}

LeftMenuFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default LeftMenuFooter;
