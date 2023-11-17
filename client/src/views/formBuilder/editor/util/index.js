import { Plus } from 'react-feather';
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
} from 'react-icons/md';

export function cx(inputs){
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
  }

// const sidebar_menu_items = [
//   { icon: <Plus size={24} color={'#585858'} />, name: ' Quick Add' },
//   { icon: <MdOutlineBrokenImage size={24} color={'#585858'} />, name: ' Assets' },
//   { icon: <MdOutlineGroupWork size={24} color={'#585858'} />, name: ' Compositions' },
//   { icon: <MdGrid3X3 size={24} color={'#585858'} />, name: ' Wireframes' },
//   { icon: <MdOutlineLayers size={24} color={'#585858'} />, name: ' Layout Tools' },
//   { icon: <MdTextFormat size={24} color={'#585858'} />, name: ' Text' },
//   { icon: <FaRegSquare size={24} color={'#585858'} />, name: ' Buttons' },
//   { icon: <FaSearch size={24} color={'#585858'} />, name: ' Menus & Search' },
//   { icon: <MdOutlinePermMedia size={24} color={'#585858'} />, name: 'Media' },
//   { icon: <MdTexture size={24} color={'#585858'} />, name: 'Decorative' },
//   { icon: <MdOutlineContactPage size={24} color={'#585858'} />, name: 'Contact & Forms' },
//   { icon: <FaYoutubeSquare size={24} color={'#585858'} />, name: 'Embed & Social' },
//   { icon: <FaBlog size={24} color={'#585858'} />, name: 'Blog' },
//   { icon: <MdStorefront size={24} color={'#585858'} />, name: 'Store' },
//   { icon: <MdBackupTable size={24} color={'#585858'} />, name: 'Bookings' },
//   { icon: <FaRegCalendarAlt size={24} color={'#585858'} />, name: 'Events' },
//   { icon: <MdOutlineGroupAdd size={24} color={'#585858'} />, name: 'Members' },
//   { icon: <MdOutlineNewspaper size={24} color={'#585858'} />, name: 'CMS' },
//   { icon: <MdLanguage size={24} color={'#585858'} />, name: 'Multilingual' }
// ];

export const menu = [
  {
    id: 'quick-add',
    name: 'Quick Add',
    icon: <Plus size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'assets',
    name: 'Assets',
    icon: <MdOutlineBrokenImage size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'compositions',
    name: 'Compositions',
    icon: <MdOutlineGroupWork size={24} color={'#585858'} />,
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
    ],
  },
  {
    id: 'wireframes',
    name: 'Wireframes',
    icon: <MdGrid3X3 size={24} color={'#585858'} />,
    subMenu: [
      {
        id: 'wireframes',
        name: 'Wireframes',
      },
    ],
  },
  {
    id: 'layout-tools',
    name: 'Layout Tools',
    icon: <MdOutlineLayers size={24} color={'#585858'} />,
    subMenu: [
      {
        id: 'containers',
        name: 'Containers',
      },
    ],
  },
  {
    id: 'text',
    name: 'Text',
    icon: <MdTextFormat size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'buttons',
    name: 'Buttons',
    icon: <FaRegSquare size={24} color={'#585858'} />,
    subMenu: [
      {
        id: 'buttons',
        name: 'Buttons',
      },
    ],
  },
  {
    id: 'menus-search',
    name: 'Menus & Search',
    icon: <FaSearch size={24} color={'#585858'} />,
    subMenu: [
      {
        id: 'menus',
        name: 'Menus',
      },
      {
        id: 'search',
        name: 'Search',
      },
    ],
  },
  {
    id: 'media',
    name: 'Media',
    icon: <MdOutlinePermMedia size={24} color={'#585858'} />,
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
    name: 'Decorative',
    icon: <MdTexture size={24} color={'#585858'} />,
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
    ],
  },
  {
    id: 'contact-forms',
    name: 'Contact & Forms',
    icon: <MdOutlineContactPage size={24} color={'#585858'} />,
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
    id: 'embed-social',
    name: 'Embed & Social',
    icon: <FaYoutubeSquare size={24} color={'#585858'} />,
    subMenu: [
      {
        id: 'embed',
        name: 'Embed',
      },
      {
        id: 'social',
        name: 'Social',
      },
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    icon: <FaBlog size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'store',
    name: 'Store',
    icon: <MdStorefront size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'bookings',
    name: 'Bookings',
    icon: <MdBackupTable size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'events',
    name: 'Events',
    icon: <FaRegCalendarAlt size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'members',
    name: 'Members',
    icon: <MdOutlineGroupAdd size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'cms',
    name: 'CMS',
    icon: <MdOutlineNewspaper size={24} color={'#585858'} />,
    subMenu: [],
  },
  {
    id: 'multilingual',
    name: 'Multilingual',
    icon: <MdLanguage size={24} color={'#585858'} />,
    subMenu: [],
  },
];

  // const mainMenu = [
//   'quick-add',
//   'assets',
//   'compositions',
//   'wireframes',
//   'layout-tools',
//   'text',
//   'buttons',
//   'menus-search',
//   'media',
//   'decorative',
//   'contact-forms',
//   'embed-social',
//   'blog',
//   'store',
//   'bookings',
//   'events',
//   'members',
//   'cms',
//   'multilingual',
// ];