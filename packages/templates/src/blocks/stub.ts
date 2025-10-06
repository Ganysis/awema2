/**
 * Stub pour compatibilité - Le système de blocs V3 est obsolète
 * TODO: Migrer vers templates HTML directs
 */

import { Block } from '@awema/shared';

export const stubBlock: Block = {
  id: 'stub',
  name: 'Stub Block',
  description: 'Stub block for compatibility',
  category: 'layout',
  tags: ['stub'],
  props: {},
  propControls: {},
  variants: {},
  defaultProps: {},
  render: () => '<div>Stub</div>'
};