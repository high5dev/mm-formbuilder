const socialLink = {
  noLabel: true,
  // Expects as return a simple HTML string or an HTML element
  createInput({trait, component}) {
    const socialList = component.props().socialList;
    const traitName = trait.get('name');
    let newName = '';
    let newUrl = '';
    let newImage = '';
    // Here we can decide to use properties from the trait
    // const traitOpts = trait.get('options') || [];
    // const options = traitOpts.length ? traitOpts : [
    //   { id: 'url', name: 'URL' },
    //   { id: 'email', name: 'Email' },
    // ];

    // Create a new element container and add some content
    const el = document.createElement('div');
    el.className = 'trait-social-bar';
    el.innerHTML = `<h6>Social links</h6>`;

    const containerElement = document.createElement('div');
    containerElement.className = 'trait-social-items-container';
    const socialItems = [];
    socialList.forEach((item, index) => {
      socialItems.push(`
        <div class="trait-social-link-item">
          <img id="link-img-id-${index}" class="trait-social-link-item-img" src=${item.image || "https://i.ibb.co/1Q0tjDs/image-7.png"} width="50" height="50"/>
          <div class="trait-social-link-item-detail">
            <input id="link-name-id-${index}" class="trait-social-link-name" type="text" placeholder="Insert link name" value="${item.name}"/>
            <input id="link-url-id-${index}" class="trait-social-link-url" type="url" placeholder="Insert link URL" value="${item.url}"/>
          </div>
          <button class="trait-social-link-delete"><i class="fa fa-trash"></i></button>
        </div>
      `);
    });
    containerElement.innerHTML = socialItems.join('');

    const newLinkElement = document.createElement('div');
    newLinkElement.className = 'trait-new-social';
    newLinkElement.innerHTML = `
      <div class="trait-new-social-label">New link</div>
      <div class="trait-new-social-link">
        <input class="trait-new-social-link__name" type="text" placeholder="Insert link name"/>
        <input class="trait-new-social-link__url" type="url" placeholder="Insert link URL"/>
        <input class="trait-new-social-link__icon" type="url" placeholder="Select icon"/>
      </div>
      <button class="trait-new-social-link-add-btn">Add</button>
    `;

    el.appendChild(containerElement);
    el.appendChild(newLinkElement);

    // Let's make our content interactive
    const btnAdd = el.querySelector('.trait-new-social-link-add-btn');

    el.querySelectorAll('.trait-social-link-delete').forEach((item, index) => {
      item.addEventListener('click', event => {
        //handle click
        const tempList = [...socialList];
        tempList.splice(index, 1);
        component.set(traitName, tempList);
      })
    })

    btnAdd.addEventListener('click', ev => {
      component.set(traitName, [
        ...socialList,
        {
          name: newName,
          url: newUrl,
          image: newImage,
          type: 'webaddress'
        }
      ]);
    })

    return el;
  },

  onEvent({ elInput, component, event }) {
    if (event.target.name) {
      const index = parseInt(event.target.id.split('-')[3], 10);
      const socialList = [...component.props().socialList];
      const itemToChange = socialList[index];
      socialList.splice(index, 1, {...itemToChange, [event.target.name]: event.target.value});
      component.set('socialList', socialList.slice(0, socialList.length));
    }
  },

  onUpdate({ elInput, component }) {
    const socialList = component.props().socialList;
    const itemsContainer = elInput.querySelector('.trait-social-items-container');

    while (itemsContainer.hasChildNodes()) {
      itemsContainer.removeChild(itemsContainer.firstChild);
    }

    const socialItems = [];
    socialList.forEach((item, index) => {
      socialItems.push(`
        <div class="trait-social-link-item">
          <img id="link-img-id-${index}" name="image" class="trait-social-link-item-img" src=${item.image || "https://i.ibb.co/1Q0tjDs/image-7.png"} width="50" height="50"/>
          <div class="trait-social-link-item-detail">
            <input id="link-name-id-${index}" name="name" class="trait-social-link-name" type="text" placeholder="Insert link name" value="${item.name}"/>
            <input id="link-url-id-${index}" name="url" class="trait-social-link-url" type="url" placeholder="Insert link URL" value="${item.url}"/>
          </div>
          <button class="trait-social-link-delete"><i class="fa fa-trash"></i></button>
        </div>
      `);
    });
    itemsContainer.innerHTML = socialItems.join('');

    itemsContainer.querySelectorAll('.trait-social-link-delete').forEach((item, index) => {
      item.addEventListener('click', event => {
        const tempList = [...socialList];
        tempList.splice(index, 1);
        component.set('socialList', tempList);
      })
    });

    itemsContainer.querySelectorAll('.trait-social-link-item-img').forEach((item, index) => {
      item.addEventListener('click', event => {
        const tempList = [...socialList];
        tempList.splice(index, 1);
        component.set('socialList', tempList);
      })
    });
  },
}

export default socialLink;