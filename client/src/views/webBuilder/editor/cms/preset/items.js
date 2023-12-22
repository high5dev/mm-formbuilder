export const items = (addedTime, itemPage) => {return `
  <div class="repeaters-10-wrapper">
    <div class="main-col">
        <h1 class="common-heading">My Items</h1>
    </div>
    <div class="repeater grid-display" id=${'repeater-' + addedTime}>
        <div class="repeater-item col col-1" id="${'repeater-item-1-' + addedTime}" >
            <img class="commin-img" src="https://i.ibb.co/yFgPLdP/item1.png" id="${'image-1-' + addedTime}" />
            
            <h3 class="common-heading" id="${'text-1-' + addedTime}">title 01</h3>
            <p class="common-text" id="${'text-2-' + addedTime}">This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.</p>
            <div class="link-element" id="${'link-element-1-' + addedTime}">
                <a href="${itemPage}" class="link-submit-element" target="_parent">
                    <div>
                        <input type='button' class="input-link-element" value="Read More"/> 
                    </div>
                </a>
            </div>
        </div>
        <div class="repeater-item col col-1" id="${'repeater-item-2-' + addedTime}">
            <img class="commin-img" src="https://i.ibb.co/NLKMhMK/item2.png" id="${'image-2-' + addedTime}"/>
            
            <h3 class="common-heading" id="${'text-3-' + addedTime}">title 02</h3>
            <p class="common-text" id="${'text-4-' + addedTime}">This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.</p>
            <div class="link-element" id="${'link-element-2-' + addedTime}">
                <a href="${itemPage}" class="link-submit-element" target="_parent">
                    <div>
                        <input type='button' class="input-link-element" value="Read More"/> 
                    </div>
                </a>
            </div>
        </div>
        <div class="repeater-item col col-1" id="${'repeater-item-3-' + addedTime}">
            <img class="commin-img" src="https://i.ibb.co/9pgKQNL/item3.png" id="${'image-3-' + addedTime}"/>
            
            <h3 class="common-heading" id="${'text-5-' + addedTime}">title 03</h3>
            <p class="common-text" id="${'text-6-' + addedTime}">This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.</p>
            <div class="link-element" id="${'link-element-3-' + addedTime}">
                <a href="${itemPage}" class="link-submit-element" target="_parent">
                    <div>
                        <input type='button' class="input-link-element" value="Read More"/> 
                    </div>
                </a>
            </div>
        </div>
        <div class="repeater-item col col-1" id="${'repeater-item-4-' + addedTime}">
            <img class="commin-img" src="https://i.ibb.co/5xhvQ5w/item4.png" id="${'image-4-' + addedTime}"/>
            
            <h3 class="common-heading" id="${'text-7-' + addedTime}">title 04</h3>
            <p class="common-text" id="${'text-8-' + addedTime}">This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.</p>
            <div class="link-element" id="${'link-element-4-' + addedTime}">
                <a href="${itemPage}" class="link-submit-element" target="_parent">
                    <div>
                        <input type='button' class="input-link-element" value="Read More"/> 
                    </div>
                </a>
            </div>
        </div>
    </div>
  </div>
`};

