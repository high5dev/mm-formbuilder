import { Plus, Database } from 'react-feather';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  FaRegSquare,
  FaSearch,
  FaYoutubeSquare,
  FaBlog,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import {
  MdOutlineLayers,
  MdOutlineNewspaper,
  MdOutlineBrokenImage,
  MdOutlineGroupWork,
  MdGrid3X3,
  MdTextFormat,
  MdOutlinePermMedia,
  MdOutlineContactPage,
  MdTexture,
  MdStorefront,
  MdBackupTable,
  MdOutlineGroupAdd,
  MdLanguage,
  MdOutlineContentPaste 
} from 'react-icons/md';

import cmsMenu1 from '../../../../assets/img/cms-menu-1.png';
import cmsMenu2 from '../../../../assets/img/cms-menu-2.png';
import cmsMenu3 from '../../../../assets/img/cms-menu-3.png';
import cmsMenu4 from '../../../../assets/img/cms-menu-4.png'
import { Calendar, CheckSquare, Clock, Code, File, FilePlus, FileText, Grid, Hash, Image, Link, Link2, MapPin, Music, Tag, Type, Video } from 'react-feather';
import { BsFileRichtext } from 'react-icons/bs';
import { GrGallery } from 'react-icons/gr';
import { BiBracket } from 'react-icons/bi';

export function cx(inputs){
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
  }

// const sidebar_menu_items = [
//   { icon: <Plus size={20} color={'#585858'} />, name: ' Quick Add' },
//   { icon: <MdOutlineBrokenImage size={20} color={'#585858'} />, name: ' Assets' },
//   { icon: <MdOutlineGroupWork size={20} color={'#585858'} />, name: ' Compositions' },
//   { icon: <MdGrid3X3 size={20} color={'#585858'} />, name: ' Wireframes' },
//   { icon: <MdOutlineLayers size={20} color={'#585858'} />, name: ' Layout Tools' },
//   { icon: <MdTextFormat size={20} color={'#585858'} />, name: ' Text' },
//   { icon: <FaRegSquare size={20} color={'#585858'} />, name: ' Buttons' },
//   { icon: <FaSearch size={20} color={'#585858'} />, name: ' Menus & Search' },
//   { icon: <MdOutlinePermMedia size={20} color={'#585858'} />, name: 'Media' },
//   { icon: <MdTexture size={20} color={'#585858'} />, name: 'Decorative' },
//   { icon: <MdOutlineContactPage size={20} color={'#585858'} />, name: 'Contact & Forms' },
//   { icon: <FaYoutubeSquare size={20} color={'#585858'} />, name: 'Embed & Social' },
//   { icon: <FaBlog size={20} color={'#585858'} />, name: 'Blog' },
//   { icon: <MdStorefront size={20} color={'#585858'} />, name: 'Store' },
//   { icon: <MdBackupTable size={20} color={'#585858'} />, name: 'Bookings' },
//   { icon: <FaRegCalendarAlt size={20} color={'#585858'} />, name: 'Events' },
//   { icon: <MdOutlineGroupAdd size={20} color={'#585858'} />, name: 'Members' },
//   { icon: <MdOutlineNewspaper size={20} color={'#585858'} />, name: 'CMS' },
//   { icon: <MdLanguage size={20} color={'#585858'} />, name: 'Multilingual' }
// ];

