/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/SvgCanvas.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/red-agate-svg-canvas/modules/drawing/canvas/SvgCanvas.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvgCanvas": () => (/* binding */ SvgCanvas),
/* harmony export */   "SvgCanvas2DGradient": () => (/* binding */ SvgCanvas2DGradient),
/* harmony export */   "SvgCanvas2DLinerGradient": () => (/* binding */ SvgCanvas2DLinerGradient),
/* harmony export */   "SvgCanvas2DPattern": () => (/* binding */ SvgCanvas2DPattern),
/* harmony export */   "SvgCanvas2DRadialGradient": () => (/* binding */ SvgCanvas2DRadialGradient),
/* harmony export */   "SvgCanvasImageData": () => (/* binding */ SvgCanvasImageData)
/* harmony export */ });
/* harmony import */ var red_agate_util_modules_convert_TextEncoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! red-agate-util/modules/convert/TextEncoding */ "./node_modules/red-agate-util/modules/convert/TextEncoding.js");
/* harmony import */ var red_agate_util_modules_convert_Base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! red-agate-util/modules/convert/Base64 */ "./node_modules/red-agate-util/modules/convert/Base64.js");
/* harmony import */ var red_agate_util_modules_convert_Escape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! red-agate-util/modules/convert/Escape */ "./node_modules/red-agate-util/modules/convert/Escape.js");
/* harmony import */ var red_agate_util_modules_convert_WordWrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! red-agate-util/modules/convert/WordWrap */ "./node_modules/red-agate-util/modules/convert/WordWrap.js");
/* harmony import */ var _WebColor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebColor */ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/WebColor.js");
/* harmony import */ var _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TransferMatrix2D */ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/TransferMatrix2D.js");
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln






class SvgCanvasImageData {
  constructor(url, x, y, width, height) {
    this.url = url;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

}
class SvgCanvas2DGradient {}
class SvgCanvas2DLinerGradient extends SvgCanvas2DGradient {
  constructor(id, x0, y0, x1, y1) {
    super();
    this.id = id;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.content = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" >\n`;
  }

  addColorStop(offset, color, opacity = 1) {
    this.content += `<stop offset="${offset}" stop-color="${color}" stop-opacity="${opacity}" />\n`;
  }

  toDef() {
    return this.content + "</linearGradient>";
  }

  toString() {
    return `url(#${this.id})`;
  }

}
class SvgCanvas2DRadialGradient extends SvgCanvas2DGradient {
  /** fr is ignored. fr is always 0. */
  constructor(id, cx, cy, r, fx, fy) {
    super();
    this.id = id;
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.fx = fx;
    this.fy = fy;
    this.content = `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}" >\n`;
  }

  addColorStop(offset, color, opacity = 1) {
    this.content += `<stop offset="${offset}" stop-color="${color}" stop-opacity="${opacity}" />\n`;
  }

  toDef() {
    return this.content + "</radialGradient>";
  }

  toString() {
    return `url(#${this.id})`;
  }

}
class SvgCanvas2DPattern {
  constructor(id, imageData) {
    this.id = id;
    this.imageData = imageData;
  }

  toDef() {
    const content = `<image x="0" y="0" width="${this.imageData.width}" height="${this.imageData.height}" \n` + `xlink:href="${this.imageData.url}" />`;
    return `<pattern id="${this.id}"  patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" ` + `x="${this.imageData.x}" y="${this.imageData.y}" ` + `width="${this.imageData.width}" height="${this.imageData.height}">${content}</pattern>`;
  }

  toString() {
    return `url(#${this.id})`;
  }

}

class SvgCanvasGraphicState {
  constructor(src) {
    this.globalAlpha = 1;
    /**
     * canvas: source-over|source-in|source-out|source-atop|
     *         destination-over|destination-in|destination-out|destination-atop|
     *         lighter|copy|xor
     *    svg: over|in|out|atop|xor|arithmetic
     */

    this.globalCompositeOperation = "source-over";
    this.shadowBlur = 0;
    /**
     * canvas   : <'web-color'>|#000|#000000|rgb(0,0,0)|rgba(0,0,0,0)
     * SvgCanvas: rgb(0,0,0)|rgba(0,0,0,0)
     */

    this.shadowColor = "rgba(0,0,0,1)";
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.filterIdUrl = null;
    /**
     * canvas: "italic bold 26px 'Times New Roman'"
     *    svg: font-family ="Times New Roman"
     *         font-style  =normal|italic|oblique
     *         font-variant=normal|small-caps
     *         font-weight =normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900
     *         font-stretch=normal|wider|narrower|ultra-condensed|extra-condensed|condensed|
     *                      semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded
     *         font-size   =<absolute-size>|<relative-size>|<length>|<percentage>
     *         font-size-adjust=<number>|none
     *         font        =[[<'font-style'>||<'font-variant'>||<'font-weight'>]?<'font-size'>[/<'line-height'>]?<'font-family'>]
     */

    this.font = "normal 12px 'Times New Roman'";
    /**
     * text-anchor
     * canvas:start|end|left|right|center
     *    svg:start|middle|end
     */

    this.textAlign = "start";
    /**
     * dominant-baseline
     * default is 'auto'.
     * canvas:top|hanging|middle|alphabetic|ideographic|bottom
     *        ('alphabetic' is default)
     *    svg:auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge
     *        ('auto' is default. 'auto's effective value is depends on writing mode. if mode is horizontal then it is alphabetic. else then it is central)
     */

    this.textBaseline = "auto";
    /**
     * stroke-linecap
     * butt|round|square
     */

    this.lineCap = "butt";
    this.lineDashOffset = 0;
    /**
     * stroke-linejoin
     * miter|round|bevel
     */

    this.lineJoin = "miter";
    this.lineWidth = 1;
    this.miterLimit = 4;
    this.strokeStyle = "black";
    this.fillStyle = "black";
    this.ctm = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D();
    this.currentPoint = null;
    this.currentPointOnCtm = null;
    this.subpath = [];
    this.lineDash = [];
    this.clipPath = "";
    if (!src) return;

    for (const key in this) {
      if (this.hasOwnProperty(key) && src.hasOwnProperty(key)) {
        this[key] = src[key];
      }
    }

    this.subpath = Array.from(this.subpath);
  }

}
/**
 * subset of CanvasRenderingContext2D
 */


class SvgCanvas {
  constructor() {
    this.graphicsStack = [];
    this.assets = [];
    this.content = "";
    this.contentSaved = "";
    this.idCount = 0;
    this.template = null; // tslint:disable-next-line:variable-name

    this._fontHeightRatio = 1.25;
    this.graphicsStack.push(new SvgCanvasGraphicState());
  }

  get globalAlpha() {
    return this.graphicsStack[this.graphicsStack.length - 1].globalAlpha;
  }

  set globalAlpha(value) {
    this.graphicsStack[this.graphicsStack.length - 1].globalAlpha = value;
  }

  get globalCompositeOperation() {
    return this.graphicsStack[this.graphicsStack.length - 1].globalCompositeOperation;
  }

  set globalCompositeOperation(value) {
    this.filterIdUrl = null;
    this.graphicsStack[this.graphicsStack.length - 1].globalCompositeOperation = value;
  }

  get shadowBlur() {
    return this.graphicsStack[this.graphicsStack.length - 1].shadowBlur;
  }

  set shadowBlur(value) {
    this.filterIdUrl = null;
    this.graphicsStack[this.graphicsStack.length - 1].shadowBlur = value;
  }

  get shadowColor() {
    return this.graphicsStack[this.graphicsStack.length - 1].shadowColor;
  }

  set shadowColor(value) {
    this.filterIdUrl = null;
    this.graphicsStack[this.graphicsStack.length - 1].shadowColor = value;
  }

  get shadowOffsetX() {
    return this.graphicsStack[this.graphicsStack.length - 1].shadowOffsetX;
  }

  set shadowOffsetX(value) {
    this.filterIdUrl = null;
    this.graphicsStack[this.graphicsStack.length - 1].shadowOffsetX = value;
  }

  get shadowOffsetY() {
    return this.graphicsStack[this.graphicsStack.length - 1].shadowOffsetY;
  }

  set shadowOffsetY(value) {
    this.filterIdUrl = null;
    this.graphicsStack[this.graphicsStack.length - 1].shadowOffsetY = value;
  }

  get filterIdUrl() {
    return this.graphicsStack[this.graphicsStack.length - 1].filterIdUrl;
  }

  set filterIdUrl(value) {
    this.graphicsStack[this.graphicsStack.length - 1].filterIdUrl = value;
  }
  /**
   * canvas: "italic bold 26px 'Times New Roman'"
   *    svg: font-family ="Times New Roman"
   *         font-style  =normal|italic|oblique
   *         font-variant=normal|small-caps
   *         font-weight =normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900
   *         font-stretch=normal|wider|narrower|ultra-condensed|extra-condensed|condensed|
   *                      semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded
   *         font-size   =<absolute-size>|<relative-size>|<length>|<percentage>
   *         font-size-adjust=<number>|none
   *         font        =[[<'font-style'>||<'font-variant'>||<'font-weight'>]?<'font-size'>[/<'line-height'>]?<'font-family'>]
   */


  get font() {
    return this.graphicsStack[this.graphicsStack.length - 1].font;
  }
  /**
   * canvas: "italic bold 26px 'Times New Roman'"
   *         [<‘font-style’>||<font-variant>||<‘font-weight’>||<‘font-stretch’>]?<‘font-size’>[/<‘line-height’>]?<‘font-family’>
   *
   *    svg: font-family ="Times New Roman"
   *         font-style  =normal|italic|oblique
   *         font-variant=normal|small-caps
   *         font-weight =normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900
   *         font-stretch=normal|wider|narrower|ultra-condensed|extra-condensed|condensed|
   *                      semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded
   *         font-size   =<absolute-size>|<relative-size>|<length>|<percentage>
   *         font-size-adjust=<number>|none
   *         font        =[<'font-style'>||<'font-variant'>||<'font-weight'>]?<'font-size'>[/<'line-height'>]?<'font-family'>
   */


  set font(value) {
    this.graphicsStack[this.graphicsStack.length - 1].font = value;
  }
  /**
   * text-anchor
   * canvas:start|end|left|right|center
   *    svg:start|middle|end
   */


  get textAlign() {
    return this.graphicsStack[this.graphicsStack.length - 1].textAlign;
  }
  /**
   * text-anchor
   * canvas:start|end|left|right|center
   *    svg:start|middle|end
   */


  set textAlign(value) {
    this.graphicsStack[this.graphicsStack.length - 1].textAlign = value;
  }
  /**
   * dominant-baseline
   * canvas:top|hanging|middle|alphabetic|ideographic|bottom
   *    svg:auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge
   */


  get textBaseline() {
    return this.graphicsStack[this.graphicsStack.length - 1].textBaseline;
  }
  /**
   * dominant-baseline
   * canvas:top|hanging|middle|alphabetic|ideographic|bottom
   *    svg:auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge
   */


  set textBaseline(value) {
    this.graphicsStack[this.graphicsStack.length - 1].textBaseline = value;
  }
  /**
   * stroke-linecap
   * butt|round|square
   */


  get lineCap() {
    return this.graphicsStack[this.graphicsStack.length - 1].lineCap;
  }
  /**
   * stroke-linecap
   * butt|round|square
   */


  set lineCap(value) {
    this.graphicsStack[this.graphicsStack.length - 1].lineCap = value;
  }

  get lineDashOffset() {
    return this.graphicsStack[this.graphicsStack.length - 1].lineDashOffset;
  }

  set lineDashOffset(value) {
    this.graphicsStack[this.graphicsStack.length - 1].lineDashOffset = value;
  }
  /**
   * stroke-linejoin
   * miter|round|bevel
   */


  get lineJoin() {
    return this.graphicsStack[this.graphicsStack.length - 1].lineJoin;
  }
  /**
   * stroke-linejoin
   * miter|round|bevel
   */


