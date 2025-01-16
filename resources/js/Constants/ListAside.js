// resources/js/constants/index.js
import { MdDashboard } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { TfiNotepad } from "react-icons/tfi";
import { MdManageAccounts } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";

export const LIST_ASIDE = [
    {
        id: 1,
        title: 'Dashboard',
        route: 'dashboard',
        icon: MdDashboard,
        permission: ['admin_kecamatan', 'admin_desa']
    },
    {
        id: 2,
        title: 'Kelola Data Kecamatan',
        route: 'subdistricts.index',
        icon: FcStatistics,
        permission: ['admin_kecamatan']
    },
    {
        id: 3,
        title: 'Kelola Data Desa',
        route: 'village.index',
        icon: TfiNotepad,
        permission: ['admin_kecamatan', 'admin_desa']
    },
    {
        id: 4,
        title: 'Kelola Data Spasial',
        route: 'data-spasial.index',
        icon: FcStatistics,
        permission: ['admin_kecamatan', 'admin_desa']
    },
    {
        id: 5,
        title: 'Kelola Data Kategori',
        route: 'data-kategori.index',
        icon: GiHamburgerMenu,
        permission: ['admin_kecamatan', 'admin_desa']
    },
    {
        id: 6,
        title: 'Kelola Akun Admin',
        route: 'akun-admin.index',
        icon: MdManageAccounts,
        permission: ['admin_kecamatan']
    },
    {
        id: 7,
        title: 'Logout',
        route: 'logout',
        icon: IoLogOutSharp,
        permission: ['admin_kecamatan', 'admin_desa']
    }
];