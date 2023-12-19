const defaultRoles = [
  {
    name: 'Website Owner',
    description: `Has access to edit, publish and manage site, including billing, payment & financial info, domains and inviting people, but can't delete or transfer the site.`,
    permissions: {
      edit_content: true,
      edit_site: true,
      publish_site: true,
      invite_people: true,
      view_content: true,
      add_content: true,
      manage_collections: true,
      manage_site_members: true,
      manage_blog: true,
    },
  },
  {
    name: 'Website Manager',
    description: `Has access to manage, edit & publish site, but cannot manage billing, delete, duplicate or transfer site.`,
    permissions: {
      edit_content: true,
      edit_site: true,
      publish_site: true,
      invite_people: true,
      view_content: true,
      add_content: true,
      manage_collections: false,
      manage_site_members: true,
      manage_blog: true,
    },
  },
  {
    name: 'Website Designer',
    description: `Can edit the site, manage settings and apps but cannot access Inbox, contacts and other sensitive info.`,
    permissions: {
      edit_content: true,
      edit_site: true,
      publish_site: true,
      invite_people: false,
      view_content: true,
      add_content: true,
      manage_collections: false,
      manage_site_members: false,
      manage_blog: true,
    },
  },
  {
    name: 'Website Seo',
    description: `Can manage settings related to seo.`,
    permissions: {
      edit_content: true,
      edit_site: true,
      publish_site: true,
      invite_people: false,
      view_content: true,
      add_content: true,
      manage_collections: true,
      manage_site_members: false,
      manage_blog: true,
    },
  },
  {
    name: 'Website Marketing',
    description: `Can perform all actions in POS and access the Dashboard, but cannot edit payment details or site.`,
    permissions: {
      edit_content: false,
      edit_site: false,
      publish_site: false,
      invite_people: false,
      view_content: false,
      add_content: false,
      manage_collections: false,
      manage_site_members: false,
      manage_blog: false,
    },
  },
];

module.exports = {defaultRoles};