  set lineJoin(value) {
    this.graphicsStack[this.graphicsStack.length - 1].lineJoin = value;
  }

  get lineWidth() {
    return this.graphicsStack[this.graphicsStack.length - 1].lineWidth;
  }

  set lineWidth(value) {
    this.graphicsStack[this.graphicsStack.length - 1].lineWidth = value;
  }

  get miterLimit() {
    return this.graphicsStack[this.graphicsStack.length - 1].miterLimit;
  }

  set miterLimit(value) {
    this.graphicsStack[this.graphicsStack.length - 1].miterLimit = value;
  }

  get strokeStyle() {
    return this.graphicsStack[this.graphicsStack.length - 1].strokeStyle;
  }

  set strokeStyle(value) {
    this.graphicsStack[this.graphicsStack.length - 1].strokeStyle = value.toString();
  }

  get fillStyle() {
    return this.graphicsStack[this.graphicsStack.length - 1].fillStyle;
  }

  set fillStyle(value) {
    this.graphicsStack[this.graphicsStack.length - 1].fillStyle = value.toString();
  }

  get ctm() {
    return this.graphicsStack[this.graphicsStack.length - 1].ctm;
  }

  set ctm(value) {
    this.graphicsStack[this.graphicsStack.length - 1].ctm = value;
  }

  get currentPoint() {
    return this.graphicsStack[this.graphicsStack.length - 1].currentPoint;
  }

  set currentPoint(value) {
    this.graphicsStack[this.graphicsStack.length - 1].currentPoint = value;
  }

  get currentPointOnCtm() {
    return this.graphicsStack[this.graphicsStack.length - 1].currentPointOnCtm;
  }

  set currentPointOnCtm(value) {
    this.graphicsStack[this.graphicsStack.length - 1].currentPointOnCtm = value;
  }

  get subpath() {
    return this.graphicsStack[this.graphicsStack.length - 1].subpath;
  }

  set subpath(value) {
    this.graphicsStack[this.graphicsStack.length - 1].subpath = value;
  }

  get lineDash() {
    return this.graphicsStack[this.graphicsStack.length - 1].lineDash;
  }

  set lineDash(value) {
    this.graphicsStack[this.graphicsStack.length - 1].lineDash = value;
  }

  get clipPath() {
    return this.graphicsStack[this.graphicsStack.length - 1].clipPath;
  }

  set clipPath(value) {
    this.graphicsStack[this.graphicsStack.length - 1].clipPath = value;
  }

  get subpathIsEmptyOrClosed() {
    return this.subpath.length === 0 || this.subpath[this.subpath.length - 1] === "Z";
  }

  static fromTemplate(template) {
    const c = new SvgCanvas();
    c.template = template;
    c.idCount = new Date().getTime();
    return c;
  }

  render(viewbox, unit = "mm") {
    const svgns = `xmlns="http://www.w3.org/2000/svg"`;
    const xlinkns = `xmlns:xlink="http://www.w3.org/1999/xlink"`;
    const vbox = `viewBox="${viewbox.x} ${viewbox.y} ${viewbox.w} ${viewbox.h}"`;
    const defs = `<defs>\n${this.assets.map(x => typeof x === "string" ? x : x.toDef()).join("\n")}</defs>`;

    if (!this.template) {
      return `<svg ${svgns} ${xlinkns} version="1.1" width="${viewbox.w}${unit}" height="${viewbox.h}${unit}" ${vbox}>\n${defs}\n${this.contentSaved}${this.content}</svg>`;
    } else {
      let tmpl = this.template.replace(/<\/svg>\s*$/, '');
      {
        const re = /(<svg[^>]*?)\s+?width\s*?=\s*?["'](?:[^"'>]+?)["']([^>]*?>)/;

        if (re.test(tmpl)) {
          tmpl = tmpl.replace(re, `$1 width="${viewbox.w}${unit}"$2`);
        } else {
          tmpl = tmpl.replace(/<svg\s/, `<svg width="${viewbox.w}${unit}" `);
        }
      }
      {
        const re = /(<svg[^>]*?)\s+?height\s*?=\s*?["'](?:[^"'>]+?)["']([^>]*?>)/;

        if (re.test(tmpl)) {
          tmpl = tmpl.replace(re, `$1 height="${viewbox.h}${unit}"$2`);
        } else {
          tmpl = tmpl.replace(/<svg\s/, `<svg height="${viewbox.h}${unit}" `);
        }
      }
      {
        const re = /(<svg[^>]*?)\s+?viewBox\s*?=\s*?["'](?:[^"'>]+?)["']([^>]*?>)/;

        if (re.test(tmpl)) {
          tmpl = tmpl.replace(re, `$1 ${vbox}$2`);
        } else {
          tmpl = tmpl.replace(/<svg\s/, `<svg ${vbox} `);
        }
      }

      if (!tmpl.match(/<svg[^>]*?\s+?xmlns:xlink\s*?=/)) {
        tmpl = tmpl.replace(/<svg\s/, `<svg ${xlinkns} `);
      }

      if (!tmpl.match(/<svg[^>]*?\s+?xmlns\s*?=/)) {
        tmpl = tmpl.replace(/<svg\s/, `<svg ${svgns} `);
      }

      return `${tmpl}\n${defs}\n${this.contentSaved}${this.content}</svg>`;
    }
  }

  toDataUrl(viewbox, unit = "mm", lineLength = 120) {
    return "data:image/svg+xml;base64," + red_agate_util_modules_convert_Base64__WEBPACK_IMPORTED_MODULE_1__.Base64.encode(red_agate_util_modules_convert_TextEncoding__WEBPACK_IMPORTED_MODULE_0__.TextEncoding.encodeToUtf8(this.render(viewbox, unit)), lineLength);
  }
  /** postscript gsave */


  save() {
    const s = new SvgCanvasGraphicState(this.graphicsStack[this.graphicsStack.length - 1]);
    this.graphicsStack.push(s);
  }
  /** postscript grestore */


  restore(restorePath = false) {
    if (restorePath) {
      if (0 < this.graphicsStack.length) this.graphicsStack.pop();
    } else {
      if (0 < this.graphicsStack.length) {
        const subpath = this.subpath;
        const cpt = this.currentPoint;
        const cptoctm = this.currentPointOnCtm;
        this.graphicsStack.pop();
        this.subpath = subpath;
        this.currentPoint = cpt;
        this.currentPointOnCtm = cptoctm;
      }
    }
  }
  /** postscript x y scale */


  scale(x, y) {
    if (this.currentPointOnCtm !== null) {
      const tm = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D().scale(x, y);
      this.currentPointOnCtm = tm.transfer(this.currentPointOnCtm);
    }

    this.ctm = this.ctm.scale(x, y);
  }
  /** postscript x y translate */


  translate(x, y) {
    if (this.currentPointOnCtm !== null) {
      const tm = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D().translate(x, y);
      this.currentPointOnCtm = tm.transfer(this.currentPointOnCtm);
    }

    this.ctm = this.ctm.translate(x, y);
  }
  /** postscript (angle*180/PI) rotate */


  rotate(angle) {
    if (this.currentPointOnCtm !== null) {
      const tm = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D().rotate(angle);
      this.currentPointOnCtm = tm.transfer(this.currentPointOnCtm);
    }

    this.ctm = this.ctm.rotate(angle);
  }
  /** postscript [m11 m12 m21 m22 dx dy] concat */


  transform(m11, m12, m21, m22, dx, dy) {
    const tm = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D(m11, m12, m21, m22, dx, dy);
    if (this.currentPointOnCtm !== null) this.currentPointOnCtm = tm.transfer(this.currentPointOnCtm);
    this.ctm = this.ctm.concat(tm);
  }
  /** postscript [m11 m12 m21 m22 dx dy] setmatrix */


  setTransform(m11, m12, m21, m22, dx, dy) {
    this.currentPointOnCtm = null;
    this.ctm = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D(m11, m12, m21, m22, dx, dy);
  }
  /** postscript newpath */


  beginPath() {
    this.subpath = [];
    this.currentPoint = null;
    this.currentPointOnCtm = null;
  }
  /** postscript closepath */


  closePath() {
    this.subpath.push("Z");
    this.currentPoint = null;
    this.currentPointOnCtm = null;
  }
  /** postscript x y moveto */


  moveTo(x, y) {
    const p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y);
    this.subpath.push("M", this.ctm.transfer(p));
    this.currentPoint = this.subpath[this.subpath.length - 1];
    this.currentPointOnCtm = p;
  }
  /** postscript x y lineto */


  lineTo(x, y, ...extra) {
    let p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y);
    this.subpath.push("L", this.ctm.transfer(p));

    if (extra && extra.length % 4 === 0) {
      for (let i = 0; i < extra.length; i += 2) {
        if (extra.length <= i + 1) break;
        p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(extra[i], extra[i + 1]);
        this.subpath.push(this.ctm.transfer(p));
      }
    }

