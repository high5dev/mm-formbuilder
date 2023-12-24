export const team_members = (addedTime, itemPage) => {return `
  <div class="repeaters-10-wrapper">
    <div class="container">
        <div class="main-col">
            <h1 class="common-heading">Our Team Members</h1>
        </div>
        <div class="repeater grid-display" id=${'repeater-' + addedTime}>
            <div class="repeater-item col col-1" id="${'repeater-item-1-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/1RcjwwL/team1.png" id="${'image-1-' + addedTime}" />
                
                <h3 class="common-name" id="${'text-1-' + addedTime}">Full Name 01</h3>
                <h4 class="common-heading" id="${'text-2-' + addedTime}">Job title</h4>
                <p class="common-text" id="${'text-3-' + addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-1-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Details"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-2-' + addedTime}" >
                <img class="common-img" src=https://i.ibb.co/6nk5LcW/team2.png" id="${'image-2-' + addedTime}" />
                
                <h3 class="common-name" id="${'text-4-' + addedTime}">Full Name 02</h3>
                <h4 class="common-heading" id="${'text-5-' + addedTime}">Job title</h4>
                <p class="common-text" id="${'text-6-' + addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-2-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Details"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-3-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/wSnmLKv/team3.png" id="${'image-3-' + addedTime}" />
                
                <h3 class="common-name" id="${'text-7-' + addedTime}">Full Name 03</h3>
                <h4 class="common-heading" id="${'text-8-' + addedTime}">Job title</h4>
                <p class="common-text" id="${'text-9-' + addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-3-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Details"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-4-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/pPgDXpb/team4.png" id="${'image-4-' + addedTime}" />
                
                <h3 class="common-name" id="${'text-10-' + addedTime}">Full Name 04</h3>
                <h4 class="common-heading" id="${'text-11-' + addedTime}">Job title</h4>
                <p class="common-text" id="${'text-12-' + addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-4-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Details"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-5-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/K6Y5rQ3/team5.png" id="${'image-5-' + addedTime}" />
                
                <h3 class="common-name" id="${'text-13-' + addedTime}">Full Name 05</h3>
                <h4 class="common-heading" id="${'text-14-' + addedTime}">Job title</h4>
                <p class="common-text" id="${'text-15-' + addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-5-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Details"/> 
                        </div>
                    </a>
                </div>
            </div>
            <div class="repeater-item col col-1" id="${'repeater-item-6-' + addedTime}" >
                <img class="common-img" src="https://i.ibb.co/SmHLCwC/team6.png" id="${'image-6-' + addedTime}" />
                
                <h3 class="common-name" id="${'text-16-' + addedTime}">Full Name 06</h3>
                <h4 class="common-heading" id="${'text-17-' + addedTime}">Job title</h4>
                <p class="common-text" id="${'text-18-' + addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.</p>
                <div class="link-element" id="${'link-element-6-' + addedTime}">
                    <a href="${itemPage}" class="link-submit-element" target="_parent">
                        <div>
                            <input type='button' class="input-link-element" value="Details"/> 
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
`};

