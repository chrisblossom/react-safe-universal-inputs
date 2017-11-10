'use strict';

/**
 * React 16 requires 'requestAnimationFrame'
 *
 * Can be removed with Jest version >= 21.3.0 (currently unreleased)
 *
 * https://github.com/facebook/jest/issues/4545#issuecomment-332762365
 */
global.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
};
