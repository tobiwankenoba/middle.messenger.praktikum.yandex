import { JSDOM } from "jsdom";
import { XMLHttpRequest } from "node-xmlhttprequest";
import { ReadableStream } from "web-streams-polyfill";


if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = new ReadableStream();
}

const jsdom = new JSDOM(
  '<!DOCTYPE html><html><body><div id="app"></div></body></html>',
);

global.XMLHttpRequest = XMLHttpRequest;
global.window = jsdom.window;
global.history = jsdom.window.history;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
