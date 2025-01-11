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
        url: '#',
        icon: MdDashboard
    },
    {
        id: 2,
        title: 'Kelola Data Kecamatan',
        url: '#',
        icon: FcStatistics
    },
    {
        id: 3,
        title: 'Kelola Data Desa',
        url: '#',
        icon: TfiNotepad
    },
    {
        id: 4,
        title: 'Kelola Data Spasial',
        url: '#',
        icon: FcStatistics
    },
    {
        id: 5,
        title: 'Kelola Data Kategori',
        url: '#',
        icon: GiHamburgerMenu
    },
    {
        id: 6,
        title: 'Kelola Akun Admin',
        url: '#',
        icon: MdManageAccounts

    },
    {
        id:7,
        title: 'Logout',
        url: '#',
        icon: IoLogOutSharp

    }
]