    this.currentPoint = this.subpath[this.subpath.length - 1];
    this.currentPointOnCtm = p;
  }

  quadraticCurveTo(cpx, cpy, x, y, ...extra) {
    let p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y);
    this.subpath.push("Q", this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(cpx, cpy)), this.ctm.transfer(p));

    if (extra && extra.length % 4 === 0) {
      for (let i = 0; i < extra.length; i += 2) {
        if (extra.length <= i + 1) break;
        p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(extra[i], extra[i + 1]);
        this.subpath.push(this.ctm.transfer(p));
      }
    }

    this.currentPoint = this.subpath[this.subpath.length - 1];
    this.currentPointOnCtm = p;
  }
  /** postscript cp1x cp1y cp2x cp2y x y curveto */


  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y, ...extra) {
    let p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y);
    this.subpath.push("C", this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(cp1x, cp1y)), this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(cp2x, cp2y)), this.ctm.transfer(p));

    if (extra && extra.length % 6 === 0) {
      for (let i = 0; i < extra.length; i += 2) {
        p = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(extra[i], extra[i + 1]);
        this.subpath.push(this.ctm.transfer(p));
      }
    }

    this.currentPoint = this.subpath[this.subpath.length - 1];
    this.currentPointOnCtm = p;
  }
  /**
   * postscript arc / arcn
   * anticlockwise= true: x y startAngle endAngle arc
   * anticlockwise=false: x y startAngle endAngle arcn
   * center: (x,y)
   */


  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    const entired = Math.abs(endAngle - startAngle) >= 2 * Math.PI;
    if (Math.abs(startAngle) > 2 * Math.PI) startAngle = startAngle % (2 * Math.PI);
    if (startAngle < 0) startAngle = 2 * Math.PI + startAngle;
    if (Math.abs(endAngle) > 2 * Math.PI) endAngle = endAngle % (2 * Math.PI);
    if (endAngle < 0) endAngle = 2 * Math.PI + endAngle;

    if (entired) {
      endAngle = startAngle + 2 * Math.PI;
    } else {
      if (anticlockwise) {
        [startAngle, endAngle] = [endAngle, startAngle];
      }

      if (endAngle < startAngle) {
        endAngle = endAngle + 2 * Math.PI;
      }
    }

    let angle = endAngle - startAngle;
    let r = 0;
    const PI_2 = Math.PI / 2; // approximate the arc by a Bezier curve.

    const k0 = 4 * (Math.sqrt(2) - 1) / 3; // 0.55228474983...

    const tm0 = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.TransferMatrix2D().translate(x, y).scale(radius, radius);
    let points = []; // tslint:disable-next-line:ban-comma-operator

    for (; PI_2 < angle; r += PI_2, angle -= PI_2) {
      const tm = tm0.rotate(startAngle + r);
      if (points.length === 0) points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(1, 0)));
      points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(1, k0)));
      points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(k0, 1)));
      points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(0, 1)));
    }

    const k1 = 4 * Math.tan(angle / 4) / 3;
    {
      const tm = tm0.rotate(startAngle + r);
      if (points.length === 0) points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(1, 0)));
      points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(1, k1)));
      points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(Math.cos(angle) + k1 * Math.sin(angle), Math.sin(angle) - k1 * Math.cos(angle))));
      points.push(tm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(Math.cos(angle), Math.sin(angle))));
    }
    if (anticlockwise) points = points.reverse();
    const p = points[points.length - 1];
    points = points.map(pt => this.ctm.transfer(pt));
    this.subpath.push(this.subpathIsEmptyOrClosed ? "M" : "L", points.shift(), "C");
    this.subpath.push(...points);
    this.currentPoint = this.subpath[this.subpath.length - 1];
    this.currentPointOnCtm = p;
  }
  /** postscript x1 y1 x2 y2 arcto */


  arcTo(x1, y1, x2, y2, radius) {
    const p0 = this.currentPointOnCtm;

    if (p0 === null) {
      return;
    }

    const p1 = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x1, y1);
    const p2 = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x2, y2);
    const v1 = _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Vector2D.fromPoints(p0, p1);
    const v2 = _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Vector2D.fromPoints(p1, p2);

    if (v1.x === 0 && v2.x === 0 || v1.y === 0 && v2.y === 0 || v1.isZero() || v2.isZero()) {
      this.subpath.push("L", this.ctm.transfer(p1), this.ctm.transfer(p2));
      this.currentPointOnCtm = p2;
      return;
    }

    const arcAngle = _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Vector2D.getAngle(v1, v2);

    if (arcAngle === 0 || arcAngle === Math.PI) {
      this.subpath.push("L", this.ctm.transfer(p1), this.ctm.transfer(p2));
      this.currentPointOnCtm = p2;
      return;
    }

    const linesAngle = Math.PI - arcAngle;
    const a = radius / Math.sin(linesAngle / 2);
    const b = Math.abs(Math.cos(linesAngle / 2) * a);
    let vang1 = _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Vector2D.fromPoints(p1, p0).getAngle();
    let vang2 = v2.getAngle();
    const cp1 = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(b * Math.cos(vang1) + p1.x, b * Math.sin(vang1) + p1.y);
    const cp2 = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(b * Math.cos(vang2) + p1.x, b * Math.sin(vang2) + p1.y);

    if (Math.abs(vang2 - vang1) > Math.PI) {
      if (vang2 > vang1) vang1 += Math.PI * 2;else vang2 += Math.PI * 2;
    }

    const center = new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(a * Math.cos((vang1 + vang2) / 2) + p1.x, a * Math.sin((vang1 + vang2) / 2) + p1.y);
    const vcp1 = _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Vector2D.fromPoints(center, cp1);
    const vcp2 = _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Vector2D.fromPoints(center, cp2);
    let angcp1 = vcp1.getAngle();
    let angcp2 = vcp2.getAngle();

    if (Math.abs(angcp2 - angcp1) > Math.PI) {
      if (angcp2 > angcp1) angcp1 += Math.PI * 2;else angcp2 += Math.PI * 2;
    } // this.subpath.push("L", this.ctm.transfer(cp1), this.ctm.transfer(center), this.ctm.transfer(cp2)); // debug


    this.arc(center.x, center.y, radius, angcp1, angcp2, angcp1 >= angcp2);
    this.lineTo(x2, y2);
  }

  circle(x, y, radius, anticlockwise = true) {
    if (!this.subpathIsEmptyOrClosed) this.closePath();
    this.arc(x, y, radius, 0, 2 * Math.PI, anticlockwise);
    this.closePath();
  }

  rect(x, y, w, h, anticlockwise = true) {
    if (anticlockwise) {
      this.subpath.push("M", this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y)), "L", this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y + h)), this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x + w, y + h)), this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x + w, y)), "Z");
    } else {
      this.subpath.push("M", this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y)), "L", this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x + w, y)), this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x + w, y + h)), this.ctm.transfer(new _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D(x, y + h)), "Z");
    }

    this.currentPoint = null;
    this.currentPointOnCtm = null;
  }

  roundRect(x, y, w, h, radius, anticlockwise = true) {
    if (anticlockwise) {
      this.moveTo(x, y + h / 2);
      this.arcTo(x, y + h, x + w / 2, y + h, radius);
      this.arcTo(x + w, y + h, x + w, y + h / 2, radius);
      this.arcTo(x + w, y, x + w / 2, y, radius);
      this.arcTo(x, y, x, y + h / 2, radius);
    } else {
      this.moveTo(x + w / 2, y);
      this.arcTo(x + w, y, x + w, y + h / 2, radius);
      this.arcTo(x + w, y + h, x + w / 2, y + h, radius);
      this.arcTo(x, y + h, x, y + h / 2, radius);
      this.arcTo(x, y, x + w / 2, y, radius);
    }

    this.closePath();
  }

  getInheritedStyle(style) {
    let found;
    const styleStr = style.toString();
    let alpha = this.globalAlpha;
    let color; // tslint:disable-next-line:no-conditional-assignment

    if (color = _WebColor__WEBPACK_IMPORTED_MODULE_4__.WebColor.isRgb(styleStr)) {
      const rgba = color;
      alpha *= rgba.a;
      style = `rgb(${rgba.r},${rgba.g},${rgba.b})`;
    } // tslint:disable-next-line:no-conditional-assignment
    else if (color = _WebColor__WEBPACK_IMPORTED_MODULE_4__.WebColor.isHsl(styleStr)) {
      const hsla = color;
      alpha *= hsla.a;
      style = `hsl(${hsla.h},${hsla.s * 100}%,${hsla.l * 100}%)`;
    } else if (!this.ctm.isIdentity()) {
      // tslint:disable-next-line:no-conditional-assignment
      if (found = styleStr.match(/^url\(\#lgrad-(.+)\)$/)) {
        this.assets.push(`<linearGradient id="lgrad-${++this.idCount}" xlink:href="#lgrad-${found[1]}" ` + `gradientTransform="matrix(${this.ctm.toString()})" />`);
        style = `url(#lgrad-${this.idCount})`;
      } // tslint:disable-next-line:no-conditional-assignment
      else if (found = styleStr.match(/^url\(\#rgrad-(.+)\)$/)) {
        this.assets.push(`<radialGradient id="rgrad-${++this.idCount}" xlink:href="#rgrad-${found[1]}" ` + `gradientTransform="matrix(${this.ctm.toString()})" />`);
        style = `url(#rgrad-${this.idCount})`;
      } // tslint:disable-next-line:no-conditional-assignment
      else if (found = styleStr.match(/^url\(\#pat-(.+)\)$/)) {
        this.assets.push(`<pattern id="pat-${++this.idCount}" xlink:href="#pat-${found[1]}" ` + `patternTransform="matrix(${this.ctm.toString()})" />`);
        style = `url(#pat-${this.idCount})`;
      }
    }

    return {
      style,
      alpha
    };
  }

  getStrokeAttrs() {
    const styleAndAlpha = this.getInheritedStyle(this.strokeStyle);
    return `stroke="${styleAndAlpha.style}" stroke-width="${this.lineWidth}" ` + `stroke-linecap="${this.lineCap}" stroke-linejoin="${this.lineJoin}" stroke-miterlimit="${this.miterLimit}" ` + (this.getLineDash().length > 0 ? `stroke-dasharray="${this.getLineDash().join(",")}" stroke-dashoffset="${this.lineDashOffset}" ` : "") + `stroke-opacity="${styleAndAlpha.alpha}" `;
  }

  getFillAttrs(fillRule) {
    const styleAndAlpha = this.getInheritedStyle(this.fillStyle);
    return `fill="${styleAndAlpha.style}" fill-rule="${fillRule}" fill-opacity="${styleAndAlpha.alpha}" `;
  }

  getFilterAttrs() {
    if (this.filterIdUrl === "") {// do nothing.
    } else if (this.filterIdUrl === null) {
      if (0 < this.shadowBlur || this.globalCompositeOperation && this.globalCompositeOperation !== "source-over") {
        let content = "";
        let merge = "";

        if (0 < this.shadowBlur) {
          content += `<feGaussianBlur stdDeviation="${this.shadowBlur}" result="blur" />\n` + `<feOffset in="blur" dx="${this.shadowOffsetX}" dy="${this.shadowOffsetY}" result="offsetBlur" />\n`;

          if (this.shadowColor === null) {
            merge += `<feMergeNode in="offsetBlur" />`;
          } else {
            const c = new _WebColor__WEBPACK_IMPORTED_MODULE_4__.WebColor(this.shadowColor);
            content += `<feColorMatrix in="offsetBlur" type="matrix" values="` + ` 1 1 1 0 0 ` + ` 1 1 1 0 0 ` + ` 1 1 1 0 0 ` + ` 0 0 0 1 0 " result="color1" />\n` + `<feColorMatrix in="color1" type="matrix" values="` + ` ${c.r / 255} 0 0 0 0 ` + ` 0 ${c.g / 255} 0 0 0 ` + ` 0 0 ${c.b / 255} 0 0 ` + ` 0 0 0 ${c.a} 0 " result="color2" />\n`;
            merge += `<feMergeNode in="color2" />\n`;
          }
        }

        if (this.globalCompositeOperation && this.globalCompositeOperation !== "source-over") {
          let op = this.globalCompositeOperation;
          let reverse = false;

          switch (op) {
            case "destination-in":
              reverse = true;

            case "source-in":
              op = "in";
              break;

            case "destination-out":
              reverse = true;

            case "source-out":
              op = "out";
              break;

            case "destination-atop":
              reverse = true;

            case "source-atop":
              op = "atop";
              break;

            case "xor":
              op = "xor";
              break;

            case "destination-over":
              reverse = true;

            default:
              // lighter|copy|arithmetic
              op = "over";
              break;
          }

          content += `<feComposite in${reverse ? "2" : ""}="SourceGraphic" ` + `in${reverse ? "" : "2"}="BackgroundImage" operator="${op}" result="comp"/>\n`;
          merge += `<feMergeNode in="comp" />\n`;
        } else {
          merge += `<feMergeNode in="SourceGraphic" />\n`;
        }

        this.assets.push(`<filter id="filter-${++this.idCount}" filterUnits="userSpaceOnUse">\n` + `${content}<feMerge>\n${merge}</feMerge>\n</filter>`);
        this.filterIdUrl = `url(#filter-${this.idCount})`;
        return `filter="${this.filterIdUrl}" `;
      } else {
        this.filterIdUrl = "";
      }
    } else if (this.filterIdUrl !== "") {
      return `filter="${this.filterIdUrl}" `;
    }

    return "";
  }

  getMultilineTextHeight(c) {
    // NOTE: Inherited classes can adjust the value of `lineHeight` (adjust argument and call super).
    if (c.multiline && typeof this.font === 'string' && (c.lineHeight === void 0 || c.lineHeight === null)) {
      const re = new RegExp('^\\s*(?:normal|italic|oblique)?\s*' + '(?:normal|small-caps)?\\s*' + '(?:normal|bold|lighter|bolder|100|200|300|400|500|600|700|800|900)??\\s*' + '(?:([0-9.]+)(px|pt|mm|cm|in|pc)?)(?:\\/(?:([0-9.]+|normal)(px|pt|mm|cm|in|em|%)?))?');
      const x = re.exec(this.font);

      if (x) {
        // px
        let fontSizePx = Number(x[1]);

        switch (x[2]) {
          case 'pt':
            // 1pt === 1/72in === (1/72)*96px
            fontSizePx = fontSizePx / 72.0 * 96.0;
            break;

          case 'pc':
            fontSizePx = fontSizePx / 72.0 * 96.0 / 12.0;
            break;

          case 'mm':
            // 1mm === 1/25.4in === (1/25.4)*96px
            fontSizePx = fontSizePx / 25.4 * 96.0;
            break;

          case 'cm':
            fontSizePx = fontSizePx / 25.4 * 96.0 * 100.0;
            break;

          case 'in':
            // 1in === 96px
            fontSizePx = fontSizePx * 96.0;
            break;
        }

        let lineHeight = fontSizePx;

        if (x[3]) {
          lineHeight = Number(x[3]) || 1.3;

          switch (x[4]) {
            case 'px':
              break;

            case 'pt':
              // 1pt === 1/72in === (1/72)*96px
              lineHeight = lineHeight / 72.0 * 96.0;
              break;

            case 'pc':
              lineHeight = lineHeight / 72.0 * 96.0 / 12.0;
              break;

            case 'mm':
              // 1mm === 1/25.4in === (1/25.4)*96px
              lineHeight = lineHeight / 25.4 * 96.0;
              break;

            case 'cm':
              lineHeight = lineHeight / 25.4 * 96.0 * 100.0;
              break;

            case 'in':
              // 1in === 96px
              lineHeight = lineHeight * 96.0;
              break;

            case '%':
              lineHeight = lineHeight / 100 * fontSizePx;
              break;

            default:
              lineHeight = lineHeight * fontSizePx;
              break;
          }
        }

        c.lineHeight = lineHeight;
      }
    }

    return c;
  }
  /**
   * @returns CSS font properties styles for Text tag.
   */


  getTextFontStyles() {
    // NOTE: issue #1: CairoSVG, Inkscape, and some libraries can't understand `font` shorthand style property.
    //                 (Inkscape (v0.92.4) may understand partly)
    //       Inherited classes can split `font` property to `font-family`, `font-weight`, `font-size`, ...
    return `font:${red_agate_util_modules_convert_Escape__WEBPACK_IMPORTED_MODULE_2__.Escape.xml(this.font)};`;
  }

  getTextAttributes(maxWidthOrExtraAttrs) {
    // NOTE: Firefox and Inkscape will render text justified if `textLength` is set.
    //       Chromium and Safari don't justify in this case.
    //       This is due to the  difference of `SVG: <text textLength>` and `Canvas: fillText(,,,maxWidth)`.
    //       Inherited classes can adjust the value of `textLength` (adjust argument and call super).
    let textAlign;

    switch (this.textAlign) {
      case "left":
        textAlign = "start";
        break;

      case "right":
        textAlign = "end";
        break;

      case "center":
        textAlign = "middle";
        break;

      default:
        textAlign = this.textAlign;
        break;
    }

    let textBaseline;

    switch (this.textBaseline) {
      case "top":
        textBaseline = "text-before-edge";
        break;

      case "bottom":
        textBaseline = "text-after-edge";
        break;

      default:
        textBaseline = this.textBaseline;
        break;
    }

    let a = ` style="${this.getTextFontStyles()}" text-anchor="${textAlign}" dominant-baseline="${textBaseline}"`;

    if (maxWidthOrExtraAttrs === void 0 || maxWidthOrExtraAttrs === null) {
      return a;
    } else if (typeof maxWidthOrExtraAttrs === "number") {
      a += ` textLength="${maxWidthOrExtraAttrs}"`;
      return a;
    }

    const c = this.getMultilineTextHeight(maxWidthOrExtraAttrs);
    if (c.textLength !== void 0 && c.textLength !== null) a += ` textLength="${c.textLength}"`;
    if (c.lengthAdjust !== void 0 && c.lengthAdjust !== null) a += ` lengthAdjust="${c.lengthAdjust}"`;
    if (c.rotate !== void 0 && c.rotate !== null) a += ` rotate="${c.rotate}"`;
    if (c.writingMode !== void 0 && c.writingMode !== null) a += ` writing-mode="${c.writingMode}"`;
    if (c.glyphOrientationVertical !== void 0 && c.glyphOrientationVertical !== null) a += ` glyph-orientation-vertical="${c.glyphOrientationVertical}"`;
    if (c.glyphOrientationHorizontal !== void 0 && c.glyphOrientationHorizontal !== null) a += ` glyph-orientation-horizontal="${c.glyphOrientationHorizontal}"`;
    if (c.direction !== void 0 && c.direction !== null) a += ` direction="${c.direction}"`;
    if (c.unicodeBidi !== void 0 && c.unicodeBidi !== null) a += ` unicode-bidi="${c.unicodeBidi}"`;
    if (c.textDecoration !== void 0 && c.textDecoration !== null) a += ` text-decoration="${c.textDecoration}"`;
    if (c.kerning !== void 0 && c.kerning !== null) a += ` kerning="${c.kerning}"`;
    if (c.letterSpacing !== void 0 && c.letterSpacing !== null) a += ` letter-spacing="${c.letterSpacing}"`;
    if (c.wordSpacing !== void 0 && c.wordSpacing !== null) a += ` word-spacing="${c.wordSpacing}"`;
    return a;
  }

  getTextPath(maxWidthOrExtraAttrs) {
    if (maxWidthOrExtraAttrs !== void 0 && maxWidthOrExtraAttrs !== null && typeof maxWidthOrExtraAttrs === "object") {
      if (maxWidthOrExtraAttrs.textPath) {
        const inv = this.ctm.getInverse();
        const subpath = [];

        for (const v of this.subpath) {
          if (v instanceof _TransferMatrix2D__WEBPACK_IMPORTED_MODULE_5__.Point2D) {
            subpath.push(inv.transfer(v));
          } else {
            subpath.push(v);
          }
        }

        const id = `path-${++this.idCount}`;
        this.assets.push(`<path id="${id}" d="${red_agate_util_modules_convert_WordWrap__WEBPACK_IMPORTED_MODULE_3__.WordWrap.loose(subpath.join(" "))}" />\n`);
        this.subpath = [];
        this.currentPoint = null;
        this.currentPointOnCtm = null;
        const r = {
          id: `#${id}`
        };

        if (maxWidthOrExtraAttrs.textPathOffset !== void 0 && maxWidthOrExtraAttrs.textPathOffset !== null) {
          r.offset = maxWidthOrExtraAttrs.textPathOffset;
        }

        return r;
      }
    }

    return null;
  }

  convertToMultiline(text, x, y, maxWidthOrExtraAttrs) {
    if (maxWidthOrExtraAttrs !== void 0 && maxWidthOrExtraAttrs !== null && typeof maxWidthOrExtraAttrs === "object") {
      if (maxWidthOrExtraAttrs.multiline && !maxWidthOrExtraAttrs.textPath) {
        const h = maxWidthOrExtraAttrs.lineHeight || 12;
        const s = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        const a = red_agate_util_modules_convert_Escape__WEBPACK_IMPORTED_MODULE_2__.Escape.xml(s).split("\n");

        switch (maxWidthOrExtraAttrs.writingMode) {
          case "tb":
          case "tb-rl":
            return `<tspan>${a.join(`</tspan><tspan dx="${-h}" y="${y}">`)}</tspan>`;

          default:
            return `<tspan>${a.join(`</tspan><tspan x="${x}" dy="${h}">`)}</tspan>`;
        }
      }
    }

    return `<tspan x="${x}" y="${y}">${red_agate_util_modules_convert_Escape__WEBPACK_IMPORTED_MODULE_2__.Escape.xml(text)}</tspan>`;
  }

  stroke() {
    this.content += `<g ${this.getStrokeAttrs()}fill="none"${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<path d="${red_agate_util_modules_convert_WordWrap__WEBPACK_IMPORTED_MODULE_3__.WordWrap.loose(this.subpath.join(" "))}" />\n</g>\n`;
  }

  strokeRect(x, y, w, h) {
    this.content += `<g ${this.getStrokeAttrs()}fill="none"${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<rect x="${x}" y="${y}" width="${w}" height="${h}" ` + `transform="matrix(${this.ctm.toString()})" ` + "/></g>\n";
  }

  strokeText(text, x, y, maxWidthOrExtraAttrs) {
    const path = this.getTextPath(maxWidthOrExtraAttrs);
    this.content += `<g ${this.getStrokeAttrs()}fill="none"${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<text` + `${this.getTextAttributes(maxWidthOrExtraAttrs)} transform="matrix(${this.ctm.toString()})" ` + `\n>${path !== null ? `<textPath xlink:href="${path.id}"${path.offset !== void 0 ? ` startOffset="${path.offset}"` : ""}\n>` : ""}` + this.convertToMultiline(text, x, y, maxWidthOrExtraAttrs) + `${path !== null ? "</textPath>" : ""}</text></g>\n`;
  }
  /**
   * fillRule: nonzero|evenodd
   */


  fill(fillRule = "nonzero") {
    this.content += `<g stroke="none" ${this.getFillAttrs(fillRule)}${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<path d="${red_agate_util_modules_convert_WordWrap__WEBPACK_IMPORTED_MODULE_3__.WordWrap.loose(this.subpath.join(" "))}" />\n</g>\n`;
  }

  fillRect(x, y, w, h) {
    this.content += `<g stroke="none" ${this.getFillAttrs("nonzero")}${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<rect x="${x}" y="${y}" width="${w}" height="${h}" ` + `transform="matrix(${this.ctm.toString()})" ` + "/></g>\n";
  }

  fillText(text, x, y, maxWidthOrExtraAttrs) {
    const path = this.getTextPath(maxWidthOrExtraAttrs);
    this.content += `<g stroke="none" ${this.getFillAttrs("nonzero")}${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<text` + `${this.getTextAttributes(maxWidthOrExtraAttrs)} transform="matrix(${this.ctm.toString()})" ` + `\n>${path !== null ? `<textPath xlink:href="${path.id}"${path.offset !== void 0 ? ` startOffset="${path.offset}"` : ""}\n>` : ""}` + this.convertToMultiline(text, x, y, maxWidthOrExtraAttrs) + `${path !== null ? "</textPath>" : ""}</text></g>\n`;
  }
  /**
   * fillRule: nonzero|evenodd
   */


  fillStroke(fillRule = "nonzero") {
    this.content += `<g ${this.getFillAttrs(fillRule)}${this.getStrokeAttrs()}${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<path d="${red_agate_util_modules_convert_WordWrap__WEBPACK_IMPORTED_MODULE_3__.WordWrap.loose(this.subpath.join(" "))}" />\n</g>\n`;
  }

  fillStrokeRect(x, y, w, h) {
    this.content += `<g ${this.getFillAttrs("nonzero")}${this.getStrokeAttrs()}${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<rect x="${x}" y="${y}" width="${w}" height="${h}" ` + `transform="matrix(${this.ctm.toString()})" ` + "/></g>\n";
  }

  fillStrokeText(text, x, y, maxWidthOrExtraAttrs) {
    const path = this.getTextPath(maxWidthOrExtraAttrs);
    this.content += `<g ${this.getFillAttrs("nonzero")}${this.getStrokeAttrs()}${this.getFilterAttrs()}` + (this.clipPath.length > 0 ? ` clip-path="${this.clipPath}" ` : "") + `>\n<text` + `${this.getTextAttributes(maxWidthOrExtraAttrs)} transform="matrix(${this.ctm.toString()})" ` + `\n>${path !== null ? `<textPath xlink:href="${path.id}"${path.offset !== void 0 ? ` startOffset="${path.offset}"` : ""}\n>` : ""}` + this.convertToMultiline(text, x, y, maxWidthOrExtraAttrs) + `${path !== null ? "</textPath>" : ""}</text></g>\n`;
  }

  getLineDash() {
    return this.lineDash;
  }

  setLineDash(segments) {
    this.lineDash = segments;
  }
  /**
   * fillRule: nonzero|evenodd
   */


  clip(fillRule = "nonzero") {
    const a = `<clipPath id="clip-${++this.idCount}" fill-rule="${fillRule}" >` + `<path d="${red_agate_util_modules_convert_WordWrap__WEBPACK_IMPORTED_MODULE_3__.WordWrap.loose(this.subpath.join(" "))}" /></clipPath>`;
    this.assets.push(a);
    this.clipPath = `url(#clip-${this.idCount})`;
  }

  registerImage(imageData, id) {
    const img = imageData = this.convertImageToSvgImageData(imageData);
    const imgId = id === null || id === void 0 ? `img-${++this.idCount}_w${img.width}_h${img.height}` : id;
    const a = `<image id="${imgId}" \n` + `x="${0}" y="${0}" width="${1}" height="${1}" ` + `preserveAspectRatio="none" ` + `xlink:href="${img.url}" />`;
    this.assets.push(a);
    return `#${imgId}`;
  }

  registerCustomFilter(id, markup) {
    this.assets.push(markup);
    this.filterIdUrl = `url(#${id})`;
  }

  registerCustomAsset(markup) {
    this.assets.push(markup);
  }

  appendCustomContent(markup) {
    this.content += `<g transform="matrix(${this.ctm.toString()})">${markup}</g>\n`;
  }

  createLinearGradient(x0, y0, x1, y1) {
    const a = new SvgCanvas2DLinerGradient(`lgrad-${++this.idCount}`, x0, y0, x1, y1);
    this.assets.push(a);
    return a;
  }
  /** fr is ignored. fr is always 0. */


  createRadialGradient(cx, cy, r, fx, fy, fr) {
    const a = new SvgCanvas2DRadialGradient(`rgrad-${++this.idCount}`, cx, cy, r, fx, fy);
    this.assets.push(a);
    return a;
  }

  createPattern(imageData, repetition) {
    const a = new SvgCanvas2DPattern(`pat-${++this.idCount}`, this.convertImageToSvgImageData(imageData));
    this.assets.push(a);
    return a;
  }

  beginPattern() {
    this.contentSaved = this.content;
    this.content = "";
    const s = new SvgCanvasGraphicState();
    this.graphicsStack.push(s);
  }

  endPattern(x, y, width, height) {
    const id = ++this.idCount;
    const a = `<pattern id="pat-${id}" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" ` + `x="${x}" y="${y}" width="${width}" height="${height}">\n${this.content}</pattern>`;
    this.assets.push(a);
    this.content = this.contentSaved;
    this.contentSaved = "";
    this.restore();
    return `url(#pat-${id})`;
  }

  convertImageToSvgImageData(imageData) {
    let img;

    if (typeof HTMLImageElement !== "undefined" && imageData instanceof HTMLImageElement) {
      const c = document.createElement("canvas");
      c.width = imageData.width;
      c.height = imageData.height;
      const ctx = c.getContext("2d");

      if (ctx === null) {
        throw new Error("SvgCanvas#convertImageToSvgImageData: Can't get context from Canvas.");
      }

      ctx.drawImage(imageData, 0, 0);
      img = new SvgCanvasImageData(c.toDataURL(), 0, 0, c.width, c.height);
    } else if (typeof HTMLCanvasElement !== "undefined" && imageData instanceof HTMLCanvasElement) {
      img = new SvgCanvasImageData(imageData.toDataURL(), 0, 0, imageData.width, imageData.height);
    } else {
      img = imageData;
    }

    return img;
  }

  drawImage(imageData, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight) {
    let img;
    if (typeof imageData === "string") img = new SvgCanvasImageData(imageData, 0, 0, canvasImageWidth, canvasImageHeight);else img = this.convertImageToSvgImageData(imageData);

    if (img.url.startsWith("#")) {
      const tm = this.ctm.translate(canvasOffsetX, canvasOffsetY).scale(canvasImageWidth, canvasImageHeight);
      this.content += `<g><use x="0" y="0" ` + `transform="matrix(${tm.toString()})" ` + `\nxlink:href="${img.url}" /></g>\n`;
    } else {
      this.content += `<g><image x="${canvasOffsetX}" y="${canvasOffsetY}" ` + `width="${canvasImageWidth}" height="${canvasImageHeight}" ` + `preserveAspectRatio="none" ` + `transform="matrix(${this.ctm.toString()})" ` + `\nxlink:href="${img.url}" /></g>\n`;
    }
  }

  beginGroup() {
    this.content += "<g>";
  }

  endGroup() {
    this.content += "</g>";
  }

  get fontHeightRatio() {
    return this._fontHeightRatio;
  }

  set fontHeightRatio(value) {
    this._fontHeightRatio = value;
  }

  measureText(text) {
    const re = this.font.match(/(\d+(?:.\d+)?)(px|pt|in|mm|em|rem|%)/);
    let scale = 1;
    let size = 12;

    if (re) {
      // 96px === 1in (not 72px === 1in)
      // 72pt === 1in
      //  1mm === 1/25.4in
      switch (re[2]) {
        case "pt":
          // pt -> px
          scale = 96 / 72;
          break;

        case "in":
          // in -> px
          scale = 96;
          break;

        case "mm":
          // mm -> px
          scale = 96 * (1 / 25.4);
          break;

        case "em":
        case "rem":
          scale = 12;
          break;

        case "%":
          scale = 1 / 100;
          break;
      }

      size = Number.parseFloat(re[1]);
    }

    return {
      width: Math.round(scale * size * Array.from(text.replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, '').normalize('NFKC')).length / this.fontHeightRatio)
    };
  }

  clearRect(x, y, w, h) {
    this.save();
    this.fillStyle = 'white';
    this.fillRect(x, y, w, h);
    this.restore();
  }

}

/***/ }),

/***/ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/TransferMatrix2D.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/red-agate-svg-canvas/modules/drawing/canvas/TransferMatrix2D.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point2D": () => (/* binding */ Point2D),
/* harmony export */   "Rect2D": () => (/* binding */ Rect2D),
/* harmony export */   "TransferMatrix2D": () => (/* binding */ TransferMatrix2D),
/* harmony export */   "Vector2D": () => (/* binding */ Vector2D)
/* harmony export */ });
/* harmony import */ var red_agate_util_modules_convert_NumberPrecision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! red-agate-util/modules/convert/NumberPrecision */ "./node_modules/red-agate-util/modules/convert/NumberPrecision.js");
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

