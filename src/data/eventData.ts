import { Video } from "@/types/video";

export interface EventVideo extends Omit<Video, 'class' | 'category' | 'topic'> {
  year: string;
  category: string;
}

export const eventCategories = {
  "Performances": ["Music", "Dance", "Songs", "Theatre"],
  "Celebrations": ["Birthdays", "Anniversaries", "Awards"],
  "Educational": ["Lessons", "Debates", "Science Fair"],
  "School Events": ["Sports Day", "DEAR Day", "Ceremonies", "Assemblies"],
  "Interviews": ["10 Questions to My Teacher"],
  "Excursions": ["Field Trips", "Tours", "Visits"],
  "Music": ["Songs", "Choir", "Productions"],
  "Competitions": ["Spelling Bee", "Debates", "Contests"],
};

export const eventData: EventVideo[] = [
  {
    title: "School Anthem by Merry Heart ft Glorious Schools",
    type: "youtube",
    src: "7n8EXy1nrmA",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Katrina ft Tr. Imelda - 10 Questions to my Teacher",
    type: "youtube",
    src: "pYanQH6Y9YQ",
    category: "Interviews",
    year: "2025"
  },
  {
    title: "Ten Questions to my Teacher - Melvina and Tr. Prossy",
    type: "youtube",
    src: "zsUZZ5VKsbo",
    category: "Interviews",
    year: "2025"
  },
  {
    title: "Tr. Generous and Katrina - 10 Questions to my Teacher Talkshow",
    type: "youtube",
    src: "joiDKb4tScE",
    category: "Interviews",
    year: "2025"
  },
  {
    title: "Tr. Labon and Melvina - 10 Questions to My Teacher Talkshow",
    type: "youtube",
    src: "LHzvJl0kWaw",
    category: "Interviews",
    year: "2025"
  },
  {
    title: "Sports Gala Teaser",
    type: "youtube",
    src: "Px5pwoApzXY",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Sports Day at Glorious Primary School 2025",
    type: "youtube",
    src: "fuhvNaIYpzU",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Science Fair at Glorious Primary School 2025",
    type: "youtube",
    src: "ZI-MfSJq8tk",
    category: "Educational",
    year: "2025"
  },
  {
    title: "Literacy 1B Lesson About Garden Tools by Tr. Phiona",
    type: "youtube",
    src: "L6zlGA5MJpo",
    category: "Educational",
    year: "2025"
  },
  {
    title: "Glorious Schools ft Merry Hearts at Theatre Labonita",
    type: "youtube",
    src: "HNMFHDOLuxs",
    category: "Performances",
    year: "2024"
  },
  {
    title: "Top 10 Birthdays at Glorious Primary School 🎂",
    type: "youtube",
    src: "8Vf8wNnPsDo",
    category: "Celebrations",
    year: "2024"
  },
  {
    title: "Happy Birthday Rayana",
    type: "youtube",
    src: "PD7qv-YM_ak",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Happy Birthday Melvin",
    type: "youtube",
    src: "R35exKQmM-o",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Glorious @ 10 2",
    type: "youtube",
    src: "dyqvnhF5lEU",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious @ 10 1",
    type: "youtube",
    src: "XNQKdoQCPkE",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious @ 10",
    type: "youtube",
    src: "XARioLcOwGc",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Happy Birthday Mercy",
    type: "youtube",
    src: "_wH3rhE67sM",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Happy Birthday Terry Elijah",
    type: "youtube",
    src: "yEkAcuH6gyM",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Happy Birthday Hosea",
    type: "youtube",
    src: "Z__yhtCDxyY",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Happy Birthday Nannungi Drucilla Luteete",
    type: "youtube",
    src: "LwbG-0G1RsA",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Glorious @15 Full Event",
    type: "youtube",
    src: "PUL4D65QZMY",
    category: "School Events",
    year: "2025"
  },
  {
    title: "DEAR DAY at Glorious Kindergarten and Primary School",
    type: "youtube",
    src: "IQQWkU-qL7g",
    category: "Educational",
    year: "2025"
  },
  {
    title: "P.5 English Excursion about Vehicle Repair and Maintenance",
    type: "youtube",
    src: "-Lcj0a-EL1k",
    category: "Educational",
    year: "2025"
  },
  {
    title: "Happy Birthday, Michoro Anna",
    type: "youtube",
    src: "-ag8BO_gbug",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "P.3 Excursion at Lubaga Division Headquarters",
    type: "youtube",
    src: "9wekzWYZ3S0",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Primary Five Excursion at Baha'i Temple",
    type: "youtube",
    src: "wQMd3vB6u4c",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Primary School Anthem",
    type: "youtube",
    src: "MyATZDzHsU0",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Happy Birthday Mellanie",
    type: "youtube",
    src: "Q-L1q0TPLaw",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Primary Six Science Excursion at Kavumba Zoo by Glorious Primary School",
    type: "youtube",
    src: "3cS5HdvckWE",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "The Day Glorious Caught Fire",
    type: "youtube",
    src: "qNQNPJi3c2s",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Lent Period Commences at Glorious Primary School",
    type: "youtube",
    src: "iTePNNq5Jq4",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Valentine Month Babies",
    type: "youtube",
    src: "bpU1mvN2Suo",
    category: "Celebrations",
    year: "2025"
  },
  {
    title: "Piano Lesson at Glorious Primary School by Mr. Rabbit",
    type: "youtube",
    src: "q5yySTcYA_c",
    category: "Educational",
    year: "2025"
  },
  {
    title: "Science Practical Lesson about Fish at Glorious Primary School by Tr. Walter",
    type: "youtube",
    src: "4SHexYcOrm4",
    category: "Educational",
    year: "2025"
  },
  {
    title: "Glorious Pupils singing the School Anthem at the assembly grounds",
    type: "youtube",
    src: "OQN8kdExVHA",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School at Katungulu Weather Station",
    type: "youtube",
    src: "n2P3AVjLYJ4",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten at Kilembe Power Station",
    type: "youtube",
    src: "_H5NOjpEy2M",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten and Primary School at Amabeere Ga Nyinamwiru Caves",
    type: "youtube",
    src: "8Su9JLWMqhY",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten and Primary School at Amabeere Ga Nyinamwiru Caves",
    type: "youtube",
    src: "5jQHSCo2zRw",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School",
    type: "youtube",
    src: "uWVvb5QWTIo",
    category: "School Events",
    year: "2025"
  }, 
  {
    title: "Glorious Kindergarten & Primary School",
    type: "youtube",
    src: "S_byPwghbWo",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School",
    type: "youtube",
    src: "kes2EDSgaVA",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School",
    type: "youtube",
    src: "Ib_IZWdFXEM",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School",
    type: "youtube",
    src: "W4MaV7vWjLA",
    category: "School Events",
    year: "2025"
  },
  {
    title: "GLORIOUS KINDERGARTEN & PRIMARY SCHOOL PREFECTS SWEARING",
    type: "youtube",
    src: "YUZuibeOyjQ",
    category: "School Events",
    year: "2025"
  },
  {
    title: "WESTERN TOUR DAY2 Glorious Primary School at Queen Elizabeth Game Park",
    type: "youtube",
    src: "IBOFsQ3Ypsk",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School Advert",
    type: "youtube",
    src: "alPqYrmbRBc",
    category: "School Events",
    year: "2025"
  },
  {
    title: "CLASS BONDING Glorious Kindergarten welcoming party of year 2024",
    type: "youtube",
    src: "LWfnmeuwVkY",
    category: "School Events",
    year: "2024"
  },
  {
    title: "Glorious Kindergarten Music Production",
    type: "youtube",
    src: "AdpgL0Oifvo",
    category: "Music",
    year: "2025"
  },
  {
    title: "Mbagala Nnyo by Glorious Kindergarten & Primary School",
    type: "youtube",
    src: "GXb7iCZIogQ",
    category: "Music",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten & Primary School Music Production 2023",
    type: "youtube",
    src: "mGlX-32Jhy8",
    category: "Music",
    year: "2023"
  },
  {
    title: "Primary Six Debate at Glorious Primary School",
    type: "youtube",
    src: "JnXJACUnQc0",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Primary Three Cranes Presents Cheeza For Yesu Song",
    type: "youtube",
    src: "XC4xLgQBhl4",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Primary Three Cranes Presents Cheeza For Yesu Song",
    type: "youtube",
    src: "xlf-Mkgt2UU",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Primary School 2023 PLE Results",
    type: "youtube",
    src: "0AeKv1O_zIQ",
    category: "School Events",
    year: "2023"
  },
  {
    title: "Mr. & Miss GLOPA Awards at Glorious Kindergarten and Primary School",
    type: "youtube",
    src: "PxB5EwnkRP8",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious Primary School Anthem",
    type: "youtube",
    src: "E_7C5OW1X7U",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Primary School Presenting Hallellujah Song",
    type: "youtube",
    src: "wkbwQodMBFU",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Jose Chameleon Presenting at Glorious Primary School",
    type: "youtube",
    src: "DaeMAMYJN0s",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious School Choir Presenting Anthems",
    type: "youtube",
    src: "7qUvgDcAXkc",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten Presenting Freedom in the Pearl of Africa Song",
    type: "youtube",
    src: "st7iP7iOGsg",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten Presenting Ndi Muna Uganda",
    type: "youtube",
    src: "7SbQ22u5rqk",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Gabie Ntate Presenting Omukisa Song at Glorious Primary School",
    type: "youtube",
    src: "vAGG5QGz48E",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Primary School PLE Results",
    type: "youtube",
    src: "cliTK1PGK4c",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious Primary School Presenting Ballet Dance",
    type: "youtube",
    src: "g58MuusFhFA",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Primary School P2 Kites Presenting Njagala Nyimbe Song",
    type: "youtube",
    src: "7jki-vhr3yA",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten Presenting Roles of People",
    type: "youtube",
    src: "-zxRcOWXq3U",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten Presenting Oluyimba Lukusuuta",
    type: "youtube",
    src: "q99J7Z7v0UM",
    category: "Performances",
    year: "2025"
  },
  {
    title: "Glorious Planned School",
    type: "youtube",
    src: "MnibOuNkmII",
    category: "School Events",
    year: "2025"
  },
  {
    title: "Glorious Primary School at Namugongo Uganda Martyrs' Shrine",
    type: "youtube",
    src: "6Gh-ImoJbEc",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "Glorious Kindergarten and Primary School Contestants at Miss Tourism Competitions",
    type: "youtube",
    src: "F10zUVQU1tU",
    category: "Competitions",
    year: "2025"
  },
  {
    title: "P3 Class Excursion at Lubaga Division- Glorious Kindergarten Primary School",
    type: "youtube",
    src: "0G21KISMjlA",
    category: "Excursions",
    year: "2025"
  },
  {
    title: "GLORIOUS PRIMARY SCHOOL ATTENDING ASH WEDNESDAY MASS AT ST KIZITO CHURCH MASANAFU",
    type: "youtube",
    src: "KRBEQzsxkjw",
    category: "School Events",
    year: "2025"
  },
  {
    title: "THANKS GIVING Glorious Kindergarten & Primary School leads prayers on 17 MARCH 2024",
    type: "youtube",
    src: "FWC5t92vnGs",
    category: "School Events",
    year: "2024"
  },
  {
    title: "COMPETITION Spelling Bee AT GLORIOUS KINDERGARTEN & PRIMARY SCHOOL",
    type: "youtube",
    src: "VIT7Xv66DSQ",
    category: "Competitions",
    year: "2025"
  },
  {
    title: "Glorious kindergarten & primary PLE RESULTS 2023",
    type: "youtube",
    src: "hP2Ys71gxb8",
    category: "School Events",
    year: "2023"
  },
  {
    title: "GLOPA Re-Union Party",
    type: "youtube",
    src: "cxSEivwAsCE",
    category: "School Events",
    year: "2025"
  }
];
