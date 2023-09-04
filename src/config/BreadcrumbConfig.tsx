import { BreadcrumbConfigProps } from "./InterfacesAndTypes";

const defaultBreadcrumbPath = [
	{ name: "Home", link: '/' },
];

export const UserBreadcrumb: BreadcrumbConfigProps = {
	title: 'User Management',
	path: [
		...defaultBreadcrumbPath,
		{ name: 'User Management', link: '/users' }
	]
}

export const RoleBreadcrumb: BreadcrumbConfigProps = {
	title: 'Roles Management',
	path: [
		...defaultBreadcrumbPath,
		{ name: 'Roles', link: '/roles' }
	]
}