const dp = red_agate_util_modules_convert_NumberPrecision__WEBPACK_IMPORTED_MODULE_0__.NumberPrecision.decimalPlaces(6);
class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }

}
class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromPoints(p1, p2) {
    return new Vector2D(p2.x - p1.x, p2.y - p1.y);
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }

  getLength() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  /** returns 0..2*PI */


  getAngle() {
    let angle = Math.acos(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))); // returns 0..PI

    if (0 > this.y) {
      // 180deg < angle < 360deg
      angle = Math.PI * 2 - angle;
    }

    return angle;
  }
  /** returns 0..PI */


  static getAngle(v1, v2) {
    const vlen1 = Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
    const vlen2 = Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.y, 2));
    return Math.acos((v1.x * v2.x + v1.y * v2.y) / (vlen1 * vlen2));
  }

  toString() {
    return `${this.x},${this.y}`;
  }

}
class Rect2D {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

}
class TransferMatrix2D {
  // tslint:disable-next-line:variable-name
  constructor(m11_or_src, m12, m21, m22, dx, dy) {
    // [m11 m21 dx]
    // [m12 m22 dy]
    // [  0   0  1]
    this.m11 = 1;
    this.m21 = 0;
    this.dx = 0;
    this.m12 = 0;
    this.m22 = 1;
    this.dy = 0;
    if (!m11_or_src) return;

    if (typeof m11_or_src === "object") {
      this.m11 = m11_or_src.m11 || this.m11;
      this.m12 = m11_or_src.m12 || this.m12;
      this.m21 = m11_or_src.m21 || this.m21;
      this.m22 = m11_or_src.m22 || this.m22;
      this.dx = m11_or_src.dx || this.dx;
      this.dy = m11_or_src.dy || this.dy;
    } else {
      this.m11 = m11_or_src || this.m11;
      this.m12 = m12 || this.m12;
      this.m21 = m21 || this.m21;
      this.m22 = m22 || this.m22;
      this.dx = dx || this.dx;
      this.dy = dy || this.dy;
    }
  }

