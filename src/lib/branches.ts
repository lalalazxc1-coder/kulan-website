export interface BranchLocation {
    type: 'office' | 'warehouse';
    typeKey: string;
    addressKey?: string;
    address?: string;
    isPlaceholder?: boolean;
}

export interface Branch {
    id: string;
    cityKey: string;
    isHeadOffice?: boolean;
    addressKey?: string;
    phone?: string;
    email?: string;
    coordinates?: any;
    locations?: BranchLocation[];
}

export const branches: Branch[] = [
    {
        id: 'head_office',
        cityKey: 'head_office',
        isHeadOffice: true,
        addressKey: 'head_office_addr',
        phone: '+7 (727) 273-02-02',
        email: 'info@kulanoil.kz',
        coordinates: null
    },
    {
        id: 'almaty',
        cityKey: 'almaty_label',
        locations: [
            { type: 'office', typeKey: 'office_label', addressKey: 'almaty_office_addr' },
            { type: 'warehouse', typeKey: 'warehouse_rc_label', addressKey: 'almaty_warehouse_rc_addr' },
            { type: 'warehouse', typeKey: 'warehouse_carcity_label', addressKey: 'almaty_warehouse_carcity_addr' },
            { type: 'warehouse', typeKey: 'warehouse_bakorda_label', addressKey: 'almaty_warehouse_bakorda_addr' }
        ]
    },
    {
        id: 'astana',
        cityKey: 'astana_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_parts_label', addressKey: 'astana_parts_addr' },
            { type: 'warehouse', typeKey: 'warehouse_oils_label', addressKey: 'astana_oils_addr' }
        ]
    },
    {
        id: 'shymkent',
        cityKey: 'shymkent_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_parts_label', addressKey: 'shymkent_parts_addr' },
            { type: 'warehouse', typeKey: 'warehouse_oils_label', addressKey: 'shymkent_oils_addr' }
        ]
    },
    {
        id: 'uralsk',
        cityKey: 'uralsk_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'uralsk_warehouse_addr' }
        ]
    },
    {
        id: 'ust_kamenogorsk',
        cityKey: 'ustkamenogorsk_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_parts_label', addressKey: 'ustkamenogorsk_parts_addr' },
            { type: 'warehouse', typeKey: 'warehouse_oils_label', addressKey: 'ustkamenogorsk_oils_addr' }
        ]
    },
    {
        id: 'aktau',
        cityKey: 'aktau_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'aktau_warehouse_addr' }
        ]
    },
    {
        id: 'aktobe',
        cityKey: 'aktobe_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'aktobe_warehouse_addr' }
        ]
    },
    {
        id: 'pavlodar',
        cityKey: 'pavlodar_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_parts_label', addressKey: 'pavlodar_parts_addr' },
            { type: 'warehouse', typeKey: 'warehouse_oils_label', addressKey: 'pavlodar_oils_addr' }
        ]
    },
    {
        id: 'petropavlovsk',
        cityKey: 'petropavlovsk_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'petropavlovsk_warehouse_addr' }
        ]
    },
    {
        id: 'karaganda',
        cityKey: 'karaganda_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_parts_label', addressKey: 'karaganda_parts_addr' },
            { type: 'warehouse', typeKey: 'warehouse_oils_label', addressKey: 'karaganda_oils_addr' }
        ]
    },
    {
        id: 'atyrau',
        cityKey: 'atyrau_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'atyrau_warehouse_addr' }
        ]
    },
    {
        id: 'taraz',
        cityKey: 'taraz_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'taraz_warehouse_addr' }
        ]
    },
    {
        id: 'semey',
        cityKey: 'semey_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'semey_warehouse_addr' }
        ]
    },
    {
        id: 'kostanay',
        cityKey: 'kostanay_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_label', addressKey: 'kostanay_warehouse_addr' }
        ]
    },
    {
        id: 'kyzylorda',
        cityKey: 'kyzylorda_label',
        locations: [
            { type: 'office', typeKey: 'office_label', address: '—', isPlaceholder: true },
            { type: 'warehouse', typeKey: 'warehouse_parts_label', addressKey: 'kyzylorda_parts_addr' },
            { type: 'warehouse', typeKey: 'warehouse_oils_label', addressKey: 'kyzylorda_oils_addr' }
        ]
    }
];
