export const formblocks = [
    {
      id: 'first-name',
      label: 'First Name',
      attributes: { class: 'fa fa-text' },
      content: { type: 'first-name' },
      media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="name"><g><g><g><circle cx="7.5" cy="10.5" r="2" fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round"></circle><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M7.5,14c-1.1,0.1-2.2,0.4-3.2,1c-0.5,0.3-0.8,0.9-0.8,1.6v0.3c0,0.3,0.2,0.6,0.6,0.7h6.9     c0.3,0,0.6-0.3,0.6-0.7v-0.3c0-0.6-0.3-1.2-0.8-1.6C9.7,14.4,8.6,14.1,7.5,14z"></path></g><line x1="14.5" x2="20.5" y1="15.5" y2="15.5" fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round"></line><line x1="20.5" x2="12.5" y1="12.5" y2="12.5" fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round"></line><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M10.5,5.5H2C1.2,5.5,0.5,6.2,0.5,7v12c0,0.8,0.7,1.5,1.5,1.5h20c0.8,0,1.5-0.7,1.5-1.5V7    c0-0.8-0.7-1.5-1.5-1.5h-8.5"></path><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M12,3.5L12,3.5c0.8,0,1.5,0.7,1.5,1.5v2.5l0,0h-3l0,0V5C10.5,4.2,11.2,3.5,12,3.5z"></path></g></g></svg>`,
      category: 'Form',
    },
    {
        id: 'last-name',
        label: 'Last Name',
        attributes: { class: 'fa fa-text' },
        content: { type: 'last-name' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="name"><g><g><g><circle cx="7.5" cy="10.5" r="2" fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round"></circle><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M7.5,14c-1.1,0.1-2.2,0.4-3.2,1c-0.5,0.3-0.8,0.9-0.8,1.6v0.3c0,0.3,0.2,0.6,0.6,0.7h6.9     c0.3,0,0.6-0.3,0.6-0.7v-0.3c0-0.6-0.3-1.2-0.8-1.6C9.7,14.4,8.6,14.1,7.5,14z"></path></g><line x1="14.5" x2="20.5" y1="15.5" y2="15.5" fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round"></line><line x1="20.5" x2="12.5" y1="12.5" y2="12.5" fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round"></line><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M10.5,5.5H2C1.2,5.5,0.5,6.2,0.5,7v12c0,0.8,0.7,1.5,1.5,1.5h20c0.8,0,1.5-0.7,1.5-1.5V7    c0-0.8-0.7-1.5-1.5-1.5h-8.5"></path><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M12,3.5L12,3.5c0.8,0,1.5,0.7,1.5,1.5v2.5l0,0h-3l0,0V5C10.5,4.2,11.2,3.5,12,3.5z"></path></g></g></svg>`,
        category: 'Form',
      },
      {
        id: 'email',
        label: 'Email',
        attributes: { class: 'fa fa-text' },
        content: { type: 'email' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="email"><path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path><path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path><path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path></svg>`,
        category: 'Form',
      },
      {
        id: 'phone',
        label: 'Phone',
        attributes: { class: 'fa fa-text' },
        content: { type: 'phone' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="phone"><g data-name="<Group>"><g data-name="<Group>"><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M22.21 14.29 9.71 1.79a1 1 0 0 0-1.41 0l-6.5 6.5a1 1 0 0 0 0 1.41l12.5 12.5a1 1 0 0 0 1.41 0l6.5-6.5a1 1 0 0 0 0-1.41ZM13.04 20.96l7.92-7.92M17.5 18.5l1-1M5.5 6.5l1-1" data-name="<Path>"></path><circle cx="9" cy="3" r=".5" fill="#303c42" data-name="<Path>"></circle></g><path fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" d="M7.62 20.4a8.91 8.91 0 0 1-4-4m-1.81.87a10.89 10.89 0 0 0 4.92 4.92M22.19 6.73a10.89 10.89 0 0 0-4.92-4.92m3.13 5.81a8.91 8.91 0 0 0-4-4" data-name="<Path>"></path></g></svg>`,
        category: 'Form',
      },
      {
        id: 'birthday',
        label: 'Birthday',
        attributes: { class: 'fa fa-text' },
        content: { type: 'birthday' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="birthday"><g fill="none" stroke="#303C42" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><path d="M22.5 7.5V21a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 21V7.5"></path><path d="M10.5 10.5v12h3v-12M14.762 7.5H23.5V5A1.5 1.5 0 0022 3.5h-3.382M5.382 3.5H2A1.5 1.5 0 00.5 5v2.5h8.781"></path><circle cx="12" cy="5" r="1.5"></circle><path d="M10.812 4.078C9.344 2.608 7.22 1.5 6 1.5s-.5 2.156-.5 3-.188 3 1 3c1.187 0 4.36-1.547 4.36-1.547M13.219 4.156C14.688 2.688 16.78 1.5 18 1.5s.5 2.156.5 3 .188 3-1 3-4.266-1.594-4.266-1.594"></path><path d="M9.672 6.5L8.5 9.5 10 9l.5 1.5 1.5-4M14.375 6.453L15.5 9.5 14 9l-.5 1.5-1.5-4"></path></g></svg>`,
        category: 'Form',
      },
      {
        id: 'address',
        label: 'Address',
        attributes: { class: 'fa fa-text' },
        content: { type: 'address' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 60 60" viewBox="0 0 60 60" id="address"><path d="M38,19c0-4.4-3.6-8-8-8s-8,3.6-8,8s3.6,8,8,8S38,23.4,38,19z M24,19c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S24,22.3,24,19z"></path><path d="M11.7,34L6.2,50C5.8,50.9,6,52,6.6,52.7C7.1,53.5,8,54,9,54h42c1,0,1.9-0.5,2.4-1.3c0.6-0.8,0.7-1.8,0.4-2.7l-5.6-16
        c-0.4-1.2-1.5-2-2.8-2h-7.3c2.6-4.9,4.8-10,4.8-13c0-7.2-5.8-13-13-13s-13,5.8-13,13c0,3,2.2,8.1,4.8,13h-7.3
        C13.3,32,12.1,32.8,11.7,34z M30,8c6.1,0,11,4.9,11,11c0,4.8-7.3,17.3-11,23.1C26.3,36.3,19,23.8,19,19C19,12.9,23.9,8,30,8z
         M29.2,44.5l0.8,1.3l0.8-1.3c0.2-0.4,3.3-5.1,6.3-10.5h8.3c0.4,0,0.8,0.3,0.9,0.7l5.6,16c0.1,0.3,0.1,0.6-0.1,0.9
        C51.6,51.8,51.3,52,51,52H9c-0.3,0-0.6-0.2-0.8-0.4C8,51.3,7.9,51,8.1,50.7l5.6-16c0.1-0.4,0.5-0.7,0.9-0.7h8.3
        C25.9,39.5,28.9,44.2,29.2,44.5z"></path></svg>`,
        category: 'Form',
      },
      {
        id: 'subscribe',
        label: 'Subscribe',
        attributes: { class: 'fa fa-text' },
        content: { type: 'subscribe' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="subscribe"><path fill="#404040" d="M86.53 396.53h141.59c10-.38 9.91-14.64 0-15H86.53a29.94 29.94 0 0 1-29.91-29.91V145.44a30 30 0 0 1 29.91-29.91h278.18a29.94 29.94 0 0 1 29.91 29.91V215a7.5 7.5 0 0 0 15 0v-69.56a45 45 0 0 0-44.91-44.91H86.53a45 45 0 0 0-44.91 44.91v206.18a45 45 0 0 0 44.91 44.91Z"></path><path fill="#404040" d="m370.13 145.35-144.51 90.82-144.51-90.82a7.5 7.5 0 1 0-8 12.7l148.5 93.33a7.5 7.5 0 0 0 8 0l148.5-93.33c8.17-5.5.7-17.71-7.98-12.7zm-52.27 235.3A10.33 10.33 0 0 0 307.55 391c.57 13.68 20.05 13.67 20.62 0a10.33 10.33 0 0 0-10.31-10.35zM314 347.59c-9.92.35-9.93 14.66 0 15a32.27 32.27 0 0 1 32.24 32.24 7.5 7.5 0 0 0 15 0A47.29 47.29 0 0 0 314 347.59z"></path><path fill="#404040" d="M314 314.53c-9.91.35-9.94 14.65 0 15a65.38 65.38 0 0 1 65.3 65.3 7.5 7.5 0 0 0 15 0 80.39 80.39 0 0 0-80.3-80.3Z"></path><path fill="#404040" d="M314 281.48c-9.9.34-9.94 14.64 0 15a98.46 98.46 0 0 1 98.36 98.35 7.5 7.5 0 1 0 15 0A113.48 113.48 0 0 0 314 281.48Z"></path><path fill="#404040" d="M396.54 238.53H325.7a76.17 76.17 0 0 0-76.08 76.08v70.84a76.17 76.17 0 0 0 76.08 76.08h70.84a76.17 76.17 0 0 0 76.08-76.08v-70.84a76.17 76.17 0 0 0-76.08-76.08Zm61.08 146.92a61.15 61.15 0 0 1-61.08 61.08H325.7a61.15 61.15 0 0 1-61.08-61.08v-70.84a61.15 61.15 0 0 1 61.08-61.08h70.84a61.15 61.15 0 0 1 61.08 61.08Z"></path></svg>`,
        category: 'Form',
      },
      {
        id: 'company-name',
        label: 'Company Name',
        attributes: { class: 'fa fa-text' },
        content: { type: 'company-name' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" viewBox="0 0 48 48" id="company"><g><g><path fill="#231f20" d="M23.8,19.6c-4,0-7.2-3.2-7.2-7.2s3.2-7.2,7.2-7.2s7.2,3.2,7.2,7.2S27.8,19.6,23.8,19.6z M23.8,7.1    c-2.9,0-5.2,2.3-5.2,5.2s2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2S26.7,7.1,23.8,7.1z"></path></g><g><path fill="#231f20" d="M9.6,22.4c-2.8,0-5.1-2.3-5.1-5.1s2.3-5.1,5.1-5.1c2.8,0,5.1,2.3,5.1,5.1S12.4,22.4,9.6,22.4z M9.6,14.2    c-1.7,0-3.1,1.4-3.1,3.1s1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1S11.3,14.2,9.6,14.2z"></path></g><g><path fill="#231f20" d="M38.4,22.4c-2.8,0-5.1-2.3-5.1-5.1s2.3-5.1,5.1-5.1c2.8,0,5.1,2.3,5.1,5.1S41.3,22.4,38.4,22.4z M38.4,14.2    c-1.7,0-3.1,1.4-3.1,3.1s1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1S40.2,14.2,38.4,14.2z"></path></g><g><path fill="#231f20" d="M36.1,42.9H11.6c-0.6,0-1-0.4-1-1V29.5c0-4.7,3.8-8.5,8.5-8.5h9.5c4.7,0,8.5,3.8,8.5,8.5v12.3    C37.1,42.4,36.6,42.9,36.1,42.9z M12.6,40.9h22.4V29.5c0-3.6-2.9-6.5-6.5-6.5h-9.5c-3.6,0-6.5,2.9-6.5,6.5V40.9z"></path></g><g><path fill="#231f20" d="M46.5,38.7H36.1c-0.6,0-1-0.4-1-1v-8.1c0-1.5-0.5-3-1.5-4.2c-0.2-0.3-0.3-0.6-0.2-1c0.1-0.3,0.4-0.6,0.7-0.7    c0.4-0.1,0.8-0.1,1.2-0.1h6.2c3.3,0,5.9,2.7,5.9,5.9v8.1C47.5,38.2,47.1,38.7,46.5,38.7z M37.1,36.7h8.4v-7.1    c0-2.2-1.8-3.9-3.9-3.9h-5.5c0.6,1.2,1,2.6,1,3.9V36.7z"></path></g><g><path fill="#231f20" d="M11.6,38.7H1.5c-0.6,0-1-0.4-1-1v-8.1c0-3.3,2.7-5.9,5.9-5.9h6.2c0.3,0,0.6,0,0.9,0.1    c0.4,0.1,0.7,0.3,0.8,0.6c0.1,0.3,0.1,0.7-0.2,1c-1,1.2-1.6,2.7-1.6,4.2v8.1C12.6,38.2,12.2,38.7,11.6,38.7z M2.5,36.7h8.1v-7.1    c0-1.4,0.3-2.7,1-3.9H6.4c-2.2,0-3.9,1.8-3.9,3.9V36.7z"></path></g></g></svg>`,
        category: 'Form',
      },
      {
        id: 'position',
        label: 'Position',
        attributes: { class: 'fa fa-text' },
        content: { type: 'position' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" viewBox="0 0 48 48" id="position"><path d="M24,45c0.25,0,0.5-0.09,0.69-0.27C25.35,44.09,41,29.16,41,20c0-9.37-7.63-17-17-17S7,10.63,7,20
        c0,9.16,15.65,24.09,16.31,24.73C23.5,44.91,23.75,45,24,45z M9,20c0-8.27,6.73-15,15-15s15,6.73,15,15c0,7.29-11.97,19.61-15,22.6
        C20.97,39.61,9,27.3,9,20z"></path><path d="M32,20c0-4.41-3.59-8-8-8s-8,3.59-8,8s3.59,8,8,8S32,24.41,32,20z M18,20c0-3.31,2.69-6,6-6s6,2.69,6,6s-2.69,6-6,6
        S18,23.31,18,20z"></path></svg>`,
        category: 'Form',
      },
      {
        id: 'vat',
        label: 'VAT ID',
        attributes: { class: 'fa fa-text' },
        content: { type: 'vat-id' },
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="vat"><path d="M22 35H8a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zm0 5H8a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zm0-10H8a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM8 27h8a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2z"></path><path d="M46 34a10 10 0 0 0-9-9.95V10h7a1 1 0 0 0 1-1V5a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v42a1 1 0 0 0 1 1h33a1 1 0 0 0 1-1v-3a10 10 0 0 0 9-10ZM43 5v3h-6V5a3 3 0 0 1 6 0ZM4 46V5a3 3 0 0 1 3-3h29c-1.37 1.81-1 1-1 22.05A10 10 0 0 0 35 44v2Zm32-4a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"></path><path d="M26 18a1 1 0 0 0 2 0v-7h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2zm-5.06-8.35a1 1 0 0 0-1.88 0l-3 8a1 1 0 0 0 1.88.7l.5-1.35h3.12l.5 1.35a1 1 0 0 0 1.88-.7zM19.19 15l.81-2.15.81 2.15zm-8.13 3.35a1 1 0 0 0 1.88 0l3-8a1 1 0 0 0-1.88-.7L12 15.15l-2.06-5.5a1 1 0 0 0-1.88.7z"></path><circle cx="33" cy="31" r="2"></circle><circle cx="39" cy="37" r="2"></circle><path d="m38.42 29.38-6.4 8A1 1 0 0 0 32.8 39c.69 0 .36.16 7.18-8.37a1 1 0 0 0-1.56-1.25Z"></path></svg>`,
        category: 'Form',
      }
  ];