  toString() {
    return `${this.m11} ${this.m12} ${this.m21} ${this.m22} ${this.dx} ${this.dy}`;
  }

  isIdentity() {
    return this.m11 === 1 && this.m21 === 0 && this.dx === 0 && this.m12 === 0 && this.m22 === 1 && this.dy === 0;
  }

  scale(x, y) {
    return this.concat(new TransferMatrix2D(x, 0, 0, y, 0, 0));
  }

  translate(x, y) {
    return this.concat(new TransferMatrix2D(1, 0, 0, 1, x, y));
  }

  rotate(angle) {
    return this.concat(new TransferMatrix2D(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0));
  }

  skewX(angle) {
    return this.concat(new TransferMatrix2D(1, 0, Math.tan(angle), 1, 0, 0));
  }

  skewY(angle) {
    return this.concat(new TransferMatrix2D(1, Math.tan(angle), 0, 1, 0, 0));
  }

  concat(mat) {
    // [m11' m21' dx']   [m11*n11 + m21*n12, m11*n21 + m21*n22, m11*tx + m21*ty + dx]   [m11 m21 dx]   [n11 n21 tx]
    // [m12' m22' dy'] = [m12*n11 + m22*n12, m12*n21 + m22*n22, m12*tx + m22*ty + dy] = [m12 m22 dy] * [n12 n22 ty]
    // [  0    0   1 ]   [                0,                 0,                    1]   [  0   0  1]   [  0   0  1]
    return new TransferMatrix2D(this.m11 * mat.m11 + this.m21 * mat.m12, // m11
    this.m12 * mat.m11 + this.m22 * mat.m12, // m12
    this.m11 * mat.m21 + this.m21 * mat.m22, // m21
    this.m12 * mat.m21 + this.m22 * mat.m22, // m22
    this.m11 * mat.dx + this.m21 * mat.dy + this.dx, // dx
    this.m12 * mat.dx + this.m22 * mat.dy + this.dy // dy
    );
  } // tslint:disable-next-line:variable-name


  transfer(x_or_p, y) {
    // [x']   [m11 m21 dx]   [x]
    // [y'] = [m12 m22 dy] * [y]
    // [1 ]   [  0   0  1]   [1]
    if (typeof x_or_p === "object") return new Point2D(dp(this.m11 * x_or_p.x + this.m21 * x_or_p.y + this.dx), dp(this.m12 * x_or_p.x + this.m22 * x_or_p.y + this.dy));else return [dp(this.m11 * x_or_p + this.m21 * y + this.dx), dp(this.m12 * x_or_p + this.m22 * y + this.dy)];
  } //        [m11, m21, dx]
  // A    = [m12, m22, dy]
  //        [  0,   0,  1]
  //
  //        [ m22,  -m21,  m21* dy- dx*m22]
  // A^-1 = [-m12,   m11,   dx*m12-m11* dy]
  //        [   0,     0,  m11*m22-m21*m12]


  getInverse() {
    return new TransferMatrix2D(this.m22, -this.m12, -this.m21, this.m11, this.m21 * this.dy - this.dx * this.m22, this.dx * this.m12 - this.m11 * this.dy);
  }

}

/***/ }),

/***/ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/VectorCanvas2D.js":
/*!************************************************************************************!*\
  !*** ./node_modules/red-agate-svg-canvas/modules/drawing/canvas/VectorCanvas2D.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/***/ }),

/***/ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/WebColor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/red-agate-svg-canvas/modules/drawing/canvas/WebColor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebColor": () => (/* binding */ WebColor)
/* harmony export */ });
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln
class WebColor {
  // tslint:disable-next-line:variable-name
  constructor(name_or_code) {
    /**
     * red
     */
    // tslint:disable-next-line:variable-name
    this._r = 0;
    /**
     * green
     */
    // tslint:disable-next-line:variable-name

    this._g = 0;
    /**
     * blue
     */
    // tslint:disable-next-line:variable-name

    this._b = 0;
    /**
     * alpha channel
     */
    // tslint:disable-next-line:variable-name

    this._a = 1;
    if (!name_or_code) return;
    let rgba = {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };

    if (typeof name_or_code === "object") {
      if (name_or_code.hasOwnProperty("r")) {
        const c2 = name_or_code;
        rgba = {
          r: WebColor.cutoff255(c2.r),
          g: WebColor.cutoff255(c2.g),
          b: WebColor.cutoff255(c2.b),
          a: WebColor.cutoff1(c2.a || 1)
        };
      } else if (name_or_code.hasOwnProperty("h")) {
        const hsla = name_or_code;
        rgba = WebColor.hslToRgb(hsla.h, hsla.s, hsla.l, hsla.a || 1);
      }
    } else if (typeof name_or_code === "string") {
      let c; // tslint:disable-next-line:no-conditional-assignment

      if (c = WebColor.isCode(name_or_code) || WebColor.isName(name_or_code) || WebColor.isRgb(name_or_code)) {
        const c2 = c;
        rgba = c2;
      } // tslint:disable-next-line:no-conditional-assignment
      else if (c = WebColor.isHsl(name_or_code)) {
        const hsla = c;
        rgba = WebColor.hslToRgb(hsla.h, hsla.s, hsla.l, hsla.a);
      }
    }

    this._r = rgba.r;
    this._g = rgba.g;
    this._b = rgba.b;
    this._a = rgba.a;
  }

