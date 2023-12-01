export const blocks = [
  {
    id: 'repeater',
    label: 'Repeater',
    attributes: { class: 'fa fa-text' },
    content: { type: 'repeater' },
    media: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" id="grid"><path d="M28.1 29.92h-16a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 1.92zm-14-4h12V14h-12zm14 28.13h-16a2 2 0 0 1-2-2v-16a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zm-14-4h12v-12h-12zm37.78 4h-16a2 2 0 0 1-2-2v-16a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zm-14-4h12v-12h-12zm6.9-22.79a2 2 0 0 1-2-2V15.5a2 2 0 0 1 4 0v9.76a2 2 0 0 1-2 2z"></path><path d="M49.66 22.38H39.9a2 2 0 0 1 0-4h9.76a2 2 0 0 1 0 4Z"></path></svg>`,
    category: 'Basic',
  },
  {
    id: 'social-bar',
    label: 'Social Bar',
    attributes: { class: 'fa fa-text' },
    content: { type: 'social-bar' },
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="social"><path d="M27.86,19.73A12.36,12.36,0,0,0,28,18,11.92,11.92,0,0,0,22,7.59,5.83,5.83,0,0,0,22,7,6,6,0,0,0,10,7a5.83,5.83,0,0,0,0,.59A11.92,11.92,0,0,0,4,18a12.36,12.36,0,0,0,.14,1.73,6,6,0,1,0,7.26,9.34,11.84,11.84,0,0,0,9.2,0,6,6,0,1,0,7.26-9.34ZM16,3a4,4,0,1,1-4,4A4,4,0,0,1,16,3ZM7,29a4,4,0,1,1,4-4A4,4,0,0,1,7,29Zm5.51-1.63A6,6,0,0,0,7,19a5.77,5.77,0,0,0-.94.08A9.64,9.64,0,0,1,6,18a9.92,9.92,0,0,1,4.6-8.4,6,6,0,0,0,10.8,0A9.92,9.92,0,0,1,26,18a9.64,9.64,0,0,1-.06,1.08A5.77,5.77,0,0,0,25,19a6,6,0,0,0-5.51,8.37A10.09,10.09,0,0,1,12.51,27.37ZM25,29a4,4,0,1,1,4-4A4,4,0,0,1,25,29Z"></path></svg>`,
    category: 'Basic',
  },
  {
    id: 'gallery',
    label: 'Gallery',
    attributes: { class: 'fa fa-text' },
    content: { type: 'gallery' },
    media: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 122.879 96.568" enable-background="new 0 0 122.879 96.568" xml:space="preserve"><g><path d="M5.535,15.447h98.221c1.527,0,2.891,0.62,3.883,1.611c0.99,0.991,1.611,2.396,1.611,3.882v70.134 c0,1.528-0.621,2.891-1.611,3.883c-0.082,0.082-0.166,0.165-0.289,0.247c-0.951,0.868-2.23,1.363-3.635,1.363H5.494 c-1.528,0-2.892-0.619-3.883-1.61S0,92.562,0,91.075V20.941c0-1.528,0.62-2.891,1.611-3.882s2.396-1.611,3.883-1.611H5.535 L5.535,15.447z M28.218,34.489c4.354,0,7.882,3.528,7.882,7.882s-3.528,7.883-7.882,7.883c-4.354,0-7.882-3.529-7.882-7.883 C20.335,38.018,23.864,34.489,28.218,34.489L28.218,34.489z M61.389,68.316l15.766-27.258l16.748,42.363l-78.165-0.001v-5.254 l6.57-0.327l6.567-16.093l3.282,11.496h9.855l8.537-22.004L61.389,68.316L61.389,68.316z M21.891,6.525 c-1.817,0-3.263-1.486-3.263-3.263C18.628,1.445,20.115,0,21.891,0h97.726c1.816,0,3.262,1.487,3.262,3.263v68.895 c0,1.818-1.486,3.264-3.262,3.264c-1.818,0-3.264-1.487-3.264-3.264V6.567H21.891V6.525L21.891,6.525z M102.723,21.974H6.567 v68.027h96.155V21.974L102.723,21.974z"/></g></svg>`,
    category: 'Basic',
  },
  {
    id: 'iframe-element',
    label: 'Iframe',
    attributes: { class: 'fa fa-text' },
    content: { type: 'iframe-element' },
    media: `<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 20h7v-16h-16v7h7c1.1045695 0 2 .8954305 2 2zm-2 0v-7h-7v7zm-7-18h16c1.1045695 0 2 .8954305 2 2v16c0 1.1045695-.8954305 2-2 2h-16c-1.1045695 0-2-.8954305-2-2v-16c0-1.1045695.8954305-2 2-2z" fill-rule="evenodd"/></svg>`,
    category: 'Basic',
  },
  {
    id: 'post-list-large',
    label: 'Post List(Large)',
    attributes: { class: 'fa fa-text' },
    content: { type: 'post-list-large' },
    media: `https://i.ibb.co/6br0NxL/1.png`,
    category: 'blog'
  },
  {
    id: 'post-card-large',
    label: 'Post List(Large)',
    attributes: { class: 'fa fa-text' },
    content: { type: 'post-card-large' },
    media: `https://i.ibb.co/j34rmMk/3.png`,
    category: 'blog'
  },
  {
    id: 'post-list-sidebar',
    label: 'Post List(Sidebar)',
    attributes: { class: 'fa fa-text' },
    content: { type: 'post-list-sidebar' },
    media: `https://i.ibb.co/TTs2tXk/2.png`,
    category: 'blog'
  },
  {
    id: 'recent-post',
    label: 'Recent Posts',
    attributes: { class: 'fa fa-text' },
    content: { type: 'recent-post' },
    media: `https://i.ibb.co/j34rmMk/3.png`,
    category: 'blog'
  },
  {
    id: 'category-menu',
    label: 'Category Menu',
    attributes: { class: 'fa fa-text' },
    content: { type: 'category-menu' },
    media: `https://i.ibb.co/hBk6hBb/4.png`,
    category: 'blog'
  },
  {
    id: 'archive',
    label: 'Archive',
    attributes: { class: 'fa fa-text' },
    content: { type: 'archive-menu' },
    media: `https://i.ibb.co/HG7zbgb/5.png`,
    category: 'blog'
  },
  {
    id: 'rss button yellow',
    label: 'RSS Button',
    attributes: { class: 'fa fa-text' },
    content: { type: 'rss-yellow-button' },
    media: `https://i.ibb.co/CBwqT6V/rss.png`,
    category: 'blog'
  },
  {
    id: 'rss button black',
    label: 'RSS Button',
    attributes: { class: 'fa fa-text' },
    content: { type: 'rss-black-button' },
    media: `https://i.ibb.co/jH2JzG3/rss-1.png`,
    category: 'blog'
  },
  {
    id: 'rss button gray',
    label: 'RSS Button',
    attributes: { class: 'fa fa-text' },
    content: { type: 'rss-gray-button' },
    media: `https://i.ibb.co/VBQS6m8/rss-2.png`,
    category: 'blog'
  },
  {
    id: 'rss button outline black',
    label: 'RSS Button',
    attributes: { class: 'fa fa-text' },
    content: { type: 'rss-outline-black-button' },
    media: `https://i.ibb.co/z7Nh9Cx/rss-3.png`,
    category: 'blog'
  },
  {
    id: 'rss button outline gray',
    label: 'RSS Button',
    attributes: { class: 'fa fa-text' },
    content: { type: 'rss-outline-gray-button' },
    media: `https://i.ibb.co/JQqFgcX/rss-4.png`,
    category: 'blog'
  }
];
