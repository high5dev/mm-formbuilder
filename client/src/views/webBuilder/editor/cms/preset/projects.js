export const projects = (addedTime, itemPage) => {return `
  <div class="repeaters-10-wrapper">
    <div class="container">
        <div class="main-col">
            <h1 class="common-heading">Our Projects</h1>
        </div>
        <div class="repeater grid-display" id=${'repeater-' + addedTime}>
            <div class="repeater-item col col-1" id="${'repeater-item-1-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/0GbGc4N/project1.png" id="${'image-1-' + addedTime}" />
                
                <h4 class="common-heading" id="${'text-1-' + addedTime}">project name 01</h4>
                <p class="common-text" id="${'text-2-' + addedTime}">I’m text. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-1-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Read More"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-2-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/6HZDXB7/project2.png" id="${'image-2-' + addedTime}" />
                
                <h4 class="common-heading" id="${'text-3-' + addedTime}">project name 02</h4>
                <p class="common-text" id="${'text-4-' + addedTime}">I’m text. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-2-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Read More"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-3-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/5TsCSLT/project3.png" id="${'image-3-' + addedTime}" />
                
                <h4 class="common-heading" id="${'text-5-' + addedTime}">project name 03</h4>
                <p class="common-text" id="${'text-6-' + addedTime}">I’m text. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-3-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Read More"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-4-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/D5D9h0n/project4.png" id="${'image-4-' + addedTime}" />
                
                <h4 class="common-heading" id="${'text-7-' + addedTime}">project name 04</h4>
                <p class="common-text" id="${'text-8-' + addedTime}">I’m text. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-4-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Read More"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-5-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/9htVC4z/project5.png" id="${'image-5-' + addedTime}" />
                
                <h4 class="common-heading" id="${'text-9-' + addedTime}">project name 05</h4>
                <p class="common-text" id="${'text-10-' + addedTime}">I’m text. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-5-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Read More"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-6-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/KzrySrk/project6.png" id="${'image-6-' + addedTime}" />
                
                <h4 class="common-heading" id="${'text-11-' + addedTime}">project name 06</h4>
                <p class="common-text" id="${'text-12-' + addedTime}">I’m text. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-6-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Read More"/> 
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
`};

