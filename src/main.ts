import { Jume } from '@jume-labs/jume-engine';

import { LoadScene } from './scenes/loadScene';

const jume = new Jume({ name: 'Kenney Jam', designWidth: 800, designHeight: 600 });
jume.launch(LoadScene);
