export const formblocks = [
    {
      id: 'short answer',
      label: 'Short Answer',
      attributes: { class: 'fa fa-text' },
      content: { type: 'short-answer' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="text"><path d="M17,6H7A1,1,0,0,0,7,8h4v9a1,1,0,0,0,2,0V8h4a1,1,0,0,0,0-2Z"></path></svg>`,
      category: 'General',
    },
    {
      id: 'long answer',
      label: 'Long Answer',
      attributes: { class: 'fa fa-text' },
      content: { type: 'long-answer' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="text"><path d="M17,6H7A1,1,0,0,0,7,8h4v9a1,1,0,0,0,2,0V8h4a1,1,0,0,0,0-2Z"></path></svg>`,
      category: 'General',
    },
    {
      id: 'number',
      label: 'Number',
      attributes: { class: 'fa fa-text' },
      content: { type: 'number' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="number"><path fill-rule="evenodd" d="M6 10h4V6H6v4zm10-4V4h-4V0h-2v4H6V0H4v4H0v2h4v4H0v2h4v4h2v-4h4v4h2v-4h4v-2h-4V6h4z"></path></svg>`,
      category: 'General',
    },
    {
      id: 'link',
      label: 'Link',
      attributes: { class: 'fa fa-text' },
      content: { type: 'form-link' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="link"><path d="M12.1,15.4l-3.9,3.9c-1,0.9-2.5,0.9-3.5,0c-1-1-1-2.5,0-3.5l3.9-3.9c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-3.9,3.9
      c-1.7,1.8-1.7,4.6,0,6.3c1.7,1.7,4.6,1.7,6.3,0l3.9-3.9c0.4-0.4,0.4-1,0-1.4S12.5,15,12.1,15.4z M8.8,15.2
      C8.8,15.2,8.8,15.2,8.8,15.2c0.4,0.4,1,0.4,1.4,0l0,0l4.9-4.9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.9,4.9
      C8.4,14.1,8.4,14.8,8.8,15.2z M20.7,3.3c-1.7-1.7-4.6-1.7-6.3,0l-3.9,3.9c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l3.9-3.9
      c1-0.9,2.5-0.9,3.5,0c1,1,1,2.5,0,3.5l-3.9,3.9c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l3.9-3.9C22.4,7.9,22.4,5.1,20.7,3.3z"></path></svg>`,
      category: 'General',
    },
    {
      id: 'checkbox',
      label: 'Checkbox',
      attributes: { class: 'fa fa-text' },
      content: { type: 'checkbox' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="checkbox"><path d="M20.906,24H3.094A3.1,3.1,0,0,1,0,20.906V3.094A3.1,3.1,0,0,1,3.094,0H20.906A3.1,3.1,0,0,1,24,3.094V20.906A3.1,3.1,0,0,1,20.906,24ZM3.094,2A1.1,1.1,0,0,0,2,3.094V20.906A1.1,1.1,0,0,0,3.094,22H20.906A1.1,1.1,0,0,0,22,20.906V3.094A1.1,1.1,0,0,0,20.906,2Z"></path><path d="M10,17a1,1,0,0,1-.707-.293l-4-4a1,1,0,0,1,1.415-1.414L10,14.585l7.292-7.292a1,1,0,0,1,1.415,1.415l-8,8A1,1,0,0,1,10,17Z"></path></svg>`,
      category: 'General',
    },
    {
      id: 'single-choice',
      label: 'Single choice',
      attributes: { class: 'fa fa-text' },
      content: { type: 'single-choice' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="radio"><g data-name="Layer 2"><g data-name="radio-button-on"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"></path></g></g></svg>`,
      category: 'General',
    },
    {
      id: 'multi-choice',
      label: 'Multi choice',
      attributes: { class: 'fa fa-text' },
      content: { type: 'multi-choice' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="checkbox"><path d="m8.525 8.857-.801.63c.015.085.026.173.026.263v.989l1.393-1.096a.5.5 0 0 0-.618-.786zM6.25 9.25h-5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-3.224l-2.691 2.118a.505.505 0 0 1-.42.093.499.499 0 0 1-.338-.269l-.958-1.958a.5.5 0 0 1 .898-.44l.686 1.403 2.823-2.222V9.75a.5.5 0 0 0-.5-.5zM6.25 17.25h-5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zM22.75 18.25h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zM22.75 21.25h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zM22.75 10.25h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zM22.75 13.25h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zM11.75 3.25h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1zM22.75 5.25h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zM8.525.857l-.801.63c.015.085.026.173.026.263v.989l1.393-1.096a.5.5 0 0 0-.618-.786zM6.25 1.25h-5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V3.526L4.059 5.645a.51.51 0 0 1-.42.092.5.5 0 0 1-.338-.268l-.958-1.958a.5.5 0 0 1 .898-.44l.686 1.403L6.75 2.253V1.75a.5.5 0 0 0-.5-.5z"></path></svg>`,
      category: 'General'
    },
    {
      id: 'dropdown',
      label: 'Dropdown',
      attributes: { class: 'fa fa-text' },
      content: { type: 'dropdown' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" id="dropdown" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="M14.5 27.065a12.465 12.465 0 0 1-8.839-3.655c-4.874-4.874-4.874-12.804 0-17.678 2.361-2.361 5.5-3.662 8.839-3.662s6.478 1.3 8.839 3.662c4.874 4.874 4.874 12.804 0 17.678a12.465 12.465 0 0 1-8.839 3.655zm0-22.995a10.43 10.43 0 0 0-7.425 3.076c-4.093 4.094-4.093 10.755 0 14.85 4.094 4.093 10.755 4.093 14.85 0 4.093-4.094 4.093-10.755 0-14.85A10.434 10.434 0 0 0 14.5 4.07zm8.132 18.633h.01-.01z"></path><path d="M14.5 17.869a.997.997 0 0 1-.707-.293L9.197 12.98a.999.999 0 1 1 1.414-1.414l3.889 3.889 3.889-3.889a.999.999 0 1 1 1.414 1.414l-4.596 4.596a.997.997 0 0 1-.707.293z"></path></svg>`,
      category: 'General'
    },
    {
      id: 'submit',
      label: 'Submit',
      attributes: { class: 'fa fa-text' },
      content: { type: 'submit' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="submit"><path d="M3.0005,27c-0.3125,0-0.6147-0.1465-0.8076-0.4092c-0.2666-0.3652-0.2559-0.8633,0.0264-1.2158l7.5-9.375l-7.5-9.375C1.937,6.2725,1.9263,5.7744,2.1929,5.4092C2.459,5.0459,2.937,4.9043,3.3589,5.0664l26,10C29.7451,15.2148,30,15.5859,30,16s-0.2549,0.7852-0.6411,0.9336l-26,10C3.2417,26.9785,3.1201,27,3.0005,27z M6.0879,8.2588l5.6929,7.1162c0.2925,0.3652,0.2925,0.8848,0,1.25l-5.6929,7.1162L26.2144,16L6.0879,8.2588z"></path></svg>`,
      category: 'General'
    }
];