export const itemsCss = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body {
            margin: 0;
        }

        .repeaters-10-wrapper {
            margin: 0 auto;
            max-width: 1300px;
            padding: 50px;
        }

        .repeaters-10-wrapper .common-heading {
            font-family: Poppins;
            font-weight: 600;
            margin: 10px 0;
        }

        .repeaters-10-wrapper .common-text {
            font-family: 'Avenir';
            font-weight: 500;
            line-height: 25px;
            font-size: 15px;
            margin: 10px 0;
        }

        .repeaters-10-wrapper .commin-img {
            width: 100% !important;
            height: fit-content;
            margin-bottom: 20px;
            margin-right: 0px;
            margin-left: 0px;
        }

        .repeaters-10-wrapper .grid-display {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }

        .repeaters-10-wrapper .grid-display .repeater-item {
            width: 100% !important ;
            border-radius: 10px;
            padding: 0 20px 0 20px;
            align-items: center;
            background-color: none !important;
            color: #000000 !important;
        }

        .repeaters-10-wrapper  .grid-display .input-link-element {
            padding: 10px 18px;
            letter-spacing: 1px;
            background: transparent;
            color: #000000;
            border: 1px solid;
            border-radius: 30px;
            font-family: poppins;
            font-size: 12px;
            font-weight: 400;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 20px;
        }

        .repeaters-10-wrapper  .grid-display .input-link-element:hover {
            background: #000000;
            color: #ffffff;
            border: 1px solid
        }

        .grid-display-main .main-col .common-heading {
            font-size: 40px;
        }

        @media (max-width: 1000px) {
            .repeaters-10-wrapper .grid-display {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .grid-display-main .main-col .common-heading {
                font-size: 30px;
            }

            .repeaters-10-wrapper .grid-display {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    </style>
`;

export const itemsRepeaterItemChildrenIds = (addedTime) => {
    return [
        {
            componentId: `repeater-${addedTime}`,
            componentType: 'repeater',
        },
        {
            componentId: `image-1-${addedTime}`,
            componentType: 'image',
            connectedField: 'image',
        },
        {
            componentId: `text-1-${addedTime}`,
            componentType: 'Text',
            connectedField: 'title',
        },
        {
            componentId: `text-2-${addedTime}`,
            componentType: 'Text',
            connectedField: 'short_description',
        },
        {
            componentId: `button-1-${addedTime}`,
            componentType: 'button',
            connectedField: '',
        },
    ];
}

export const itemsFields = [
    {
      name: 'id',
      type: 'Text',
      default: true,
    },
    {
      name: 'title',
      type: 'Text',
    },
    {
        name: 'image',
        type: 'Image',
    },
    {
        name: 'long_description',
        type: 'Text',
    },
    {
        name: 'short_description',
        type: 'Text',
    },
    {
        name: 'item',
        type: 'Text',
    },
    {
        name: 'list',
        type: 'Text',
    },
    {
      name: 'createdAt',
      type: 'Date',
      default: true,
    },
    {
      name: 'updatedAt',
      type: 'Date',
      default: true,
    },
];

export const itemsValues = [
    {
        title: 'title 01',
        image: 'https://i.ibb.co/yFgPLdP/item1.png',
        long_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content. Want to view and manage all your collections? Click the Data icon on the add panel to your left. In the Content Manager, you can update your items, add new fields, create dynamic pages and more.
            Your collection is already set up with fields and content. Add your own by editing each field, or import CSV files to your content manager. You can create fields for rich text, images, videos and more. Remember to click Sync, so visitors can see your collections on your live site. You can add as many collections as you need. 
            Use input elements like custom forms and fields to collect info from your site visitors and store it in your content manager Collections. Make sure all your elements Connect to Data, and Preview your Live Site to check that everything is correctly binded.`,
        short_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.`,
    },
    {
        title: 'title 02',
        image: 'https://i.ibb.co/NLKMhMK/item2.png',
        long_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content. Want to view and manage all your collections? Click the Data icon on the add panel to your left. In the Content Manager, you can update your items, add new fields, create dynamic pages and more.
            Your collection is already set up with fields and content. Add your own by editing each field, or import CSV files to your content manager. You can create fields for rich text, images, videos and more. Remember to click Sync, so visitors can see your collections on your live site. You can add as many collections as you need. 
            Use input elements like custom forms and fields to collect info from your site visitors and store it in your content manager Collections. Make sure all your elements Connect to Data, and Preview your Live Site to check that everything is correctly binded.`,
        short_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.`,
    },
    {
        title: 'title 03',
        image: 'https://i.ibb.co/9pgKQNL/item3.png',
        long_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content. Want to view and manage all your collections? Click the Data icon on the add panel to your left. In the Content Manager, you can update your items, add new fields, create dynamic pages and more.
            Your collection is already set up with fields and content. Add your own by editing each field, or import CSV files to your content manager. You can create fields for rich text, images, videos and more. Remember to click Sync, so visitors can see your collections on your live site. You can add as many collections as you need. 
            Use input elements like custom forms and fields to collect info from your site visitors and store it in your content manager Collections. Make sure all your elements Connect to Data, and Preview your Live Site to check that everything is correctly binded.`,
        short_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.`,
    },
    {
        title: 'title 04',
        image: 'https://i.ibb.co/5xhvQ5w/item4.png',
        long_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content. Want to view and manage all your collections? Click the Data icon on the add panel to your left. In the Content Manager, you can update your items, add new fields, create dynamic pages and more.
            Your collection is already set up with fields and content. Add your own by editing each field, or import CSV files to your content manager. You can create fields for rich text, images, videos and more. Remember to click Sync, so visitors can see your collections on your live site. You can add as many collections as you need. 
            Use input elements like custom forms and fields to collect info from your site visitors and store it in your content manager Collections. Make sure all your elements Connect to Data, and Preview your Live Site to check that everything is correctly binded.`,
        short_description: `This item is connected to a text field in your content manager. Double click the dataset icon to add your own content.`,
    },
];

export const itemsItemStyle = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        .item-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .item-wrapper .container {
            position: absolute;
            width: 80%;
            margin: auto;
            margin-top: 100px;
            top: 0;
        }

        .item-wrapper .background {
            width: 100%;
            height: 500px;
            background-color: #000000;
        }

        .item-wrapper .container .common-img {
            background-color: #ffffff;
            width: 100%;
            height: 600px;
        }

        .item-wrapper .container .common-title {
            font-size: 40px;
            font-weight: bolder;
            color: #fff;
        }

        .item-wrapper .container .control-buttons-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 100px;
        }

        .item-wrapper .container .control-buttons-container .prev-btn{
            font-size: 20px;
        }

        .item-wrapper .container .control-buttons-container .next-btn{
            font-size: 20px;
        }

        .item-wrapper .container .short-desc-container .common-short-desc {
            font-size: 23px;
            color: #fff;
        }

        .item-wrapper .container .short-desc-container {
            width: 60%;
            margin-bottom: 30px;
        }

        .item-wrapper .container .desc-container {
            width: 70%;
            margin: auto;
            font-size: 18px;
            padding: 60px 0 60px 0;
        }
    </style>
