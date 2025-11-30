import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

// 初始化marked
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

/**
 * Markdown转HTML
 * @param {string} mdText 
 * @returns {string}
 */
export const mdToHtml = (mdText) => {
  return mdText ? marked(mdText) : ''
}