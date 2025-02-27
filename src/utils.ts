import { Response, Request, Router, NextFunction } from 'express';
import { ILayer } from 'express-serve-static-core';

interface Layer extends ILayer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle: Router | ((req: Request, res: Response, next: NextFunction) => any);
}
export function printRoutes(path: string[], layer: Layer) {
  if (layer.route) {
    layer.route.stack.forEach(printRoutes.bind(null, path.concat(split(layer.route.path))));
  } else if (layer.name === 'router' && (layer.handle as Router).stack) {
    (layer.handle as Router).stack.forEach(printRoutes.bind(null, path.concat(split(layer.regexp))));
  } else if (layer.method) {
    console.log('%s\t/%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'));
  }
}
function split(thing: string | RegExp) {
  if (typeof thing === 'string') {
    return thing.split('/');
    //} else if (thing.fast_slash) {
    //return '';
  } else {
    const match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>';
  }
}