export const projectsCss = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body {
            margin: 0;
        }

        .repeaters-10-wrapper {
            background-color: #eff0f2;
        }

        .repeaters-10-wrapper .container {
            margin: 0 auto;
            max-width: 1300px;
            padding: 50px;
            background-color: #eff0f2;
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

        .repeaters-10-wrapper .common-img {
            width: 100% !important;
            height: fit-content;
        }

        .repeaters-10-wrapper .grid-display {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }

        .repeaters-10-wrapper .grid-display .col {
            border-radius: 10px;
            padding: 0 20px 0 20px;
        }

        .repeaters-10-wrapper .grid-display .col img {
            width: 100%;
        }

        .repeaters-10-wrapper .grid-display .col {
            text-align: start;
        }

        .repeaters-10-wrapper .grid-display .col a {
            text-decoration: none;
            color: #000000;
            transition: 0.2s;
        }

        .repeaters-10-wrapper .grid-display .col .icon-right {
            display: flex;
            justify-content: end;
        }

        .repeaters-10-wrapper .grid-display .col img {
            width: 15px;
        }

        .repeaters-10-wrapper .grid-display .col a:hover {
            color: #686868;
        }

        .repeaters-10-wrapper .container .main-col {
            text-align: center;
            margin-bottom: 20px;
            font-size:x-large;
        }

        .repeaters-10-wrapper .container .grid-display .input-link-element {
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

        .repeaters-10-wrapper .container .grid-display .input-link-element:hover {
            background: #000000;
            color: #ffffff;
            border: 1px solid
        }

        .grid-display-main .main-col .common-text {
            font-size: 20px;
            margin: 30px 0;
            line-height: 40px;
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

        .repeater-item {
            background-color: none !important;
        }
    </style>
`;

export const projectsRepeaterItemChildrenIds = (addedTime) => {
    return [
        {
            componentId: `repeater-${addedTime}`,
            componentType: 'repeater',
        },
        {
            componentId: `image-1-${addedTime}`,
            componentType: 'image',
            connectedField: 'project_image',
        },
        {
            componentId: `text-1-${addedTime}`,
            componentType: 'Text',
            connectedField: 'title',
        },
        {
            componentId: `text-2-${addedTime}`,
            componentType: 'Text',
            connectedField: 'info_description',
        },
    ];
}

export const projectsFields = [
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
        name: 'description',
        type: 'Text',
    },
    {
        name: 'project_image',
        type: 'Image',
    },
    {
        name: 'info_description',
        type: 'Text',
    },
    {
        name: 'order',
        type: 'Number',
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

export const projectsValues = [
    {
        title: 'project name 01',
        description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        project_image: 'https://i.ibb.co/0GbGc4N/project1.png',
        info_description: `I’m text. To update me, go to the Data Manager.`,
        order: 1,
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.    This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.    With Presets, we’ve handled the page set up for you, but you can create the exact same functionality in your other site pages. To connect page elements to data, the first step is to add a dataset to the page and choose the collection you want to use. From the dataset Settings panel, you can filter or sort the available items, decide how your users can interact with the page (read/write), and more. Next, select the element you want to connect to the data, and choose the field you want to connect it to. So simple! If you want to add even more capabilities, enable Developer Tools to use JavaScript and APIs to add custom interactions and functionality to your site. To see what’s possible and get answers to your questions, check out the Wix Code Forum.`,
        short_description: `I'm a paragraph. To update me, go to the Data Manager. The Data Manager is where you store and collect data for your site.`,
    },
    {
        title: 'project name 02',
        description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        project_image: 'https://i.ibb.co/6HZDXB7/project2.png',
        info_description: `I’m text. To update me, go to the Data Manager.`,
        order: 2,
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.    This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.    With Presets, we’ve handled the page set up for you, but you can create the exact same functionality in your other site pages. To connect page elements to data, the first step is to add a dataset to the page and choose the collection you want to use. From the dataset Settings panel, you can filter or sort the available items, decide how your users can interact with the page (read/write), and more. Next, select the element you want to connect to the data, and choose the field you want to connect it to. So simple! If you want to add even more capabilities, enable Developer Tools to use JavaScript and APIs to add custom interactions and functionality to your site. To see what’s possible and get answers to your questions, check out the Wix Code Forum.`,
        short_description: `I'm a paragraph. To update me, go to the Data Manager. The Data Manager is where you store and collect data for your site.`,
    },
    {
        title: 'project name 03',
        description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        project_image: 'https://i.ibb.co/5TsCSLT/project3.png',
        info_description: `I’m text. To update me, go to the Data Manager.`,
        order: 3,
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.    This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.    With Presets, we’ve handled the page set up for you, but you can create the exact same functionality in your other site pages. To connect page elements to data, the first step is to add a dataset to the page and choose the collection you want to use. From the dataset Settings panel, you can filter or sort the available items, decide how your users can interact with the page (read/write), and more. Next, select the element you want to connect to the data, and choose the field you want to connect it to. So simple! If you want to add even more capabilities, enable Developer Tools to use JavaScript and APIs to add custom interactions and functionality to your site. To see what’s possible and get answers to your questions, check out the Wix Code Forum.`,
        short_description: `I'm a paragraph. To update me, go to the Data Manager. The Data Manager is where you store and collect data for your site.`,
    },
    {
        title: 'project name 04',
        description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        project_image: 'https://i.ibb.co/D5D9h0n/project4.png',
        info_description: `I’m text. To update me, go to the Data Manager.`,
        order: 4,
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.    This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.    With Presets, we’ve handled the page set up for you, but you can create the exact same functionality in your other site pages. To connect page elements to data, the first step is to add a dataset to the page and choose the collection you want to use. From the dataset Settings panel, you can filter or sort the available items, decide how your users can interact with the page (read/write), and more. Next, select the element you want to connect to the data, and choose the field you want to connect it to. So simple! If you want to add even more capabilities, enable Developer Tools to use JavaScript and APIs to add custom interactions and functionality to your site. To see what’s possible and get answers to your questions, check out the Wix Code Forum.`,
        short_description: `I'm a paragraph. To update me, go to the Data Manager. The Data Manager is where you store and collect data for your site.`,
    },
    {
        title: 'project name 05',
        description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        project_image: 'https://i.ibb.co/9htVC4z/project5.png',
        info_description: `I’m text. To update me, go to the Data Manager.`,
        order: 5,
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.    This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.    With Presets, we’ve handled the page set up for you, but you can create the exact same functionality in your other site pages. To connect page elements to data, the first step is to add a dataset to the page and choose the collection you want to use. From the dataset Settings panel, you can filter or sort the available items, decide how your users can interact with the page (read/write), and more. Next, select the element you want to connect to the data, and choose the field you want to connect it to. So simple! If you want to add even more capabilities, enable Developer Tools to use JavaScript and APIs to add custom interactions and functionality to your site. To see what’s possible and get answers to your questions, check out the Wix Code Forum.`,
        short_description: `I'm a paragraph. To update me, go to the Data Manager. The Data Manager is where you store and collect data for your site.`,
    },
    {
        title: 'project name 06',
        description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        project_image: 'https://i.ibb.co/KzrySrk/project6.png',
        info_description: `I’m text. To update me, go to the Data Manager.`,
        order: 6,
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.    This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.    With Presets, we’ve handled the page set up for you, but you can create the exact same functionality in your other site pages. To connect page elements to data, the first step is to add a dataset to the page and choose the collection you want to use. From the dataset Settings panel, you can filter or sort the available items, decide how your users can interact with the page (read/write), and more. Next, select the element you want to connect to the data, and choose the field you want to connect it to. So simple! If you want to add even more capabilities, enable Developer Tools to use JavaScript and APIs to add custom interactions and functionality to your site. To see what’s possible and get answers to your questions, check out the Wix Code Forum.`,
        short_description: `I'm a paragraph. To update me, go to the Data Manager. The Data Manager is where you store and collect data for your site.`,
    },
];

export const projectItemStyle = `
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
            display: flex;
            flex-direction: column;
            align-items: center;
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
            width: 100%;
            background-color: #000;
            padding: 20px;
        }

        .item-wrapper .container .control-buttons-container .prev-btn{
            font-size: 20px;
            color: #fff;
        }

        .item-wrapper .container .control-buttons-container .next-btn{
            font-size: 20px;
            color: #fff;
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

export const projectItemHtml = (addedTime) => {
    return `<div class="item-wrapper">
        <div class="background"></div>
        <div class="container">
            <h1 class="common-title" id="item-title-${addedTime}">Project Name</h1>
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