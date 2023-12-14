const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let iframe = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('iframe-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'iframe-element' },
        components: (props) => {
            return(
                    <iframe src="https://www.w3school.com" width="100px" height="100px"></iframe>   
            )
          },
        traits: [
          {
            type: 'string',
            name: 'url',
            changeProp: true,
            min: 1,
          },
        ],
        
        styles: `.iframe-element {min-height: 100px; min-width:100px;background-color: white;}`,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
      },
    },
    view: {
      init() {
        this.listenTo(this.model, 'change:url', this.handleChangeUrl);
      },
      handleChangeUrl() {
        const comps=this.model.get('components');
        const _element=comps.parent.getEl();
        const url=this.model.get('url');
        let iframes=_element.getElementsByTagName('iframe');
        for(let i=0; i<iframes.length;i++){
          const iframe=iframes[i];
          iframe.setAttribute('src', url);
        }
        const item=_element.innerHTML;
        while (comps.length > 0) {
          comps.pop();
        };
        comps.push(item)
        this.render();
      },
    }
  };
  
  export default iframe;
  