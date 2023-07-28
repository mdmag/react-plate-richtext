import React, { useMemo, useState } from 'react';
import { editableProps } from '../../../lib/plate/demo/editableProps';
import { plateUI } from '../../../lib/plate/demo/plateUI';
import { basicNodesPlugins } from '../../../lib/plate/demo/plugins/basicNodesPlugins';
import { findReplaceValue } from '../../../lib/plate/demo/values/findReplaceValue';
import { Plate } from '@udecode/plate-common';
import { createFindReplacePlugin } from '@udecode/plate-find-replace';

import { createMyPlugins, MyValue } from '../../../libtypes/plate-types';
import { Icons } from '../../../libcomponents/icons';
import { FixedToolbar } from '../../../libregistry/default/plate-ui/fixed-toolbar';

export interface SearchHighlightToolbarProps {
  icon: any;
  setSearch: any;
}

export function SearchHighlightToolbar({
  icon: Icon,
  setSearch,
}: SearchHighlightToolbarProps) {
  return (
    <FixedToolbar className="h-[38px]">
      <div
        style={{
          position: 'relative',
          paddingBottom: '10px',
          marginBottom: '10px',
        }}
      >
        <Icon
          size={18}
          style={{
            position: 'absolute',
            top: '0.5em',
            left: '0.5em',
            color: '#ccc',
          }}
        />
        <input
          data-testid="ToolbarSearchHighlightInput"
          type="search"
          placeholder="Search the text..."
          onChange={(e) => setSearch(e.target.value)}
          style={{
            boxSizing: 'border-box',
            fontSize: '0.85em',
            width: '100%',
            padding: '0.5em',
            paddingLeft: '2em',
            border: '2px solid #ddd',
            background: '#fafafa',
          }}
        />
      </div>
    </FixedToolbar>
  );
}

export default function FindReplaceDemo() {
  const [search, setSearch] = useState('');

  const plugins = useMemo(
    () =>
      createMyPlugins(
        [
          ...basicNodesPlugins,
          createFindReplacePlugin({ options: { search } }),
        ],
        {
          components: plateUI,
        }
      ),
    [search]
  );

  return (
    <>
      <SearchHighlightToolbar icon={Icons.search} setSearch={setSearch} />

      <Plate<MyValue>
        editableProps={editableProps}
        plugins={plugins}
        initialValue={findReplaceValue}
      />
    </>
  );
}
