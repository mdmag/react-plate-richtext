import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';

import { MyPlatePlugin } from '../../../../types/plate-types';

export const trailingBlockPlugin: Partial<MyPlatePlugin<TrailingBlockPlugin>> =
  {
    options: { type: ELEMENT_PARAGRAPH },
  };
