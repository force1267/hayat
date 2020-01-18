import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor-build-with-simple-upload-provider-strapi-with-image-resize';
import styled from 'styled-components';
import { auth } from 'strapi-helper-plugin';

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const Editor = ({ onChange, name, value }) => {

  const jwtToken = auth.getToken();

  return (
    <Wrapper>
    <CKEditor
  editor={ClassicEditor}
  data={value}
  onChange={(event, editor) => {
    const data = editor.getData();
    onChange({ target: { name, value: data } });
  }}
  config={{
    simpleUpload: {
      // TODO use configs. change this for host change. 
      uploadUrl: `https://hayatemoon.com/upload`, // `${strapi.backendURL}/upload`
        headers: {
          Authorization: "Bearer " + jwtToken
      }
    }
  }}
  />
  </Wrapper>
);
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Editor;