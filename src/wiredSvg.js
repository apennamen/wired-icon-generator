import { RoughSVG } from 'roughjs/bin/svg';

/**
 * Given an svg element, creates a wired version of all its first level children
 * @param rootSvg the svg node to convert
 * @param options roughjs options for render
 */
export function wiredSvg(rootSvg, options) {
    const children = Array.from(rootSvg.children);
    rootSvg.innerHTML = '';
    const rough = new RoughSVG(rootSvg);
    const fragment = document.createDocumentFragment();
    children.forEach(el => fragment.append(_convertElement(rough, el, options)));
    rootSvg.appendChild(fragment);
  }
  
  /**
   * Convert one element to its wired equivalent
   * @param rough rough instance
   * @param child element to convert
   * @param options roughjs options
   */
  function _convertElement(rough, child, options) {
    switch (child.tagName) {
      case 'circle':
        return _convertCircle(rough, child, options);
      case 'ellipse':
        return _convertEllipse(rough, child, options);
      case 'line':
        return _convertLine(rough, child, options);
      case 'path':
        return _convertPath(rough, child, options);
      case 'polyline':
      case 'polygon':
        return _convertPolygon(rough, child, options);
      case 'rect':
        return _convertRect(rough, child, options);
      default:
        return child;
    }
  }
  
  function _convertPath(rough, child, options) {
    const path = child.getAttribute('d');
    if (path) {
      return rough.path(path, options);
    }
    return child;
  }
  
  function _convertPolygon(rough, child, options) {
    const pointsAttr = child.getAttribute('points');
    if (pointsAttr) {
      return rough.polygon(_parsePoints(pointsAttr), options);
    }
    return child;
  }
  
  /**
   * Parse the "points" attribute of a polyline or polygone and convert to Point[]
   * @param pointsString either "1,2 3,4 5,6" or "1 2 3 4 5 6" format
   */
  function _parsePoints(pointsString) {
    const couples = pointsString.split(' ');
    if (pointsString.indexOf(',') >= 0) {
      return couples.map(couple => {
        const buf = couple.split(',');
        return [+buf[0], +buf[1]];
      })
    } else {
      const result = [];
      for (let i = 0; i < couples.length; i+=2) {
        result.push([+couples[i], +couples[i+1]]);
      }
      return result;
    }
  }
  
  function _convertLine(rough, child, options) {
    const x1 = child.getAttribute('x1');
    const y1 = child.getAttribute('y1');
    const x2 = child.getAttribute('x2');
    const y2 = child.getAttribute('y2');
    if (x1 && x2 && y1 && y2) {
      return rough.line(+x1, +y1, +x2, +y2, options);
    }
    return child;
  }
  
  function _convertCircle(rough, child, options) {
    const cx = child.getAttribute('cx');
    const cy = child.getAttribute('cy');
    const r = child.getAttribute('r');
    if (cx && cy && r) {
      return rough.circle(+cx, +cy, +r*2, options);
    }
    return child;
  }
  
  function _convertRect(rough, child, options) {
    const x = child.getAttribute('x');
    const y = child.getAttribute('y');
    const height = child.getAttribute('height');
    const width = child.getAttribute('width');
    if (x && y && height && width) {
      return rough.rectangle(+x, +y, +width, +height, options);
    }
    return child;
  }
  
  function _convertEllipse(rough, child, options) {
    const cx = child.getAttribute('cx');
    const cy = child.getAttribute('cy');
    const rx = child.getAttribute('rx');
    const ry = child.getAttribute('ry');
    if (cx && cy && rx && ry) {
      return rough.ellipse(+cx, +cy, +rx*2, +ry*2, options);
    }
    return child;
  }
  