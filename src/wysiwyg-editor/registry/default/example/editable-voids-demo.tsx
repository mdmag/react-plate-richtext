'use client';

import React, { CSSProperties, useState } from 'react';
import { editableProps } from '../../../lib/plate/demo/editableProps';
import { plateUI } from '../../../lib/plate/demo/plateUI';
import { basicNodesPlugins } from '../../../lib/plate/demo/plugins/basicNodesPlugins';
import { exitBreakPlugin } from '../../../lib/plate/demo/plugins/exitBreakPlugin';
import { resetBlockTypePlugin } from '../../../lib/plate/demo/plugins/resetBlockTypePlugin';
import { softBreakPlugin } from '../../../lib/plate/demo/plugins/softBreakPlugin';
import { editableVoidsValue } from '../../../lib/plate/demo/values/editableVoidsValue';
import { createBasicElementsPlugin } from '@udecode/plate-basic-elements';
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break';
import {
  createPluginFactory,
  Plate,
  PlateRenderElementProps,
  TElement,
} from '@udecode/plate-common';
import { createResetNodePlugin } from '@udecode/plate-reset-node';

import { createMyPlugins, MyEditor, MyValue } from '../../../types/plate-types';

export const ELEMENT_EDITABLE_VOID = 'editable-void';

export const createEditableVoidPlugin = createPluginFactory({
  key: ELEMENT_EDITABLE_VOID,
  isElement: true,
  isVoid: true,
});

const editableVoidPlugins = createMyPlugins(
  [
    createBasicElementsPlugin(),
    createResetNodePlugin(resetBlockTypePlugin),
    createSoftBreakPlugin(softBreakPlugin),
    createExitBreakPlugin(exitBreakPlugin),
  ],
  {
    components: plateUI,
  }
);
const styles: Record<string, CSSProperties> = {
  box: { boxShadow: '0 0 0 3px #ddd', padding: '8px' },
  input: { margin: '8px 0' },
  radio: { width: 'unset' },
  editor: { padding: '20px', border: '2px solid #ddd' },
};

export function EditableVoidElement({
  attributes,
  children,
}: PlateRenderElementProps<MyValue, TElement>) {
  const [inputValue, setInputValue] = useState('');

  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes} contentEditable={false}>
      <div style={styles.box}>
        <h4>Name:</h4>
        <input
          style={styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <h4>Left or right handed:</h4>
        <input
          style={styles.radio}
          type="radio"
          name="handedness"
          value="left"
        />{' '}
        Left
        <br />
        <input
          style={styles.radio}
          type="radio"
          name="handedness"
          value="right"
        />{' '}
        Right
        <h4>Tell us about yourself:</h4>
        <div style={styles.editor}>
          <Plate<MyValue, MyEditor>
            id="editable-void-basic-elements"
            plugins={editableVoidPlugins}
            editableProps={editableProps}
          // initialValue={basicElementsValue}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

const plugins = createMyPlugins(
  [
    ...basicNodesPlugins,
    createEditableVoidPlugin({
      component: EditableVoidElement,
    }),
  ],
  {
    components: plateUI,
  }
);

export default function EditableVoidsDemo() {
  return (
    <Plate<MyValue>
      editableProps={editableProps}
      plugins={plugins}
      initialValue={editableVoidsValue}
    />
  );
}
