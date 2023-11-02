//media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"></path><path d="M4 11.5h16v1H4z"></path></svg>`,
//<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z"></path></svg>
let blocksJson = [
  {
    id: 'image',
    label: 'Image',
    select: true,
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="image"><path d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a2.81,2.81,0,0,0,.49-.05l.3-.07.07,0h0l.05,0,.37-.14.13-.07c.1-.06.21-.11.31-.18a3.79,3.79,0,0,0,.38-.32l.07-.09a2.69,2.69,0,0,0,.27-.32l.09-.13a2.31,2.31,0,0,0,.18-.35,1,1,0,0,0,.07-.15c.05-.12.08-.25.12-.38l0-.15A2.6,2.6,0,0,0,22,19V5A3,3,0,0,0,19,2ZM5,20a1,1,0,0,1-1-1V14.69l3.29-3.3h0a1,1,0,0,1,1.42,0L17.31,20Zm15-1a1,1,0,0,1-.07.36,1,1,0,0,1-.08.14.94.94,0,0,1-.09.12l-5.35-5.35.88-.88a1,1,0,0,1,1.42,0h0L20,16.69Zm0-5.14L18.12,12a3.08,3.08,0,0,0-4.24,0l-.88.88L10.12,10a3.08,3.08,0,0,0-4.24,0L4,11.86V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1ZM13.5,6A1.5,1.5,0,1,0,15,7.5,1.5,1.5,0,0,0,13.5,6Z"></path></svg>`,
    content: {
      type: 'image',
    },
  },
  {
    id: 'text',
    label: 'Text',
    select: true,
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="text"><path fill-rule="evenodd" d="M6.25 22v-.75c1.4.073 2.748-.306 3.111-.688.363-.382.639-1.03.639-2.375V3.5H8.296c-1.716 0-3.723.269-4.359.775C3.302 4.78 2.845 6.439 2.525 8H1.75l.186-6h19.128l.186 6h-.775c-.32-1.561-.777-3.219-1.412-3.725-.636-.506-2.643-.775-4.36-.775H13v14.687c0 1.344.276 1.993.639 2.375.363.382 1.711.761 3.111.688V22H6.25Z"></path></svg>`,
    content: {
      type: 'heading',
    },
  },
  {
    id: 'paragraph',
    label: 'Paragraph',
    select: true,
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="paragraph"><g fill="none" stroke="#303c42" stroke-linecap="round" stroke-linejoin="round" data-name="<Group>"><path d="M.5 9.5h23M.5 14.5h23M.5 19.5h15M.5 4.5h23" data-name="<Path>"></path></g></svg>`,
    content: {
      type: 'paragraph',
    },
  }
];

export default blocksJson;
