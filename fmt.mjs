/*
 * notion-enhancer: api
 * (c) 2021 dragonwocky <thedragonring.bod@gmail.com> (https://dragonwocky.me/)
 * (https://notion-enhancer.github.io/) under the MIT license
 */

'use strict';

/**
 * helpers for formatting or parsing text
 * @module notion-enhancer/api/fmt
 */

import { web, fs, components } from './_.mjs';

import '../dep/prism.min.js';
/** syntax highlighting using https://prismjs.com/ */
export const prism = Prism;
Prism.manual = true;
Prism.hooks.add('complete', async (event) => {
  event.element.parentElement.removeAttribute('tabindex');
  event.element.parentElement.parentElement
    .querySelector('.copy-to-clipboard-button')
    .prepend(web.html`${await components.feather('clipboard')}`);
});

import '../dep/markdown-it.min.js';
/** markdown -> html using https://github.com/markdown-it/markdown-it/ */
export const md = new markdownit({
  linkify: true,
  highlight: (str, lang) =>
    web.html`<pre class="language-${lang || 'plaintext'} match-braces"><code>${web.escape(
      str
    )}</code></pre>`,
});
md.renderer.rules.code_block = (tokens, idx, options, env, slf) => {
  const attrIdx = tokens[idx].attrIndex('class');
  if (attrIdx === -1) {
    tokens[idx].attrPush(['class', 'match-braces language-plaintext']);
  } else tokens[idx].attrs[attrIdx][1] = 'match-braces language-plaintext';
  return web.html`<pre${slf.renderAttrs(tokens[idx])}><code>${web.escape(
    tokens[idx].content
  )}</code></pre>\n`;
};
md.core.ruler.push(
  'heading_ids',
  function (md, state) {
    const slugs = new Set();
    state.tokens.forEach(function (token, i) {
      if (token.type === 'heading_open') {
        const text = md.renderer.render(state.tokens[i + 1].children, md.options),
          slug = slugger(text, slugs);
        slugs.add(slug);
        const attrIdx = token.attrIndex('id');
        if (attrIdx === -1) {
          token.attrPush(['id', slug]);
        } else token.attrs[attrIdx][1] = slug;
      }
    });
  }.bind(null, md)
);

/**
 * transform a heading into a slug (a lowercase alphanumeric string separated by dashes),
 * e.g. for use as an anchor id
 * @param {string} heading - the original heading to be slugified
 * @param {Set<string>} [slugs] - a list of pre-generated slugs to avoid duplicates
 * @returns {string} the generated slug
 */
export const slugger = (heading, slugs = new Set()) => {
  heading = heading
    .replace(/\s/g, '-')
    .replace(/[^A-Za-z0-9-_]/g, '')
    .toLowerCase();
  let i = 0,
    slug = heading;
  while (slugs.has(slug)) {
    i++;
    slug = `${heading}-${i}`;
  }
  return slug;
};

/**
 * generate a reasonably random uuidv4 string. uses crypto implementation if available
 * (from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid)
 * @returns {string} a uuidv4
 */
export const uuidv4 = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};

/**
 * log-based shading of an rgb color, from
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * @param {number} p - a decimal amount to shade the color.
 * 1 = white, 0 = the original color, -1 = black
 * @param {string} c - the rgb color
 * @returns {string} the shaded color
 */
export const rgbLogShade = (p, c) => {
  var i = parseInt,
    r = Math.round,
    [a, b, c, d] = c.split(','),
    P = p < 0,
    t = P ? 0 : p * 255 ** 2,
    P = P ? 1 + p : 1 - p;
  return (
    'rgb' +
    (d ? 'a(' : '(') +
    r((P * i(a[3] == 'a' ? a.slice(5) : a.slice(4)) ** 2 + t) ** 0.5) +
    ',' +
    r((P * i(b) ** 2 + t) ** 0.5) +
    ',' +
    r((P * i(c) ** 2 + t) ** 0.5) +
    (d ? ',' + d : ')')
  );
};

/**
 * pick a contrasting color e.g. for text on a variable color background
 * using the hsp (perceived brightness) constants from http://alienryderflex.com/hsp.html
 * @param {number} r - red (0-255)
 * @param {number} g - green (0-255)
 * @param {number} b - blue (0-255)
 * @returns {string} the contrasting rgb color, white or black
 */
export const rgbContrast = (r, g, b) => {
  return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)) > 165.75
    ? 'rgb(0,0,0)'
    : 'rgb(255,255,255)';
};

const patterns = {
  alphanumeric: /^[\w\.-]+$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  semver:
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/i,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  url: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i,
  color: /^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)$/i,
};
function test(str, pattern) {
  const match = str.match(pattern);
  return !!(match && match.length);
}

/**
 * test the type of a value. unifies builtin, regex, and environment/api checks
 * @param {*} value - the value to check
 * @param {string|array<values>} type - the type the value should be or a list of allowed values
 * @returns {boolean} whether or not the value matches the type
 */
export const is = async (value, type, { extension = '' } = {}) => {
  extension = !value || !value.endsWith || value.endsWith(extension);
  if (Array.isArray(type)) {
    return type.includes(value);
  }
  switch (type) {
    case 'array':
      return Array.isArray(value);
    case 'object':
      return value && typeof value === 'object' && !Array.isArray(value);
    case 'undefined':
    case 'boolean':
    case 'number':
      return typeof value === type && extension;
    case 'string':
      return typeof value === type && value.length && extension;
    case 'alphanumeric':
    case 'uuid':
    case 'semver':
    case 'email':
    case 'url':
    case 'color':
      return typeof value === 'string' && test(value, patterns[type]) && extension;
    case 'file':
      return typeof value === 'string' && value && (await fs.isFile(value)) && extension;
  }
  return false;
};