  static cutoff255(x) {
    if (x < 0) return 0;
    if (x > 255) return 255;
    return x;
  }

  static cutoff1(x) {
    if (x < 0) return 0;
    if (x > 1) return 1;
    return x;
  }

  static isRgb(str) {
    let r,
        g,
        b,
        a = 1;
    let match; // tslint:disable-next-line:no-conditional-assignment

    if (match = str.match(/^\s*rgb(a?)\(\s*(-?(?:\d+\.)?\d+%?)\s*,\s*(-?(?:\d+\.)?\d+%?)\s*,\s*(-?(?:\d+\.)?\d+%?)\s*(?:,\s*((?:[01]?\.)?\d+)\s*)?\)\s*$/)) {
      r = WebColor.cutoff255(match[2].endsWith("%") ? Math.round(Number.parseFloat(match[2]) / 100 * 255) : Number.parseInt(match[2], 10));
      g = WebColor.cutoff255(match[3].endsWith("%") ? Math.round(Number.parseFloat(match[3]) / 100 * 255) : Number.parseInt(match[3], 10));
      b = WebColor.cutoff255(match[4].endsWith("%") ? Math.round(Number.parseFloat(match[4]) / 100 * 255) : Number.parseInt(match[4], 10));

      if (match[1] === "a") {
        a = WebColor.cutoff1(Number.parseFloat(match[5]));
      }

      return {
        r,
        g,
        b,
        a
      };
    }

    return false;
  }

  static isHsl(str) {
    let h,
        s,
        l,
        a = 1;
    let match; // tslint:disable-next-line:no-conditional-assignment

    if (match = str.match(/^\s*hsl(a?)\(\s*(-?(?:\d+\.)?\d+)\s*,\s*(-?(?:\d+\.)?\d+%?)\s*,\s*(-?(?:\d+\.)?\d+%?)\s*,\s*((?:[01]?\.)?\d+)\s*\)\s*$/)) {
      h = Number.parseFloat(match[2]) % 360;
      if (h < 0) h = 360 - h;
      s = WebColor.cutoff1(match[3].endsWith("%") ? Math.round(Number.parseFloat(match[3]) / 100) : Number.parseFloat(match[3]));
      l = WebColor.cutoff1(match[4].endsWith("%") ? Math.round(Number.parseFloat(match[4]) / 100) : Number.parseFloat(match[4]));

      if (match[1] === "a") {
        a = WebColor.cutoff1(Number.parseFloat(match[5]));
      }

      return {
        h,
        s,
        l,
        a
      };
    }

    return false;
  }

  static isCode(str) {
    let r, g, b;
    const a = 1;
    let match; // tslint:disable-next-line:no-conditional-assignment

    if (match = str.match(/^\s*#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])\s*$/)) {
      r = Number.parseInt(`${match[1]}${match[1]}`, 16);
      g = Number.parseInt(`${match[2]}${match[2]}`, 16);
      b = Number.parseInt(`${match[3]}${match[3]}`, 16);
      return {
        r,
        g,
        b,
        a
      };
    } // tslint:disable-next-line:no-conditional-assignment
    else if (match = str.match(/^\s*#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})\s*$/)) {
      r = Number.parseInt(match[1], 16);
      g = Number.parseInt(match[2], 16);
      b = Number.parseInt(match[3], 16);
      return {
        r,
        g,
        b,
        a
      };
    }

    return false;
  }

  static isName(str) {
    if (WebColor.colorNames.has(str)) {
      const c = WebColor.colorNames.get(str);
      return {
        r: c.r,
        g: c.g,
        b: c.b,
        a: 1
      };
    }

    return false;
  }

  static fromRgba(r, g, b, a = 1) {
    const c = new WebColor();
    c._r = WebColor.cutoff255(r);
    c._g = WebColor.cutoff255(g);
    c._b = WebColor.cutoff255(b);
    c._a = WebColor.cutoff1(a);
    return c;
  }

  static hueToRgb(m1, m2, h) {
    if (h < 0) h += 1;
    if (h > 1) h -= 1;
    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    return m1;
  }

  static hslToRgb(h, s, l, a = 1) {
    // tslint:disable-next-line:ban-comma-operator
    h = h % 360, s = WebColor.cutoff1(s), l = WebColor.cutoff1(l);
    if (h < 0) h = 360 - h;
    const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s,
          m1 = l * 2 - m2;
    return {
      r: WebColor.hueToRgb(m1, m2, h + 1 / 3),
      g: WebColor.hueToRgb(m1, m2, h),
      b: WebColor.hueToRgb(m1, m2, h - 1 / 3),
      a: WebColor.cutoff1(a)
    };
  }

  static fromHsla(h, s, l, a = 1) {
    // tslint:disable-next-line:ban-comma-operator
    h = h % 360, s = WebColor.cutoff1(s), l = WebColor.cutoff1(l);
    if (h < 0) h = 360 - h;
    const c = new WebColor();
    const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s,
          m1 = l * 2 - m2;
    c._r = WebColor.hueToRgb(m1, m2, h + 1 / 3);
    c._g = WebColor.hueToRgb(m1, m2, h);
    c._b = WebColor.hueToRgb(m1, m2, h - 1 / 3);
    c._a = WebColor.cutoff1(a);
    return c;
  }

  static fromGray(gray, a = 1) {
    const c = new WebColor();
    c._r = WebColor.cutoff255(gray);
    c._g = WebColor.cutoff255(gray);
    c._b = WebColor.cutoff255(gray);
    c._a = WebColor.cutoff1(a);
    return c;
  }

  get r() {
    return this._r;
  }

  get g() {
    return this._g;
  }

  get b() {
    return this._b;
  }

  get a() {
    return this._a;
  }

  toString() {
    if (this._a !== 1) return this.toRgbaString();else return this.toCode();
  }

  toCode() {
    return "#" + `0${this._r.toString(16)}`.slice(-2) + `0${this._g.toString(16)}`.slice(-2) + `0${this._b.toString(16)}`.slice(-2);
  }

  toRgbString() {
    return `rgb(${this._r},${this._g},${this._b})`;
  }

  toRgbaString() {
    return `rgb(${this._r},${this._g},${this._b},${this._a})`;
  }

  toHsla() {
    const r = this._r / 255,
          g = this._g / 255,
          b = this._b / 255;
    const max = Math.max(g, b),
          min = Math.min(g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2,
          c = max - min;

    if (max !== min) {
      if (max === r) h = (g - b) / c;else if (max === g) h = (b - r) / c + 2;else h = (r - g) / c + 4;
      h = h * 60 + (h < 0 ? 360 : 0);
      s = c / (l < 0.5 ? max + min : 2 - max - min);
    }

    return {
      h,
      s,
      l,
      a: this._a
    };
  }

  toHslString() {
    const c = this.toHsla();
    return `hsl(${c.h},${c.s}%,${c.l}%)`;
  }

  toHslaString() {
    const c = this.toHsla();
    return `hsl(${c.h},${c.s}%,${c.l}%,${this._a})`;
  }

}
WebColor.colorNames = new Map([["red", {
  r: 255,
  g: 0,
  b: 0
}], ["darkred", {
  r: 139,
  g: 0,
  b: 0
}], ["maroon", {
  r: 128,
  g: 0,
  b: 0
}], ["brown", {
  r: 165,
  g: 42,
  b: 42
}], ["firebrick", {
  r: 178,
  g: 34,
  b: 34
}], ["sienna", {
  r: 160,
  g: 82,
  b: 45
}], ["saddlebrown", {
  r: 139,
  g: 69,
  b: 19
}], ["peru", {
  r: 205,
  g: 133,
  b: 63
}], ["indianred", {
  r: 205,
  g: 92,
  b: 92
}], ["rosybrown", {
  r: 188,
  g: 143,
  b: 143
}], ["lightcoral", {
  r: 240,
  g: 128,
  b: 128
}], ["salmon", {
  r: 250,
  g: 128,
  b: 114
}], ["darksalmon", {
  r: 233,
  g: 150,
  b: 122
}], ["coral", {
  r: 255,
  g: 127,
  b: 80
}], ["tomato", {
  r: 255,
  g: 99,
  b: 71
}], ["sandybrown", {
  r: 244,
  g: 164,
  b: 96
}], ["lightsalmon", {
  r: 255,
  g: 160,
  b: 122
}], ["chocolate", {
  r: 210,
  g: 105,
  b: 30
}], ["orangered", {
  r: 255,
  g: 69,
  b: 0
}], ["orange", {
  r: 255,
  g: 165,
  b: 0
}], ["darkorange", {
  r: 255,
  g: 140,
  b: 0
}], ["tan", {
  r: 210,
  g: 180,
  b: 140
}], ["peachpuff", {
  r: 255,
  g: 218,
  b: 185
}], ["bisque", {
  r: 255,
  g: 228,
  b: 196
}], ["moccasin", {
  r: 255,
  g: 228,
  b: 181
}], ["navajowhite", {
  r: 255,
  g: 222,
  b: 173
}], ["wheat", {
  r: 245,
  g: 222,
  b: 179
}], ["burlywood", {
  r: 222,
  g: 184,
  b: 135
}], ["darkgoldenrod", {
  r: 184,
  g: 134,
  b: 11
}], ["goldenrod", {
  r: 218,
  g: 165,
  b: 32
}], ["gold", {
  r: 255,
  g: 215,
  b: 0
}], ["yellow", {
  r: 255,
  g: 255,
  b: 0
}], ["lightgoldenrodyellow", {
  r: 250,
  g: 250,
  b: 210
}], ["palegoldenrod", {
  r: 238,
  g: 232,
  b: 170
}], ["khaki", {
  r: 240,
  g: 230,
  b: 140
}], ["darkkhaki", {
  r: 189,
  g: 183,
  b: 107
}], ["blanchedalmond", {
  r: 255,
  g: 235,
  b: 205
}], ["lightyellow", {
  r: 255,
  g: 255,
  b: 224
}], ["cornsilk", {
  r: 255,
  g: 248,
  b: 220
}], ["antiquewhite", {
  r: 250,
  g: 235,
  b: 215
}], ["papayawhip", {
  r: 255,
  g: 239,
  b: 213
}], ["papayawhite", {
  r: 255,
  g: 239,
  b: 213
}], ["lemonchiffon", {
  r: 255,
  g: 250,
  b: 205
}], ["beige", {
  r: 245,
  g: 245,
  b: 220
}], ["oldlace", {
  r: 253,
  g: 245,
  b: 230
}], ["lightcyan", {
  r: 224,
  g: 255,
  b: 255
}], ["aliceblue", {
  r: 240,
  g: 248,
  b: 255
}], ["whitesmoke", {
  r: 245,
  g: 245,
  b: 245
}], ["lavenderblush", {
  r: 255,
  g: 240,
  b: 245
}], ["floralwhite", {
  r: 255,
  g: 250,
  b: 240
}], ["mintcream", {
  r: 245,
  g: 255,
  b: 250
}], ["ghostwhite", {
  r: 248,
  g: 248,
  b: 255
}], ["honeydew", {
  r: 240,
  g: 255,
  b: 240
}], ["seashell", {
  r: 255,
  g: 245,
  b: 238
}], ["ivory", {
  r: 255,
  g: 255,
  b: 240
}], ["azure", {
  r: 240,
  g: 255,
  b: 255
}], ["snow", {
  r: 255,
  g: 250,
  b: 250
}], ["white", {
  r: 255,
  g: 255,
  b: 255
}], ["gainsboro", {
  r: 220,
  g: 220,
  b: 220
}], ["lightgrey", {
  r: 211,
  g: 211,
  b: 211
}], ["silver", {
  r: 192,
  g: 192,
  b: 192
}], ["darkgray", {
  r: 169,
  g: 169,
  b: 169
}], ["lightslategray", {
  r: 119,
  g: 136,
  b: 153
}], ["slategray", {
  r: 112,
  g: 128,
  b: 144
}], ["gray", {
  r: 128,
  g: 128,
  b: 128
}], ["dimgray", {
  r: 105,
  g: 105,
  b: 105
}], ["darkslategray", {
  r: 47,
  g: 79,
  b: 79
}], ["black", {
  r: 0,
  g: 0,
  b: 0
}], ["lawngreen", {
  r: 124,
  g: 252,
  b: 0
}], ["greenyellow", {
  r: 173,
  g: 255,
  b: 47
}], ["chartreuse", {
  r: 127,
  g: 255,
  b: 0
}], ["lime", {
  r: 0,
  g: 255,
  b: 0
}], ["limegreen", {
  r: 50,
  g: 205,
  b: 50
}], ["yellowgreen", {
  r: 154,
  g: 205,
  b: 50
}], ["olive", {
  r: 128,
  g: 128,
  b: 0
}], ["olivedrab", {
  r: 107,
  g: 142,
  b: 35
}], ["darkolivegreen", {
  r: 85,
  g: 107,
  b: 47
}], ["forestgreen", {
  r: 34,
  g: 139,
  b: 34
}], ["darkgreen", {
  r: 0,
  g: 100,
  b: 0
}], ["green", {
  r: 0,
  g: 128,
  b: 0
}], ["seagreen", {
  r: 46,
  g: 139,
  b: 87
}], ["mediumseagreen", {
  r: 60,
  g: 179,
  b: 113
}], ["darkseagreen", {
  r: 143,
  g: 188,
  b: 143
}], ["lightgreen", {
  r: 144,
  g: 238,
  b: 144
}], ["palegreen", {
  r: 152,
  g: 251,
  b: 152
}], ["springgreen", {
  r: 0,
  g: 255,
  b: 127
}], ["mediumspringgreen", {
  r: 0,
  g: 250,
  b: 154
}], ["teal", {
  r: 0,
  g: 128,
  b: 128
}], ["darkcyan", {
  r: 0,
  g: 139,
  b: 139
}], ["lightseagreen", {
  r: 51,
  g: 153,
  b: 153
}], ["mediumaquamarine", {
  r: 102,
  g: 205,
  b: 170
}], ["cadetblue", {
  r: 95,
  g: 158,
  b: 160
}], ["steelblue", {
  r: 70,
  g: 130,
  b: 180
}], ["aquamarine", {
  r: 127,
  g: 255,
  b: 212
}], ["powderblue", {
  r: 176,
  g: 224,
  b: 230
}], ["paleturquoise", {
  r: 175,
  g: 238,
  b: 238
}], ["lightblue", {
  r: 173,
  g: 216,
  b: 230
}], ["lightsteelblue", {
  r: 176,
  g: 196,
  b: 222
}], ["skyblue", {
  r: 135,
  g: 206,
  b: 235
}], ["lightskyblue", {
  r: 135,
  g: 206,
  b: 250
}], ["mediumturquoise", {
  r: 72,
  g: 209,
  b: 204
}], ["turquoise", {
  r: 64,
  g: 224,
  b: 208
}], ["darkturquoise", {
  r: 0,
  g: 206,
  b: 209
}], ["aqua", {
  r: 0,
  g: 255,
  b: 255
}], ["cyan", {
  r: 0,
  g: 255,
  b: 255
}], ["deepskyblue", {
  r: 0,
  g: 191,
  b: 255
}], ["dodgerblue", {
  r: 30,
  g: 144,
  b: 255
}], ["cornflowerblue", {
  r: 100,
  g: 149,
  b: 237
}], ["royalblue", {
  r: 65,
  g: 105,
  b: 225
}], ["blue", {
  r: 0,
  g: 0,
  b: 255
}], ["mediumblue", {
  r: 0,
  g: 0,
  b: 205
}], ["navy", {
  r: 0,
  g: 0,
  b: 128
}], ["darkblue", {
  r: 0,
  g: 0,
  b: 139
}], ["midnightblue", {
  r: 25,
  g: 25,
  b: 112
}], ["darkslateblue", {
  r: 72,
  g: 61,
  b: 139
}], ["mediumslateblue", {
  r: 123,
  g: 104,
  b: 238
}], ["slateblue", {
  r: 106,
  g: 90,
  b: 205
}], ["darkorchid", {
  r: 153,
  g: 50,
  b: 204
}], ["darkviolet", {
  r: 148,
  g: 0,
  b: 211
}], ["blueviolet", {
  r: 138,
  g: 43,
  b: 226
}], ["mediumorchid", {
  r: 186,
  g: 85,
  b: 211
}], ["plum", {
  r: 221,
  g: 160,
  b: 221
}], ["lavender", {
  r: 230,
  g: 230,
  b: 250
}], ["thistle", {
  r: 216,
  g: 191,
  b: 216
}], ["orchid", {
  r: 218,
  g: 112,
  b: 214
}], ["magenta", {
  r: 255,
  g: 0,
  b: 255
}], ["fuchsia", {
  r: 255,
  g: 0,
  b: 255
}], ["violet", {
  r: 238,
  g: 130,
  b: 238
}], ["indigo", {
  r: 75,
  g: 0,
  b: 130
}], ["darkmagenta", {
  r: 139,
  g: 0,
  b: 139
}], ["purple", {
  r: 128,
  g: 0,
  b: 128
}], ["mediumpurple", {
  r: 147,
  g: 112,
  b: 219
}], ["mediumvioletred", {
  r: 199,
  g: 21,
  b: 133
}], ["deeppink", {
  r: 255,
  g: 20,
  b: 147
}], ["hotpink", {
  r: 255,
  g: 105,
  b: 180
}], ["crimson", {
  r: 220,
  g: 20,
  b: 60
}], ["palevioletred", {
  r: 219,
  g: 112,
  b: 147
}], ["lightpink", {
  r: 255,
  g: 182,
  b: 193
}], ["pink", {
  r: 255,
  g: 192,
  b: 203
}], ["mistyrose", {
  r: 255,
  g: 228,
  b: 225
}]]);

/***/ }),

/***/ "./node_modules/red-agate-svg-canvas/modules/index.js":
/*!************************************************************!*\
  !*** ./node_modules/red-agate-svg-canvas/modules/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point2D": () => (/* reexport safe */ _drawing_canvas_TransferMatrix2D__WEBPACK_IMPORTED_MODULE_1__.Point2D),