export const teamCss = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body {
            margin: 0;
        }

        .repeaters-10-wrapper .container {
            margin: 0 auto;
            max-width: 1300px;
            padding: 50px;
        }

        .repeaters-10-wrapper .common-name {
            font-family: Poppins;
            font-weight: 600;
            margin: 10px 0;
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
            padding: 0 5px 0 5px;
        }

        .repeaters-10-wrapper .grid-display .col img {
            width: 100%;
        }

        .repeaters-10-wrapper .grid-display .col {
            text-align: center;
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

export const teamRepeaterItemChildrenIds = (addedTime) => {
    return [
        {
            componentId: `repeater-${addedTime}`,
            componentType: 'repeater',
        },
        {
            componentId: `image-1-${addedTime}`,
            componentType: 'image',
            connectedField: 'photo',
        },
        {
            componentId: `text-1-${addedTime}`,
            componentType: 'Text',
            connectedField: 'name',
        },
        {
            componentId: `text-2-${addedTime}`,
            componentType: 'Text',
            connectedField: 'job_title',
        },
        {
            componentId: `text-3-${addedTime}`,
            componentType: 'Text',
            connectedField: 'short_description',
        },
    ];
}

export const teamFields = [
    {
        name: 'id',
        type: 'Text',
        default: true,
    },
    {
        name: 'name',
        type: 'Text',
    },
    {
        name: 'email',
        type: 'Text',
    },
    {
        name: 'job_title',
        type: 'Text',
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
        name: 'order',
        type: 'Number',
    },
    {
        name: 'phone',
        type: 'Text',
    },
    {
        name: 'website',
        type: 'URL',
    },
    {
        name: 'photo',
        type: 'Image',
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

export const teamValues = [
    {
        name: 'Full Name 01',
        email: 'info@mysite.com',
        job_title: 'Job Title',
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.  This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.`,
        short_description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        order: 1,
        phone: '123-456-7890',
        website: 'https://www.mymanager.com',
        photo: 'https://i.ibb.co/1RcjwwL/team1.png',
    },
    {
        name: 'Full Name 02',
        email: 'info@mysite.com',
        job_title: 'Job Title',
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.  This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.`,
        short_description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        order: 2,
        phone: '123-456-7890',
        website: 'https://www.mymanager.com',
        photo: 'https://i.ibb.co/6nk5LcW/team2.png',
    },
    {
        name: 'Full Name 03',
        email: 'info@mysite.com',
        job_title: 'Job Title',
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.  This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.`,
        short_description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        order: 3,
        phone: '123-456-7890',
        website: 'https://www.mymanager.com',
        photo: 'https://i.ibb.co/wSnmLKv/team3.png',
    },
    {
        name: 'Full Name 04',
        email: 'info@mysite.com',
        job_title: 'Job Title',
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.  This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.`,
        short_description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        order: 4,
        phone: '123-456-7890',
        website: 'https://www.mymanager.com',
        photo: 'https://i.ibb.co/pPgDXpb/team4.png',
    },
    {
        name: 'Full Name 05',
        email: 'info@mysite.com',
        job_title: 'Job Title',
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.  This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.`,
        short_description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        order: 5,
        phone: '123-456-7890',
        website: 'https://www.mymanager.com',
        photo: 'https://i.ibb.co/K6Y5rQ3/team5.png',
    },
    {
        name: 'Full Name 06',
        email: 'info@mysite.com',
        job_title: 'Job Title',
        long_description: `I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.  This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.`,
        short_description: `I'm a paragraph. I'm connected to your collection through a dataset. Click Preview to see my content. To update me, go to the Data Manager.`,
        order: 6,
        phone: '123-456-7890',
        website: 'https://www.mymanager.com',
        photo: 'https://i.ibb.co/SmHLCwC/team6.png',
    },
];

export const teamItemStyle = `
    <style>
        .team-item {
            font-family: roboto, sans-serif;
            /* padding: 100px; */
        }

        .team-item-display {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        .product-1-col {
            background: #b9dbcb;
            color: #000;
            padding: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .product-1-h1 {
            font-size: 30px;
        }

        .product-1-p {
            font-weight: 300;
            line-height: 30px;
            font-size: 15px;
        }

        .product-1-img {
            width: 100%;
            height: 100%;
        }

        .job-title, .email, .phone-number {
            font-size: 18px;
        }

        .controls-container {
            display: flex;
            justify-content: space-between;
            background-color: #000;
            padding: 20px;
        }

        .controls-container .prev-btn {
            font-size: 20px;
            color: #fff;
        }

        .controls-container .next-btn {
            font-size: 20px;
            color: #fff;
        }   

        @media (max-width: 1200px) {
            .product-1-col1 {
                padding: 100px;
            }

            .product-1-p {
                width: 80%;
            }
        }

        @media (max-width: 768px) {
            .product-1-col1 {
                padding: 50px;
            }

            .team-item-display {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;

export const teamItemHtml = (addedTime) => {
    return `
        <div class="team-item">
            <div class="team-item-display">
                <div class="product-1-col product-1-col1">
                    <h4 class="product-1-h1" id="item-text-1-${addedTime}">Team Member Name</h4>
                    <p class="job-title" id="item-text-2-${addedTime}">Job Title</p>
                    <p class="product-1-p" id="item-text-3-${addedTime}">I'm a paragraph. I'm connected to your collection through a dataset. To update me, go to the Data Manager. The Data Manager is where you store data to use in your site pages, or collect data from site visitors when they submit a form.</p>
                    <p class="product-1-p" id="item-text-4-${addedTime}">This collection in the Data Manager is already set up with some fields and content. To customize it with your own content, you can import a CSV file or simply edit the placeholder text. You can also add more fields which you can connect to other page elements so the content displays on your published site. Remember to sync the collection so your content is live! You can add as many new collections as you need to store or collect data.</p>
                    <p class="email" id="item-text-5-${addedTime}">Email</p>
                    <p class="phone-number" id="item-text-6-${addedTime}">Phone Number</p>
                </div>
                <img class="product-1-img" src="item1.png" id="item-img-${addedTime}"/>
            </div>
            <div class="controls-container">
                <a class="prev-btn">Prev</a>
                <a class="next-btn">Next</a>
            </div>
        </div>
    `;
};