`;

export const itemsItemHtml = (addedTime) => {
    return `<div class="item-wrapper">
        <div class="background"></div>
        <div class="container">
            <h1 class="common-title" id="item-title-${addedTime}">I'm a title 01</h1>
            <div class="short-desc-container">
                <span class="common-short-desc" id="item-short-desc-${addedTime}">This item is connected to a text field in your Content Manager. Double click the dataset icon to add your own content.</span>
            </div>
            <br />
            <img  class="common-img" src="item1.png" id="item-img-${addedTime}"/>
            <br />
            <div class="desc-container">
                <span id="item-long-desc-${addedTime}">
                    This item is connected to a text field in your content manager. Double click the dataset icon to add your own content. Want to view and manage all your collections? Click the Data icon on the add panel to your left. In the Content Manager, you can update your items, add new fields, create dynamic pages and more.
                    
                    Your collection is already set up with fields and content. Add your own by editing each field, or import CSV files to your content manager. You can create fields for rich text, images, videos and more. Remember to click Sync, so visitors can see your collections on your live site. You can add as many collections as you need.  
                    
                    Use input elements like custom forms and fields to collect info from your site visitors and store it in your content manager Collections. Make sure all your elements Connect to Data, and Preview your Live Site to check that everything is correctly binded.
                </span>
            </div>
            <hr/>
            <div class="control-buttons-container">
                <a class="prev-btn">Prev</a>
                <a class="next-btn">Next</a>
            </div>
        </div>
    </div>`;
};