/* harmony export */   "Rect2D": () => (/* reexport safe */ _drawing_canvas_TransferMatrix2D__WEBPACK_IMPORTED_MODULE_1__.Rect2D),
/* harmony export */   "SvgCanvas": () => (/* reexport safe */ _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas),
/* harmony export */   "SvgCanvas2DGradient": () => (/* reexport safe */ _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas2DGradient),
/* harmony export */   "SvgCanvas2DLinerGradient": () => (/* reexport safe */ _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas2DLinerGradient),
/* harmony export */   "SvgCanvas2DPattern": () => (/* reexport safe */ _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas2DPattern),
/* harmony export */   "SvgCanvas2DRadialGradient": () => (/* reexport safe */ _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas2DRadialGradient),
/* harmony export */   "SvgCanvasImageData": () => (/* reexport safe */ _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__.SvgCanvasImageData),
/* harmony export */   "TransferMatrix2D": () => (/* reexport safe */ _drawing_canvas_TransferMatrix2D__WEBPACK_IMPORTED_MODULE_1__.TransferMatrix2D),
/* harmony export */   "Vector2D": () => (/* reexport safe */ _drawing_canvas_TransferMatrix2D__WEBPACK_IMPORTED_MODULE_1__.Vector2D),
/* harmony export */   "WebColor": () => (/* reexport safe */ _drawing_canvas_WebColor__WEBPACK_IMPORTED_MODULE_3__.WebColor)
/* harmony export */ });
/* harmony import */ var _drawing_canvas_SvgCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing/canvas/SvgCanvas */ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/SvgCanvas.js");
/* harmony import */ var _drawing_canvas_TransferMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawing/canvas/TransferMatrix2D */ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/TransferMatrix2D.js");
/* harmony import */ var _drawing_canvas_VectorCanvas2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawing/canvas/VectorCanvas2D */ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/VectorCanvas2D.js");
/* harmony import */ var _drawing_canvas_WebColor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawing/canvas/WebColor */ "./node_modules/red-agate-svg-canvas/modules/drawing/canvas/WebColor.js");
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln





/***/ }),

/***/ "./node_modules/red-agate-util/modules/convert/Base64.js":
/*!***************************************************************!*\
  !*** ./node_modules/red-agate-util/modules/convert/Base64.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base64": () => (/* binding */ Base64)
/* harmony export */ });
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

/**
 * Base64 encoder / decoder.
 */
class Base64 {
  /**
   * Base64 encoder.
   * @param message Plaintext message.
   * @param lineLength The maximum line length of the encoded message. If set, the encoded message is split with a newline character.
   * @return Base64 encoded message.
   */
  static encode(message, lineLength) {
    // A-Z: 0x00 -> 0x41
    // a-z: 0x1a -> 0x61
    // 0-9: 0x34 -> 0x30
    //   +: 0x3e -> 0x2b
    //   /: 0x3f -> 0x2f
    // 0-5/6-3/4-8
    let buf = [];
    const n = message.length;
    let v = 0,
        q = 0,
        r = 0;

    for (let i = 0, m = 0; i < n; i++) {
      m = i % 3;

      if (m === 0) {
        v = message[i];
        r = v << 4 & 0x30; // 2bit

        v = v >>> 2 & 0x3f; // 6bit
      } else if (m === 1) {
        v = message[i];
        q = v << 2 & 0x3c; // 4bit

        v = v >>> 4 & 0x0f | r; // 4bit

        r = q;
      } else {
        q = message[i];
        v = q >>> 6 & 0x03 | r; // 2bit

        if (v < 0x1a) v += 0x41;else if (v < 0x34) v += 0x47;else if (v < 0x3e) v -= 0x04;else if (v < 0x3f) v = 0x2b;else v = 0x2f;
        buf.push(v);
        v = q & 0x3f; // 6bit
      }

      if (v < 0x1a) v += 0x41;else if (v < 0x34) v += 0x47;else if (v < 0x3e) v -= 0x04;else if (v < 0x3f) v = 0x2b;else v = 0x2f;
      buf.push(v);
    }

    if (n % 3) {
      if (r < 0x1a) r += 0x41;else if (r < 0x34) r += 0x47;else if (r < 0x3e) r -= 0x04;else if (r < 0x3f) r = 0x2b;else r = 0x2f;
      buf.push(r);
    }

    while (buf.length % 4) {
      buf.push(0x3d);
    }

    if (lineLength && 0 < lineLength) {
      const s = [];

      for (let i = 0; i < buf.length; i += lineLength) {
        s.push(...buf.slice(i, i + lineLength), 0x0a);
      }

      buf = s;
    }

    let z = "";

    for (let i = 0; i < buf.length; i++) {
      // NOTE: spread operator (...buf) causes stack overflow.
      z += String.fromCharCode(buf[i]);
    }

    return z;
  }
  /**
   * Base64 decoder.
   * @param message Base64 encoded message.
   * @return Plaintext message.
   */