export const menu = [
  {
    id: 'theme',
    name: 'Theme',
    icon: <MdOutlineLayers size={20} color={'#585858'} />,
    subMenu: [
      {
        id:'colors',
        name:'COLORS'
      },
      {
        id:'buttons',
        name:'BUTTONS'
      },
      {
        id:'text',
        name:'Text'
      },
      {
        id:'images',
        name:'IMAGES'
      },
      {
        id:'rows & columns',
        name:'ROWS & COLUMNS'
      },
      {
        id:'backgrounds',
        name:'BACKGROUNDS'
      },
      {
          id:'site layout',
          name:'SITE LAYOUT'
      }
    ],
  },
  {
    id: 'content',
    name: 'Content',
    icon: <Database size={20} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'quick-add',
    name: 'Quick Add',
    icon: <Plus size={20} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'assets',
    name: 'Assets',
    icon: <MdOutlineBrokenImage size={20} color={'#585858'} />,
    subMenu: [
      {
        id:'assets',
        name:'Assets'
      },
      {
        id:'images',
        name:'images'
      },
      {
        id:'videos',
        name:'videos'
      },
      {
        id:'audios',
        name:'audios'
      }
    ],
  },
  {
    id: 'compositions',
    name: 'Compositions',
    icon: <MdOutlineGroupWork size={20} color={'#585858'} />,
    subMenu: [
      {
        id: 'designed-sections',
        name: 'Designed Sections',
      },
      {
        id: 'designed-boxes',
        name: 'Designed Boxes',
      },
      {
        id: 'interactive',
        name: 'Interactive',
      },
      {
        id: 'navigation',
        name: 'Navigation',
      },
      {
        id: 'menus-search',
        name: 'Menus & Search',
      },
      {
          id: 'Blocks',
          name: 'Blocks',
          subMenu: [
            {
              id: 'repeater',
              name: 'Repeater',
            },
            {
              id: 'gallery',
              name: 'Gallery'
            },
            {
              id:'iframe',
              name:'Iframe'
            },
            {
              id:'social-bar',
              name:'SocialBar'
            }
          ],
        },
      {
        id: 'layout-tools',
        name: 'layout-tools',
      },
      {
        id:'embed-social',
        name: 'Embed & Social'
      },
    ],
  },
  {
    id: 'media',
    name: 'Media',
    icon: <MdOutlinePermMedia size={20} color={'#585858'} />,
    subMenu: [
      {
        id: 'upload-media',
        name: 'Upload Media',
      },
      {
        id: 'images',
        name: 'Images',
      },
      {
        id: 'video',
        name: 'Video',
      },
      {
        id: 'audio',
        name: 'Audio',
      },
    ],
  },
  {
    id: 'decorative',
    name: 'Text & Decorative',
    icon: <MdTexture size={20} color={'#585858'} />,
    subMenu: [
      {
        id: 'shapes',
        name: 'Shapes',
      },
      {
        id: 'vector-art',
        name: 'Vector Art',
      },
      {
        id: 'text-effects',
        name: 'Text Effects',
      },
      {
        id: 'video',
        name: 'Video',
      },
      {
        id: 'content-templates',
        name: 'Content Templates',
      },
      {
        id: 'text',
        name: 'Text',
      },
    ],
  },
  {
    id: 'contact-forms',
    name: 'Forms',
    icon: <MdOutlineContactPage size={20} color={'#585858'} />,
    subMenu: [
      {
        id: 'forms',
        name: 'Forms',
      },
      {
        id: 'google-maps',
        name: 'Google Maps',
      },
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    icon: <FaBlog size={20} color={'#585858'} />,
    subMenu: [
      {
        id:'post-list-large',
        name:'Post List(Large)'
      },
      {
        id:'post-list-sidebar',
        name:'Post List(Sidebar)'
      },
      {
        id:'recent-posts',
        name:'Recent Posts'
      },
      {
        id:'category-menu',
        name:'Category Menu'
      },
      {
        id:'archive',
        name:'Archive'
      },
      {
        id:'rss-button',
        name:'RSS Button'
      }
    ],
  },
  {
    id: 'store',
    name: 'Store',
    icon: <MdStorefront size={20} color={'#585858'} />,
    subMenu: [
      {
        menu: 'Grid Product Gallery',
        data: [
          {
            id: 'gridproductgallery',
            title: 'Grid Product Gallery',
            description: 'Display multiple products in a grid layout.',
          }
        ]
      },
      {
        menu: 'Slider Product Gallery',
        data: [
          {
            id: 'sliderproductgallery',
            title: 'Slider Product Gallery',
            description: 'Let customers browse products in a compact gallery.',
          }
        ]
      },
      {
        menu: 'Related Products',
        data: [
          {
            id: 'relatedproducts',
            title: 'Related Products',
            description: 'Increase sales by adding a slider gallery with recommended products for your customers.',
          }
        ]
      },
      {
        menu: 'Shopping Cart',
        data: [
          {
            id: 'shoppingcart',
            title: 'Shopping Cart',
            description: 'Add a shortcut to your shopping cart anywhere on your site.',
          }
        ]
      },
      {
        menu: 'Add To Cart Button',
        data: [
          {
            id: 'addtocartbutton',
            title: 'Add To Cart Button',
            description: 'Place a standalone Add to Cart button anywhere on your site.',
          }
        ]
      },
      {
        menu: 'Currency Converter',
        data: [
          {
            id: 'currency-converter',
            title: 'Currency Converter',
            description: 'Make shopping easier by letting customers shop products in their currency.',
          }
        ]
      },
      // {
      //   menu: 'Product Page',
      //   data: [
      //     {
      //       id: 'productpage',
      //       title: 'Product Page',
      //       description: 'Make shopping easier by letting customers shop products in their currency.',
      //     }
      //   ]
      // },
      // {
      //   menu: 'Cart Page',
      //   data: [
      //     {
      //       id: 'cartpage',
      //       title: 'Cart Page',
      //       description: 'Make shopping easier by letting customers shop products in their currency.',
      //     }
      //   ]
      // },
      // {
      //   menu: 'Thankyou Page',
      //   data: [
      //     {
      //       id: 'thankyoupage',
      //       title: 'Thankyou Page',
      //       description: 'Make shopping easier by letting customers shop products in their currency.',
      //     }
      //   ]
      // }
    ],
  },
  {
    id: 'bookings',
    name: 'Bookings',
    icon: <MdBackupTable size={20} color={'#585858'} />,
    subMenu: [
      {
        id:'bookings',
        name:'Bookings',
      }
    ],
  },
  {
    id: 'events',
    name: 'Events',
    icon: <FaRegCalendarAlt size={20} color={'#585858'} />,
    subMenu: [
      {
        id:'events',
        name:'Events',
      }
    ],
  },
  // {
  //   id: 'members',
  //   name: 'Members',
  //   icon: <MdOutlineGroupAdd size={24} color={'#585858'} />,
  //   subMenu: [],
  // },
  {
    id: 'cms',
    name: 'CMS',
    icon: <MdOutlineNewspaper size={20} color={'#585858'} />,
    subMenu: [
      {
        menu: '',
        data: [
          {
            id: 'add-preset',
            title: 'Add a preset',
            description: 'Get a new collection connected to dynamic pages.',
            icon: cmsMenu1,
          }
        ]
      },
      {
        menu: 'Collection',
        data: [
          {
            id: 'create-collection',
            title: 'Create collection',
            description: `Create a new collection to store your site's dynamic sontent.`,
            icon: cmsMenu2,
          }
        ]
      },
      {
        menu: 'Datasets',
        data: [
          {
            id: 'dataset',
            title: 'Dataset',
            description: 'Connect page elements to your content.',
            icon: cmsMenu3,
          },
          {
            id: 'form-dataset',
            title: 'Form dataset',
            description: 'Create a form and collect data from your visitors.',
            icon: cmsMenu3,
          }
        ]
      },
      {
        menu: 'Elements',
        data: [
          {
            id: 'rich-content',
            title: 'Rich content',
            description: 'Show rich content from a collection on your site.',
            icon: cmsMenu4,
          }
        ]
      }
    ],
  },
  {
    id: 'customer-dataset',
    name: 'Content Library',
  }
];

export const collectionFieldTypes = [
  {
    category: 'Essential',
    types: [
      {
        name: 'Text',
        description: 'Titles, paragraph',
        icon: <Type size={18}/>,
      },
      {
        name: 'Rich text',
        description: 'Text with formatting',
        icon: <BsFileRichtext size={18}/>,
      },
      {
        name: 'Rich content',
        description: 'Text with links and media',
        icon: <FileText size={18}/>,
      },
      {
        name: 'URL',
        description: 'Links',
        icon: <Link size={18}/>,
      },
      {
        name: 'Number',
        description: 'ID, rating, order number',
        icon: <Hash size={18}/>,
      },
      {
        name: 'Tags',
        description: 'Tagging items, filters',
        icon: <Tag size={18}/>,
      },
      {
        name: 'Boolean',
        description: 'Yes or no, true or false',
        icon: <CheckSquare size={18}/>,
      },
      {
        name: 'Reference',
        description: 'Link to another collection',
        icon: <Link2 size={18}/>,
      },
      {
        name: 'Multi-reference',
        description: 'Link between collections',
        icon: <Grid size={18}/>,
      },
    ]
  },
  {
    category: 'Media',
    types: [
      {
        name: 'Image',
        description: 'Upload a single image',
        icon: <Image size={18}/>,
      },
      {
        name: 'Media gallery',
        description: 'A gallery of images and videos',
        icon: <GrGallery size={18}/>,
      },
      {
        name: 'Video',
        description: 'Upload a single video',
        icon: <Video size={18}/>,
      },
      {
        name: 'Audio',
        description: 'Upload an audio file',
        icon: <Music size={18}/>,
      },
      {
        name: 'Document',
        description: 'Add files to a collection',
        icon: <File size={18}/>,
      },
      {
        name: 'Multiple documents',
        description: 'Let site visitors upload files to a collection',
        icon: <FilePlus size={18}/>,
      },
    ]
  },
  {
    category: 'Time and location',
    types: [
      {
        name: 'Date',
        description: 'Date of event, date added',
        icon: <Calendar size={18}/>,
      },
      {
        name: 'Time',
        description: 'Opening hours',
        icon: <Clock size={18}/>,
      },
      {
        name: 'Address',
        description: 'Location',
        icon: <MapPin size={18}/>,
      },
    ]
  },
  {
    category: 'Javascript (Velo code)',
    types: [
      {
        name: 'Object',
        description: 'Javascript object',
        icon: <Code size={18}/>,
      },
      {
        name: 'Array',
        description: 'Javascript array',
        icon: <BiBracket size={18}/>,
      },
    ]
  }
];