  static decode(message) {
    const buf = [];
    let i = 0,
        m = 0,
        s = 0;
    const n = message.length;
    let v = 0,
        r = 0;

    for (; i < n; i++) {
      m = (i + s) % 4;
      v = message.charCodeAt(i);
      if (0x41 <= v && v <= 0x5a) v -= 0x41;else if (0x61 <= v && v <= 0x7a) v -= 0x47;else if (0x30 <= v && v <= 0x39) v += 0x04;else if (v === 0x2b) v = 0x3e;else if (v === 0x2f) v = 0x3f;else if (v === 0x3d) {
        break;
      } else {
        s++;
        continue;
      }

      if (m === 0) {
        r = v << 2 & 0xfc; // 6bit
      } else if (m === 1) {
        buf.push(r | v >>> 4 & 0x03); // 2bit

        r = v << 4 & 0xf0; // 4bit
      } else if (m === 2) {
        buf.push(r | v >>> 2 & 0x0f); // 4bit

        r = v << 6 & 0xc0; // 2bit
      } else {
        buf.push(r | v & 0x3f); // 6bit
      }
    }

    return buf;
  }

}

/***/ }),

/***/ "./node_modules/red-agate-util/modules/convert/Escape.js":
/*!***************************************************************!*\
  !*** ./node_modules/red-agate-util/modules/convert/Escape.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Escape": () => (/* binding */ Escape),
/* harmony export */   "Unescape": () => (/* binding */ Unescape)
/* harmony export */ });
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

/**
 * Escape sequences encoder.
 */
class Escape {
  /**
   * Escape html special characters.
   * @param s Plaintext.
   * @return Html escaped text.
   */
  static html(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  /**
   * Escape xml special characters.
   * @param s Plaintext.
   * @return Xml escaped text.
   */


  static xml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

}
/**
 * Escape sequences decoder.
 */

class Unescape {
  /**
   * Unescape html character references.
   * @param s Html escaped text.
   * @return Plaintext.
   */
  static html(s) {
    return s.replace(/&#39;/g, "'").replace(/&#x(?:0{0,2})27;/ig, "'").replace(/&apos;/g, "'").replace(/&#34;/g, "\"").replace(/&#x(?:0{0,2})22;/ig, "\"").replace(/&quot;/g, "\"").replace(/&#62;/g, ">").replace(/&#x(?:0{0,2})3e;/ig, ">").replace(/&gt;/g, ">").replace(/&#60;/g, "<").replace(/&#x(?:0{0,2})3c;/ig, "<").replace(/&lt;/g, "<").replace(/&#38;/g, "&").replace(/&#x(?:0{0,2})26;/ig, "&").replace(/&amp;/g, "&");
  }
  /**
   * Unescape xml character references.
   * @param s Xml escaped text.
   * @return Plaintext.
   */


  static xml(s) {
    return Escape.html(s);
  }

}

/***/ }),

/***/ "./node_modules/red-agate-util/modules/convert/NumberPrecision.js":
/*!************************************************************************!*\
  !*** ./node_modules/red-agate-util/modules/convert/NumberPrecision.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberPrecision": () => (/* binding */ NumberPrecision)
/* harmony export */ });
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln

/**
 * Number precision / significant figure
 */
class NumberPrecision {
  static decimalPlaces(n) {
    return v => {
      return Number(v.toFixed(n));
    };
  }

  static precision(n) {
    return v => {
      return Number(v.toPrecision(n));
    };
  }

}

/***/ }),

/***/ "./node_modules/red-agate-util/modules/convert/TextEncoding.js":
/*!*********************************************************************!*\
  !*** ./node_modules/red-agate-util/modules/convert/TextEncoding.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextEncoding": () => (/* binding */ TextEncoding)
/* harmony export */ });
// src/convert/TextEncoding.ts#__encodeToUtf8Impl
//
// Original Author:
// http://qiita.com/ukyo/items/1626defd020b2157e6bf
// (c) 2012 ukyo (http://qiita.com/ukyo, https://ukyoweb.com)
class TextEncoding {
  static encodeToUtf8(str) {
    return TextEncoding.__encodeToUtf8(str);
  }

  static decodeUtf8(buf) {
    return TextEncoding.__decodeUtf8(buf);
  }

  static __encodeToUtf8Impl(str) {
    // Original Author:
    // http://qiita.com/ukyo/items/1626defd020b2157e6bf
    // (c) 2012 ukyo (http://qiita.com/ukyo, https://ukyoweb.com)
    // NOTE: We have modified from original source.
    const n = str.length;
    let idx = -1,
        byteLength = 512,
        bytes = new Uint8Array(byteLength),
        i,
        c;

    for (i = 0; i < n; ++i) {
      // surrogate pairs (U+D800..U+DFFF) should be decoded to U+010000..U+10FFFF
      // before convert to UTF-8.
      const cp = str.codePointAt(i);

      if (cp === void 0) {
        throw new Error("Can't convert string to UTF-8. string include unexpected sequence.");
      }

      c = cp;

      if (c <= 0x7F) {
        bytes[++idx] = c;
      } else if (c <= 0x7FF) {
        bytes[++idx] = 0xC0 | c >>> 6;
        bytes[++idx] = 0x80 | c & 0x3F;
      } else if (c <= 0xFFFF) {
        bytes[++idx] = 0xE0 | c >>> 12;
        bytes[++idx] = 0x80 | c >>> 6 & 0x3F;
        bytes[++idx] = 0x80 | c & 0x3F;
      } else if (c <= 0x10FFFF) {
        // UTF-8 4bytes range is (0x010000..0x1FFFFF) but Unicode codepoint uses <= U+10FFFF.
        bytes[++idx] = 0xF0 | c >>> 18;
        bytes[++idx] = 0x80 | c >>> 12 & 0x3F;
        bytes[++idx] = 0x80 | c >>> 6 & 0x3F;
        bytes[++idx] = 0x80 | c & 0x3F;
        if (0x010000 <= c) ++i;
      } else {
        throw new Error("Can't convert string to UTF-8. string include unexpected sequence.");
      }

      if (byteLength - idx <= 4) {
        // tslint:disable-next-line:variable-name
        const _bytes = bytes;
        byteLength *= 2;
        bytes = new Uint8Array(byteLength);
        bytes.set(_bytes);
      }
    }

    return bytes.subarray(0, ++idx);
  }

  static __decodeUtf8Impl(buf) {
    // Original Author:
    // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
    // utf.js - UTF-8 <=> UTF-16 convertion
    // Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
    // Version: 1.0
    // LastModified: Dec 25 1999
    // This library is free.  You can redistribute it and/or modify it.
    // NOTE: We have modified from original source.
    let out = "",
        i = 0;
    const len = buf.length;
    let c, char2, char3, char4;

    while (i < len) {
      c = buf[i++];

      switch (c >>> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxx xxxx    ( 7bit)
          out += String.fromCodePoint(c);
          break;

        case 12:
        case 13:
          // 110x xxxx,  10xx xxxx    (11bit)
          char2 = buf[i++];
          out += String.fromCodePoint((c & 0x1F) << 6 | char2 & 0x3F);
          break;

        case 14:
          // 1110 xxxx,  10xx xxxx,  10xx xxxx    (16bit)
          char2 = buf[i++];
          char3 = buf[i++];
          out += String.fromCodePoint((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
          break;

        case 16:
          // 1111 0xxx,  10xx xxxx,  10xx xxxx,  10xx xxxx                            (21bit)
          // 1111 10xx,  10xx xxxx,  10xx xxxx,  10xx xxxx,  10xx xxxx                (26bit; invalid Unicode codepoint)
          // 1111 110x,  10xx xxxx,  10xx xxxx,  10xx xxxx,  10xx xxxx,  10xx xxxx    (31bit; invalid Unicode codepoint)
          if (c >>> 3 & 1) {
            throw new Error("Can't convert UTF-8 to string. UTF-8 include unexpected sequence.");
          }

          char2 = buf[i++];
          char3 = buf[i++];
          char4 = buf[i++];
          out += String.fromCodePoint((c & 0x07) << 18 | (char2 & 0x3F) << 12 | (char3 & 0x3F) << 6 | (char4 & 0x3F) << 0);
          break;
      }
    }

    return out;
  }

}
/** static constructor */
// tslint:disable-next-line:variable-name

TextEncoding.__ctor = (() => {
  TextEncoding.isNode = typeof Buffer !== "undefined";
  TextEncoding.isTextEncoder = typeof TextEncoder !== "undefined";

  if (TextEncoding.isNode) {
    TextEncoding.__encodeToUtf8 = str => Buffer.from(str, "utf8");

    TextEncoding.__decodeUtf8 = buf => Buffer.from(Array.isArray(buf) ? buf : Array.from(buf)).toString("utf8");
  } else if (TextEncoding.isTextEncoder) {
    TextEncoding.utf8Encoder = new TextEncoder("utf8");

    TextEncoding.__encodeToUtf8 = str => TextEncoding.utf8Encoder.encode(str);

    TextEncoding.utfDecoder = new TextDecoder("utf8");

    TextEncoding.__decodeUtf8 = buf => TextEncoding.utfDecoder.decode(buf);
  } else {
    TextEncoding.__encodeToUtf8 = TextEncoding.__encodeToUtf8Impl;
    TextEncoding.__decodeUtf8 = TextEncoding.__decodeUtf8Impl;
  }
})();

/***/ }),

/***/ "./node_modules/red-agate-util/modules/convert/WordWrap.js":
/*!*****************************************************************!*\
  !*** ./node_modules/red-agate-util/modules/convert/WordWrap.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WordWrap": () => (/* binding */ WordWrap)
/* harmony export */ });
// Copyright (c) 2017, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln
class WordWrap {
  static loose(str, charsPerLine = 120) {
    let r = "";
    let i = 0;

    for (const c of str) {
      i++;

      if (i >= charsPerLine && " \f\t\v".indexOf(c) > -1) {
        r += "\n";
        i = 0;
      } else {
        r += c;
      }
    }

    return r;
  }

  static normal(str, charsPerLine = 120) {
    // TODO: not implemented.
    //       do normal word-wrap.
    return WordWrap.loose(str, charsPerLine);
  }

  static force(str, charsPerLine = 120) {
    // TODO: not implemented.
    //       do break-word word-wrap.
    return WordWrap.loose(str, charsPerLine);
  }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var red_agate_svg_canvas_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! red-agate-svg-canvas/modules */ "./node_modules/red-agate-svg-canvas/modules/index.js");
 // tslint:disable-next-line:function-constructor

const g = Function('return this')();
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(ChartJs, opts, width, height) {
  if (undefined === width) width = 800;
  if (undefined === height) height = 400; // SvgCanvas has a "CanvasRenderingContext2D"-compatible interface.

  const ctx = new red_agate_svg_canvas_modules__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas(); // SvgCanvas lacks the canvas property.

  ctx.canvas = {
    width,
    height,
    style: {
      width: `${width}px`,
      height: `${height}400px`
    }
  }; //TypeError: ctx.resetTransform is not a function

  ctx.resetTransform = function () {}; // SvgCanvas does not have font glyph information,
  // so manually set the ratio of (font height / font width).


  ctx.fontHeightRatio = 2; // Chart.js needs a "HTMLCanvasElement"-like interface that has "getContext()" method.
  // "getContext()" should returns a "CanvasRenderingContext2D"-compatible interface.

  const el = {
    getContext: () => ctx
  };
  if (undefined === opts.options) opts.options = {}; // If "devicePixelRatio" is not set, Chart.js get the devicePixelRatio from "window" object.
  // node.js environment has no window object.

  opts.options.devicePixelRatio = 1; // Disable animations.

  opts.options.animation = false;
  opts.options.events = [];
  opts.options.responsive = false; // Chart.js needs the "CanvasGradient" in the global scope.

  const savedGradient = g.CanvasGradient;
  g.CanvasGradient = red_agate_svg_canvas_modules__WEBPACK_IMPORTED_MODULE_0__.SvgCanvas2DGradient;

  try {
    const chart = new ChartJs.Chart(el, opts);
  } finally {
    if (savedGradient) {
      g.CanvasGradient = savedGradient;
    }
  } // Render as SVG.


  const svgString = ctx.render(new red_agate_svg_canvas_modules__WEBPACK_IMPORTED_MODULE_0__.Rect2D(0, 0, width, height), 'px');
  return svgString;
}
})();

module.exports.render = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=lib.js.map